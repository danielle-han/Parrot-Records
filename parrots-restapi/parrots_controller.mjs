import 'dotenv/config';
import * as parrots from './parrots_model.mjs';
import express from 'express';
import {body, validationResult} from 'express-validator';

const PORT = process.env.PORT;

const app = express();  // express application

app.use(express.json());  // adds middleware to app that only parses json and only looks at requests 
                          // where content type header type matches type option

// function to check that date is in correct format                       
function isDateValid(hatch_date) {
    const format = /^([0]?[1-9]|[1][0-2])[-]([0]?[1-9]|[1|2][0-9]|[3][0|1])[-]([0-9]{4}|[0-9]{2})$/;
    return format.test(hatch_date);
}

// validation function - return message if validation fails
function validate(req, res) {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
        // TODO: change -> specific messages for different errors
    }
    if(!isDateValid(req.body.hatch_date)) {
        return res.status(400).json({ Error: "Hatch date is in an invalid format" });
    }
}

// post route handler function
function postParrotHandler(req, res) {

    validate(req, res);

    parrots.createParrot(req.body.name, req.body.weight, req.body.age_years, req.body.age_months, req.body.hatch_date, req.body.species)
    .then(parrot => {
        res.status(201).json(parrot);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: "Invalid request" });
    })
}

// put route handler function
function putParrotHandler(req, res) {

    validate(req, res);

    parrots.editParrot(req.params._id, req.body.name, req.body.weight, req.body.age_years, req.body.age_months, req.body.hatch_date, req.body.species)
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({_id: req.params._id, name: req.body.name, weight: req.body.weight, age_years: req.body.age_years, age_months: req.body.age_months, hatch_date: req.body.hatch_date, species: req.body.species});
        } else {
            res.status(404).json({ Error: "Resource not found"});
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: "Request failed" });
    })
}


// creates new parrot with properties provided in the body
app.post('/parrots', 
// validating properties:
body('name').isLength({ min: 1 }),  // name is not empty (at least 1 char)
body('weight').isInt({ min: 0 }),  // weight is not empty and not a negative number
body('age_years').isInt({ min: 0 }),  // age years is not empty and not a negative number
body('age_months').isInt({ min: 0, max: 11}),  // age months is not empty and btw 0 and 11 inclusive
body('species').isLength({ min: 1 }),  // species is not empty (at least 1 char)
postParrotHandler);
    
// retrieve all parrots in database
app.get('/parrots', (req, res) => {
    parrots.findParrots()
    .then(parrots => {
        res.json(parrots);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: "Request failed" });
    })
});

// retrieve parrot by ID
app.get('/parrots/:_id', (req, res) => {
    const parrotId = req.params._id;
    parrots.findParrotById(parrotId)
    .then(parrot => {
        if (parrot !== null) {
            res.json(parrot);
        } else {
            res.status(404).send({ Error: "Resource not found" });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: "Request failed" });
    })
});

// TODO: retrieve parrot by name - change find by id -> parrots/search/ <- filter by name/id/species(?)

// update parrot with specified ID: set its properties to values provided in body
app.put('/parrots/:_id', 
// validating properties: same as POST
body('name').isLength({ min: 1 }),  
body('weight').isInt({ min: 0 }), 
body('age_years').isInt({ min: 0 }),  
body('age_months').isInt({ min: 0, max: 11}),  
body('species').isLength({ min: 1 }),  
putParrotHandler);

// delete parrot with specified ID
app.delete('/parrots/:_id', (req, res) => {
    parrots.deleteById(req.params._id)
        .then(deletedCount => {
            if(deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: "Request failed" });
        })
});

// listen to connections on port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

export {app};