import path from 'path';
import fs from 'fs';
import { createFile } from '../utils/file-utils.js';
import { injectIntoFactories } from '../utils/factory-injertor.js';

export function generateFeature(name) {
  const baseDir = path.resolve('src');
  const templatesDir = path.resolve('cli/templates');

  const files = [
    {
      template: 'dto.template',
      filePath: path.join(baseDir, 'application', 'dtos', `${name}.dto.ts`),
    },
    {
      template: 'middleware.template',
      filePath: path.join(baseDir, 'application', 'middlewares', `${name}.middleware.ts`),
    },
    {
      template: 'use-case.template',
      filePath: path.join(baseDir, 'application', 'use-case', name, `${name}.use-case.ts`),
    },
    {
      template: 'controller.template',
      filePath: path.join(baseDir, 'infrastructure', 'interfaces', 'http', 'controllers', `${name}.controller.ts`),
    },
    {
      template: 'route.template',
      filePath: path.join(baseDir, 'infrastructure', 'interfaces', 'http', 'routes', `${name}.route.ts`),
    },
  ];

  files.forEach(({ template, filePath }) => {
    const templateContent = fs.readFileSync(path.join(templatesDir, template), 'utf8');
    const content = replacePlaceholders(templateContent, name);
    createFile(filePath, content);
  });
  
  injectIntoFactories(name, { controller: true, middleware: true });

  console.log(`✅ Feature "${name}" generado con éxito.`);
}

function replacePlaceholders(template, name) {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return template
    .replace(/__Name__/g, capitalized)
    .replace(/__name__/g, name.toLowerCase());
}

