import { VercelRequest, VercelResponse } from '@vercel/node';
import { readFileSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

export default (req: VercelRequest, res: VercelResponse) => {
    const filePath = join(__dirname, '..', 'mesquita-games.json');
    const fileContents = readFileSync(filePath, 'utf8');

    const etag = createHash('sha1').update(fileContents).digest('hex');

    if (req.headers['if-none-match'] === etag) {
        res.status(304).end(); 
        return;
    }

    res.setHeader('ETag', etag);
    res.status(200).json(JSON.parse(fileContents));
};
