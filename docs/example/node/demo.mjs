import fs from 'fs'
import {dirname} from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const config = {
    a: `${__dirname}`
}
fs.writeFileSync('file.json', JSON.stringify(config))