import React from "react";
import { Link } from 'react-router-dom';
import ParrotList from '../components/ParrotList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setParrotToEdit}) {
    const [parrots, setParrots] = useState([]);
    const navigate = useNavigate();

    // delete parrot and pass it down
    const onDelete = async _id => {
        const response = await fetch(`/parrots/${_id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const newParrots = parrots.filter(parrot => parrot._id !== _id);
            setParrots(newParrots);

        } else{
            console.error(`Failed to delete parrot with _id = ${_id}, status code = ${response.status}`);   
        }
    };

    // edit parrot
    const onEdit = parrot => {
        setParrotToEdit(parrot);
        navigate("/edit-parrot");
    };    

    // display parrots
    const loadParrots = async () => {
        const response = await fetch('/parrots');
        const data = await response.json();
        setParrots(data);
    }

    useEffect(() => {
        loadParrots();
    }, []);

    return (
        <>
            <h2>Parrots</h2>
            <ParrotList parrots={parrots} onDelete={onDelete} onEdit={onEdit}></ParrotList>
            <Link to="/add-parrot">Add new parrot</Link>
        </>
    );
}

export default HomePage;