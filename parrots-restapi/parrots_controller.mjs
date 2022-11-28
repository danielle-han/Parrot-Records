import 'dotenv/config';
import * as parrots from './parrots_model.mjs';
import express from 'express';
import {body, validationResult} from 'express-validator';

const PORT = process.env.PORT;

const app = express();  // express application

app.use(express.json());  // adds middleware to app that only parses json and only looks at requests 
                          // where content type header type matches type option


    
// listen to connections on port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})