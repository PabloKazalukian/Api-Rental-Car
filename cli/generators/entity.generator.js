import path from 'path';
import fs from 'fs';
import { createFile } from '../utils/file-utils.js';
import { injectIntoFactories } from '../utils/factory-injertor.js';

export function generateEntity(name) {
  const baseDir = path.resolve('src');
  const templatesDir = path.resolve('cli/templates');

  const files = [
    {
      template: 'route.template',
      filePath: path.join(baseDir, 'infrastructure', 'interfaces', 'http', 'routes', `${name}.route.ts`),
    },
    {
      template: 'controller-entity.template',
      filePath: path.join(baseDir, 'infrastructure', 'interfaces', 'http', 'controllers', `${name}.controller.ts`),
    },
    {
      template: 'repository.template',
      filePath: path.join(baseDir, 'infrastructure', 'gateways', 'repositories', `${name}.repository.ts`),
    },
    {
      template: 'entity-db.template',
      filePath: path.join(baseDir, 'infrastructure', 'db', 'entities', `${name}.entity.ts`),
    },
    {
      template: 'middleware.template',
      filePath: path.join(baseDir, 'application', 'middlewares', `${name}.middleware.ts`),
    },
    {
      template: 'dto.template',
      filePath: path.join(baseDir, 'application', 'dtos', `${name}.dto.ts`),
    },
    {
      template: 'interface-repo.template',
      filePath: path.join(baseDir, 'domain','interface', 'repositories', `I${capitalize(name)}Repository.interface.ts`),
    },
    {
      template: 'entity-domain.template',
      filePath: path.join(baseDir, 'domain', 'entities', `${name}.ts`),
    },
    {
      template: 'mapper.template',
      filePath: path.join(baseDir, 'application', 'mappers', `${name}.mapper.ts`),
    }
  ];

  files.forEach(({ template, filePath }) => {
    const templateContent = fs.readFileSync(path.join(templatesDir, template), 'utf8');
    const content = replacePlaceholders(templateContent, name);
    createFile(filePath, content);
  });

  injectIntoFactories(name, { controller: true, middleware: true, repository: true });

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