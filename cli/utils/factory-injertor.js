import path from 'path';
import fs from 'fs';
import { injectIntoFactory, injectImport, injectExport } from './factory-utils.js';

const controllerFactory = path.resolve('src/application/factories/controller.factory.ts');
const middlewareFactory = path.resolve('src/application/factories/middleware.factory.ts');
const controllersIndex = path.resolve('src/infrastructure/interfaces/http/controllers/index.ts');
const servicesIndex = path.resolve('src/infrastructure/gateways/repositories/index.service.ts');

/**
 * Inyecta un nuevo Controller y Middleware en las factories globales
 * @param {string} name - nombre en minúscula (ej: "car")
 * @param {Object} options - config de qué inyectar
 * @param {boolean} options.controller - si debe generar controller factory
 * @param {boolean} options.middleware - si debe generar middleware factory
 * @param {boolean} options.repository - si debe generar repo en index.service
 */
export function injectIntoFactories(
  name,
  { controller = true, middleware = true, repository = false } = {}
) {
  const capitalized = capitalize(name);

  if (controller) {
    // --- Imports en ControllerFactory ---
    injectImport(
      controllerFactory,
      `import { ${capitalized}Controller } from '../../infrastructure/interfaces/http/controllers/${name}.controller';`
    );
    injectImport(
      controllerFactory,
      `import { ${capitalized}Repository } from '../../infrastructure/gateways/repositories/${name}.repository';`
    );
    injectImport(
      controllerFactory,
      `import { HttpResponseSingleton } from '../../infrastructure/gateways/response/http-singleton.response';`
    );

    // --- Método en ControllerFactory ---
    injectIntoFactory(
      controllerFactory,
      'export class ControllerFactory {',
      `  static create${capitalized}Controller() {
          const ${name}Repo = new ${capitalized}Repository();
          const httpResponse = HttpResponseSingleton.getInstance();
          return new ${capitalized}Controller(${name}Repo, httpResponse);
      }
          `
    );

    injectImport(
      controllersIndex,
      `import { ${capitalized}Controller } from "./${name}.controller";`
    );

    // --- Export en index.controllers ---
    injectExport(
      controllersIndex,
      `export const ${name}Controller = ControllerFactory.create${capitalized}Controller();`
    );


  }

  if (middleware) {
    // --- Import en MiddlewareFactory ---
    injectImport(
      middlewareFactory,
      `import { ${capitalized}Middleware } from '../middlewares/${name}.middleware';`
    );

    // --- Método en MiddlewareFactory ---
    injectIntoFactory(
      middlewareFactory,
      'export class MiddlewareFactory {',
      `  static create${capitalized}Middleware() {
        return new ${capitalized}Middleware();
      }
        `
    );
  }

  if (repository) {
    let content = fs.readFileSync(servicesIndex, 'utf8');

    const importLine = `import { ${capitalized}Repository } from "./${name}.repository";`;
    if (!content.includes(importLine)) {
      content = importLine + '\n' + content;
    }

    const exportLine = `export const ${name.toLowerCase()}Repository = new ${capitalized}Repository();`;
    if (!content.includes(exportLine)) {
      content += '\n' + exportLine + '\n';
    }

    fs.writeFileSync(servicesIndex, content, 'utf8');
    console.log(`📦 Repositorio "${capitalized}Repository" inyectado en index.service.ts`);
  }

  console.log(`✅ "${capitalized}" inyectado en factories.`);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
