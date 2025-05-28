const fs = require('fs');
const path = require('path');

function generateEntity(name) {
    if (!name) {
        console.error('Debes pasar un nombre. Ej: node entity.generator.js car');
        process.exit(1);
    }

    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    const templates = [
        { type: 'routes', ext: 'routes.ts' },
        { type: 'controllers', ext: 'controller.ts', template: 'controller-entity.template' },
        { type: 'middlewares', ext: 'middleware.ts' },
        { type: 'dtos', ext: 'dto.ts' },       // carpeta corregida a `dtos`
        { type: 'services', ext: 'service.ts' },
        { type: 'entities', ext: 'entity.ts' } // carpeta corregida a `entities`
    ];

    templates.forEach(({ type, ext, template }) => {
        const templateName = template || `${type.slice(0, -1)}.template`;
        const templatePath = path.join(__dirname, `../templates/${templateName}`);
        // const templatePath = path.join(__dirname, `../templates/${type.slice(0, -1)}.template`);
        const content = fs.readFileSync(templatePath, 'utf8')
            .replace(/__Name__/g, capitalized)
            .replace(/__name__/g, name);

        const dir = path.join(__dirname, `../../src/${type}`);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const filePath = path.join(dir, `${name}.${ext}`);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${type}/${name}.${ext} creado`);
    });
}

module.exports = { generateEntity };


