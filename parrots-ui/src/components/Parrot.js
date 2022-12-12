import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

// displays records of one Parrot as a table row. 
// clickable icons are used to indicate editing/deleting options.
function Parrot({ parrot, onDelete, onEdit}) {
    return (
        <tr>
            <td>{parrot.name}</td>
            <td>{parrot.weight}</td>
            <td>{parrot.age_years}</td>
            <td>{parrot.age_months}</td>
            <td>{parrot.hatch_date}</td>
            <td>{parrot.species}</td>
            <td><MdEdit onClick={() => onEdit(parrot)}/></td>
            <td><MdDeleteForever onClick={() => onDelete(parrot._id)}/></td>
        </tr>
    );
}

export default Parrot;