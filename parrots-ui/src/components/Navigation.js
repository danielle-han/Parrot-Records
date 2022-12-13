import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Navigation component:
// two links to the HomePage displaying parrot records and a link to adding a new Parrot
function Navigation() {
    return (
        <nav className='navigation'>
            <Link to='/' className='App-link'>Home</Link>
            <Link to='/add-parrot' className='App-link'>Add New Parrot</Link>
        </nav>
    );
}

export default Navigation;