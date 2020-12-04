import express from 'express';
import { getFiles } from './helpers/getFiles';
import { hostname } from 'os';

const path = require('path');
require('dotenv').config();

const app = express();
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = parseInt(process.env.SERVER_PORT || '4000');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Node server seems to be  running...').status(200);
});

app.get('/api/', (req, res) => {
    const myFiles = getFiles(path.join(process.env.PDF_INBOX_PATH));
    // res.json(myFiles).status(200);
    res.send(myFiles).status(200);
});

app.listen(PORT, HOST, () => {
    console.log(`⚡️[server]: Server is running at http://${HOST}:${PORT}`);
});
