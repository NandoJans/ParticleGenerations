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

// AutomatorRecord constructs generator automators during module initialization.
// If a dependency cycle makes the generated GeneratorRecord variable run later,
// the bundle loads successfully but crashes while reading firstRedGenerator from
// an undefined variable. Guard that initialization edge as well as class extends.
const firstGeneratorDependency = bundle.match(
  /"firstRedGenerator",([A-Za-z_$][\w$]*)\.firstRedGenerator/
);

if (firstGeneratorDependency) {
  const generatorRecordName = firstGeneratorDependency[1];
  const generatorRecordDeclaration = declarations.get(generatorRecordName);

  if (
    generatorRecordDeclaration === undefined ||
    generatorRecordDeclaration > firstGeneratorDependency.index
  ) {
    throw new Error(
      'Bundle initializes generator automators before GeneratorRecord; check for a circular dependency through AutomatorRecord.'
    );
  }
}

if (invalidExtensions.length > 0) {
  const details = invalidExtensions
    .map(({className, parentName}) => `${className} extends ${parentName}`)
    .join(', ');
  throw new Error(`Bundle declares subclasses before their superclasses: ${details}`);
}

console.log(`Verified class declaration order in ${bundlePath}.`);
