import path from 'path';
import fs from 'fs';
import { createFile } from '../utils/file-utils.js';

export function generateEntity(name) {
  const baseDir = path.resolve('src');
  const templatesDir = path.resolve('cli/templates');

  const files = [
    {
      template: 'entity.template.ts',
      filePath: path.join(baseDir, 'domain', 'entities', `${name}.entity.ts`),
    },
    {
      template: 'interface-repo.template.ts',
      filePath: path.join(baseDir, 'domain', 'interfaces', 'repositories', `i${capitalize(name)}Repository.ts`),
    },
    {
      template: 'repository.template.ts',
      filePath: path.join(baseDir, 'infrastructure', 'gateways', 'repositories', `${name}.repository.ts`),
    },
    {
      template: 'controller.template.ts',
      filePath: path.join(baseDir, 'infrastructure', 'interfaces', 'http', 'controllers', `${name}.controller.ts`),
    },
  ];

  files.forEach(({ template, filePath }) => {
    const templateContent = fs.readFileSync(path.join(templatesDir, template), 'utf8');
    const content = replacePlaceholders(templateContent, name);
    createFile(filePath, content);
  });

  console.log(`✅ Entity "${name}" generada con éxito.`);
}

function replacePlaceholders(template, name) {
  const capitalized = capitalize(name);
  return template
    .replace(/__Name__/g, capitalized)
    .replace(/__name__/g, name.toLowerCase());
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}




