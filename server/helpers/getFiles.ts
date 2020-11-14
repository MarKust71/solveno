import fs from 'fs';

export const getFiles = (path: string) => {
    return fs.readdirSync(path);
};
