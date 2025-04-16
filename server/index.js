import express from 'express';
import cors from 'cors';
import router from './src/api/router/index.js';

const port = 3005;

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});