import express from 'express';
import { getFiles } from './helpers/getFiles';

const app = express();
const PORT = 4000;

// app.get('/favicon.ico', (req, res) => res.status(204));
//
app.get('/', (req, res) => {
    const myFiles = getFiles();
    res.send(JSON.stringify(myFiles)).status(200);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
