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
        <div>
            <h1>Add a new parrot</h1>
            <input
                type="text"
                placeholder="Enter your parrot's name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter your parrot's weight here (in grams)"
                onChange={e => setWeight(e.target.value)} />
            <p> Enter parrot's age: </p>
            <input
                type="number"
                value={age_years}
                placeholder="Years"
                onChange={e => setAgeYears(e.target.value)} />
            <input
                type="number"
                value={age_months}
                placeholder="Months"
                onChange={e => setAgeMonths(e.target.value)} />
            <input
                type="text"
                placeholder="Enter hatch-date here in format MM-DD-YY or MM-DD-YYYY"
                value={hatch_date}
                onChange={e => setHatchDate(e.target.value)} />
            <input
                type="text"
                placeholder="Enter species of parrot here"
                value={species}
                onChange={e => setSpecies(e.target.value)} />
            <button
                onClick={addParrot}
            >Add</button>
        </div>
    );
}

export default AddParrotPage;