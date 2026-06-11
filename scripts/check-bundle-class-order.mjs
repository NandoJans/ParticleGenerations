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

if (invalidExtensions.length > 0) {
  const details = invalidExtensions
    .map(({className, parentName}) => `${className} extends ${parentName}`)
    .join(', ');
  throw new Error(`Bundle declares subclasses before their superclasses: ${details}`);
}

console.log(`Verified class declaration order in ${bundlePath}.`);
