import {readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';

const bundleDirectory = join(process.cwd(), 'docs', 'browser');
const bundleName = (await readdir(bundleDirectory)).find(
  name => /^main-.*\.js$/.test(name)
);

if (!bundleName) {
  throw new Error(`No production main bundle found in ${bundleDirectory}. Run npm run build first.`);
}

const bundlePath = join(bundleDirectory, bundleName);
const bundle = await readFile(bundlePath, 'utf8');
const classPattern = /var ([A-Za-z_$][\w$]*)=class(?: [A-Za-z_$][\w$]*)?(?: extends ([A-Za-z_$][\w$]*))?/g;
const declarations = new Map();
const extensions = [];

for (const match of bundle.matchAll(classPattern)) {
  const [, className, parentName] = match;
  declarations.set(className, match.index);

  if (parentName) {
    extensions.push({className, parentName, index: match.index});
  }
}

const invalidExtensions = extensions.filter(({parentName, index}) => {
  const parentIndex = declarations.get(parentName);
  return parentIndex !== undefined && parentIndex > index;
});

// Generator automators must be constructed from metadata alone. Reading a
// GeneratorRecord static field here reintroduces an initialization-order cycle.
if (/new [A-Za-z_$][\w$]*\("firstRedGenerator",\(\)=>/.test(bundle)) {
  throw new Error('Generator automators still capture GeneratorRecord during module initialization.');
}

// Prestige automators are initialized before PrestigeLayersService in the
// production bundle. They must resolve their layer lazily instead of reading a
// static prestige layer from their field initializers.
if (/this\.name="(?:yellow|green)-prestige-automator"[^}]*this\.prestigeLayer=/.test(bundle)) {
  throw new Error('Prestige automators still capture PrestigeLayersService during module initialization.');
}

// Milestones are emitted before UpgradeRecord in optimized builds. Upgrade
// collections therefore have to be supplied by a callback and resolved when
// the milestone runs, rather than while its static fields are initialized.
if (/"keepAllYellowUpgrades"[^;]*?,[A-Za-z_$][\w$]*\.yellowUpgradeList,"all yellow upgrades"/.test(bundle)) {
  throw new Error('Milestones still capture UpgradeRecord during module initialization.');
}

if (invalidExtensions.length > 0) {
  const details = invalidExtensions
    .map(({className, parentName}) => `${className} extends ${parentName}`)
    .join(', ');
  throw new Error(`Bundle declares subclasses before their superclasses: ${details}`);
}

console.log(`Verified class declaration order in ${bundlePath}.`);
