import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditParrotPage = ({parrotToEdit}) => {

    const [name, setName] = useState(parrotToEdit.name);
    const [weight, setWeight] = useState(parrotToEdit.weight);
    const [age_years, setAgeYears] = useState(parrotToEdit.age_years);
    const [age_months, setAgeMonths] = useState(parrotToEdit.age_months);
    const [hatch_date, setHatchDate] = useState(parrotToEdit.hatch_date);
    const [species, setSpecies] = useState(parrotToEdit.species);


    const navigate = useNavigate();

    const editParrot = async () => {
        const editedParrot = {name, weight, age_years, age_months, hatch_date, species};
        const response = await fetch(`/parrots/${parrotToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedParrot),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert("Successfully edited your parrot's information!");
        } else {
            alert(`Failed to edit parrot's information, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div class="form">
            <h1>Edit Parrot</h1>
            <label for="name">Parrot Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)} />
            <label for="weight">Weight in Grams:</label>
            <input
                type="number"
                id="weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <label for="age_years">Years:</label>
            <input
                type="number"
                id="age_years"
                value={age_years}
                onChange={e => setAgeYears(e.target.value)} />
            <label for="age_months">Months:</label>
            <input
                type="number"
                id="age_months"
                value={age_months}
                onChange={e => setAgeMonths(e.target.value)} />
            <label for="hatch_date">Hatch Date:</label>
            <input
                type="text"
                id="hatch_date"
                value={hatch_date}
                onChange={e => setHatchDate(e.target.value)} />
            <label for="species">Parrot Species:</label>
            <input
                type="text"
                id="species"
                value={species}
                onChange={e => setSpecies(e.target.value)} />
            <button
                onClick={editParrot}
            >Save</button>
        </div>
    );
}

export default EditParrotPage;