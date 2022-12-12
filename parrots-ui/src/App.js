import './App.css';
import React from 'react';
import Navigation from './components/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddParrotPage from './pages/AddParrotPage';
import EditParrotPage from './pages/EditParrotPage';
import { useState } from 'react';

function App() {
  const [parrotToEdit, setParrotToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>My Parrot Records</h1>
        <p>Keep track of your parrot(s) records. Modify your parrot's information or add a new parrot.</p>
      </header>
      <Router>
        <div className="App-header">
        <Navigation />
		    <Routes>
          <Route path="/" element={<HomePage setParrotToEdit={setParrotToEdit}/>}/>
          <Route path="/add-parrot" element={<AddParrotPage />}/>
          <Route path="/edit-parrot" element={ <EditParrotPage  parrotToEdit={parrotToEdit}/>}/>
		    </Routes>
        </div>
      </Router>
      <footer>
        &copy; 2022 Danielle Han
      </footer>
    </div>
  );
}

export default App;