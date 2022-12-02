import mongoose from "mongoose";
import 'dotenv/config';

// connects to MongoDB and uses the variable from the .env file as the url.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// connect to the database:
const db = mongoose.connection;

// open event is called when connection successfully opens 
// remove?
db.once("open", () => {
    console.log("successfully connected to MongoDB");
})

// defining schema:
// unique: true? - name?
const parrotSchema = mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    age_years: { type: Number, required: true },
    age_months: { type: Number, required: true },
    hatch_date: { type: String, required: true},
    species: { type: String, required: true}
});

// compile parrot model from the schema above
const Parrot = mongoose.model("Parrot", parrotSchema);

// create new parrot
const createParrot = async (name, weight, age_years, age_months, hatch_date, species) => {
    const parrot = new Parrot({name: name, weight: weight, age_years: age_years, age_months: age_months, hatch_date: hatch_date, species: species});
    return parrot.save();
}

// retrieve parrots
const findParrots = async () => {
    const query = Parrot.find();
    return query.exec();
}

// find parrot by ID
const findParrotById = async (_id) => {
    const query = Parrot.findById(_id);
    return query.exec();
}

// find parrot(s) by name
const findParrotByName = async (name) => {
    const query = Parrot.find({name: name});
    return query.exec();
}

// edit parrot
const editParrot = async (_id, name, weight, age_years, age_months, hatch_date, species) => {
    const result = await Parrot.replaceOne({_id: _id}, {name: name, weight: weight, age_years: age_years, age_months: age_months, hatch_date: hatch_date, species: species});
    return result.modifiedCount;
}

// delete parrot by ID
const deleteById = async (_id) => {
    const result = await Parrot.deleteOne({_id: _id});
    return result.deletedCount;
};

export { createParrot, findParrots, findParrotById, findParrotByName, editParrot, deleteById }