#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const name = process.argv[2];

if (!name) {
    console.error('⚠️  Por favor proporciona el nombre del feature. Ej: node cli/open-feature.js email');
    process.exit(1);
}

const root = path.resolve(__dirname, '../src');
const filePaths = [
    `routes/${name}.routes.ts`,
    `controllers/${name}.controller.ts`,
    `services/${name}.service.ts`,
    `dtos/${name}.dto.ts`,
    `middlewares/${name}.middleware.ts`
];

const existingFiles = filePaths
    .map(relPath => path.join(root, relPath))
    .filter(fs.existsSync);

if (existingFiles.length === 0) {
    console.log(`❌ No se encontraron archivos para el feature "${name}".`);
    process.exit(0);
}

// Arma el comando VSCode
const filesToOpen = existingFiles.map(fp => `"${fp}"`).join(' ');

exec(`code ${filesToOpen}`, (err) => {
    if (err) {
        console.error('❌ Error al abrir los archivos:', err.message);
    } else {
        console.log(`✅ Archivos del feature "${name}" abiertos en VSCode.`);
    }
});
