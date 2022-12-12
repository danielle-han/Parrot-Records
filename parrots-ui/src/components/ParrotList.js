import React from "react";
import Parrot from './Parrot';

/*
* display parrot record table. Headers are defined and each row of records 
* is created using the map function (one Parrot component per row).
*/
function ParrotList({ parrots, onDelete, onEdit }) {
    return (
        <table id="parrots">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Age (years)</th>
                    <th>Age (months)</th>
                    <th>Hatch Date</th>
                    <th>Species</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {parrots.map((parrot, i) => <Parrot parrot={parrot}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default ParrotList;
