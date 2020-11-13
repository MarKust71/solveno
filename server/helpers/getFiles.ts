import fs from 'fs';

export const getFiles = () => {
    return fs.readdirSync('../public/assets');
};
