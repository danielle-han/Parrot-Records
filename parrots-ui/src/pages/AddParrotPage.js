import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddParrotPage = () => {

    const [name, setName] = useState('');
    const [weight, setWeight] = useState('');
    const [age_years, setAgeYears] = useState('');
    const [age_months, setAgeMonths] = useState('');
    const [hatch_date, setHatchDate] = useState('');
    const [species, setSpecies] = useState('');

    const navigate = useNavigate();

    const addParrot = async () => {
        const newParrot = {name: name, weight: weight, age_years: age_years, age_months: age_months, hatch_date: hatch_date, species: species};
        const response = await fetch('/parrots', {
            method: 'POST',
            body: JSON.stringify(newParrot),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert("Successfully added a new parrot!");
        } else {
            alert(`Failed to add parrot, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div class="form">
            <h1>Add a new parrot</h1>
            <label for="name">Parrot Name:</label>
            <input
                type="text"
                id="name"
                placeholder="Kiwi"
                value={name}
                onChange={e => setName(e.target.value)} />
            <label for="weight">Weight in Grams:</label>
            <input
                type="number"
                id="weight"
                value={weight}
                placeholder="30"
                onChange={e => setWeight(e.target.value)} />
            <label for="age_years">Years:</label>
            <input
                type="number"
                id="age_years"
                value={age_years}
                placeholder="8"
                onChange={e => setAgeYears(e.target.value)} />
            <label for="age_months">Months:</label>
            <input
                type="number"
                id="age_months"
                value={age_months}
                placeholder="11"
                onChange={e => setAgeMonths(e.target.value)} />
            <label for="hatch_date">Hatch Date:</label>
            <input
                type="text"
                id="hatch_date"
                placeholder="MM-DD-YY"
                value={hatch_date}
                onChange={e => setHatchDate(e.target.value)} />
            <label for="species">Parrot Species:</label>
            <input
                type="text"
                id="species"
                placeholder="parrotlet"
                value={species}
                onChange={e => setSpecies(e.target.value)} />
            <button
                onClick={addParrot}
            >Add</button>
        </div>
    );
}

export default AddParrotPage;