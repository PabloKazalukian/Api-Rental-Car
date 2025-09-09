import fs from 'fs';
import path from 'path';

export function createFile(filePath, content) {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`📝 Archivo creado: ${filePath}`);
    } else {
        console.log(`⚠️ Archivo ya existe: ${filePath}`);
    }
}
