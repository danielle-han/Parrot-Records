import 'dotenv/config';
import * as parrots from './parrots_model.mjs';
import express from 'express';
import {body, validationResult} from 'express-validator';

const PORT = process.env.PORT;

const app = express();  // express application

app.use(express.json());  // adds middleware to app that only parses json and only looks at requests 
                          // where content type header type matches type option

// function to check that date is in correct format
// TODO: also check that the dates are valid                          
function isDateValid(hatch_date) {
    const format = /^\d\d-\d\d-\d\d\d\d$/;
    return format.test(hatch_date);
}

// creates new parrot with properties provided in the body
app.post('/parrots', 
// validating properties:
body('name').isLength({ min: 1 })),  // name is not empty (at least 1 char)
body('weight').isInt({ min: 0 }),  // weight is not empty and not a negative number
body('age_years').isInt({ min: 0 }),  // age years is not empty and not a negative number
body('age_months').isInt({ min: 0, max: 12}),  // age months is not empty and btw 0 and 12 inclusive
body('species').isLength({ min: 1 }),  // species is not empty (at least 1 char)

(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        // TODO: change -> specific messages for different errors
    }
    if(!isDateValid(req.body.hatch_date)) {
        return res.status(400).json({ Error: "Hatch date is in an invalid format"});
    }
    
    parrots.createParrot(req.body.name, req.body.weight, req.body.age_years, req.body.age_months, req.body.hatch_date, req.body.species)
    .then(parrot => {
        res.status(201).json(parrot);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: "Invalid request" });
    })
};
    
// listen to connections on port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})