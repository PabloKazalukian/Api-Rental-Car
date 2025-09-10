import fs from 'fs';
import path from 'path';

export function injectIntoFactory(factoryFile, placeholder, code) {
  let content = fs.readFileSync(factoryFile, 'utf8');

  // Insertamos antes del cierre de la clase
  const regex = new RegExp(`(export class .*Factory {)`);
  if (!content.includes(code)) {
    content = content.replace(regex, `$1\n    ${code}`);
    fs.writeFileSync(factoryFile, content, 'utf8');
    console.log(`🔧 Factory actualizado: ${factoryFile}`);
  } else {
    console.log(`⚠️ Ya existía la factory para este caso en: ${factoryFile}`);
  }
}

export function injectImport(factoryFile, importLine) {
  let content = fs.readFileSync(factoryFile, 'utf8');

  if (!content.includes(importLine)) {
    content = importLine + '\n' + content;
    fs.writeFileSync(factoryFile, content, 'utf8');
    console.log(`📥 Import agregado en: ${factoryFile}`);
  }
}
