import { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'

export default (req: VercelRequest, res: VercelResponse) => {
    const filePath = join(__dirname, '..', 'mesquita-games.json');
    const fileContents = readFileSync(filePath, 'utf8');
    res.status(200).json(JSON.parse(fileContents));
};