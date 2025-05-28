#!/usr/bin/env node

const { generateFeature } = require('./generators/feature.generator');
const { generateEntity } = require('./generators/entity.generator');

const [, , command, type, name] = process.argv;

console.log(command, type, name);
if (!command || !type || !name) {
    console.error('❌ Uso: node cli-generator.js generate <feature|entity> <name>');
    process.exit(1);
}

if (command === 'generate') {
    switch (type) {
        case 'feature':
            generateFeature(name);
            break;
        case 'entity':
            generateEntity(name);
            break;
        default:
            console.error(`❌ Tipo no válido: ${type}`);
            process.exit(1);
    }
} else {
    console.error(`❌ Comando no reconocido: ${command}`);
    console.log('Comando inválido. Usa "generate:entity <name>" o "generate:feature <name>"');
    process.exit(1);
}
