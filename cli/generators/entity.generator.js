const fs = require('fs');
const path = require('path');

function generateEntity(name) {
    if (!name) {
        console.error('❌ Debes pasar un nombre. Ej: node cli-generators.js generate entity car');
        process.exit(1);
    }

    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    // 🗂️ Mapeo de carpetas correctas para Entity (persistencia en DB)
    const templates = [
        { type: 'routes', ext: 'routes.ts', outDir: 'infrastructure/interfaces/http/routes' },
        { type: 'controllers', ext: 'controller.ts', outDir: 'infrastructure/interfaces/http/controllers', template: 'controller-entity.template' },
        { type: 'middlewares', ext: 'middleware.ts', outDir: 'application/middlewares' },
        { type: 'dtos', ext: 'dto.ts', outDir: 'application/dtos' },
        { type: 'services', ext: 'service.ts', outDir: 'infrastructure/gateways/repositories' },
        { type: 'entities', ext: 'entity.ts', outDir: 'infrastructure/db/entities' }
    ];

    templates.forEach(({ type, ext, outDir, template }) => {
        const templateName = template || `${type.slice(0, -1)}.template`;
        const templatePath = path.join(__dirname, `../templates/${templateName}`);

        if (!fs.existsSync(templatePath)) {
            console.error(`❌ No se encontró template: ${templatePath}`);
            process.exit(1);
        }

        const content = fs.readFileSync(templatePath, 'utf8')
            .replace(/__Name__/g, capitalized)
            .replace(/__name__/g, name);

        const dir = path.join(__dirname, `../../src/${outDir}`);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const filePath = path.join(dir, `${name}.${ext}`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${outDir}/${name}.${ext} creado`);
    });
}

module.exports = { generateEntity };



