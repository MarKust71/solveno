import express from 'express';
import { getFiles } from './helpers/getFiles';

const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 4000;

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

app.get('/api/', (req, res) => {
    const myFiles = getFiles(path.join(process.env.PDF_INBOX_PATH));
    // res.json(myFiles).status(200);
    res.send(myFiles);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
