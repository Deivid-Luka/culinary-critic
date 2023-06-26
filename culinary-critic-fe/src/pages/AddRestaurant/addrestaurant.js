import React, { useState } from 'react';
import axios from 'axios';
import './addrestaurant.css';
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";



function AddRestaurantPage() {
  // Define state variables to hold form input values
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [typeOfFood, setTypeOfFood] = useState('');
  const [occasion, setOccasion] = useState('');
  const [diningOptions, setDiningOptions] = useState('');
  const [averageExpense, setAverageExpense] = useState('');
  const [allergyInformation, setAllergyInformation] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new restaurant object from the form input values
    const newRestaurant = {
      name,
      location,
      typeOfFood,
      occasion,
      diningOptions,
      averageExpense: parseFloat(averageExpense),
      allergyInformation,
    };

    try {
      // Send a POST request to the backend to add the new restaurant
      const response = await axios.post('/api/restaurants', newRestaurant);
      console.log(response.data); // Optional: log the response or handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  // Render the form
  return (
    <form className="container" onSubmit={handleSubmit}>
        <h1>Add a Restaurant</h1>
        <TextField
            className="item"
            sx={{marginBottom: 2}}
            label="Name"
            placeholder='e.g. "Name"'
            variant="outlined" size="small" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField
            className="item"
            placeholder='e.g. "Rruga e Dibres, Tirana, Albania"'
            sx={{marginBottom: 2}}
            label="Location"
            variant="outlined" size="small" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <TextField
            className="item"
            sx={{marginBottom: 2}}
            label="Type of Food"
            variant="outlined" size="small" type="text" value={typeOfFood} onChange={(e) => setTypeOfFood(e.target.value)} />
        <TextField
            className="item"
            sx={{marginBottom: 2}}
            label="Occasion"
            variant="outlined" size="small" type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} />
        <TextField
            className="item"
            sx={{marginBottom: 2}}
            label="Dining Options"
            variant="outlined" size="small" type="text" value={diningOptions} onChange={(e) => setDiningOptions(e.target.value)} />
        <TextField
            className="item"
            sx={{marginBottom: 2}}
            label="Average Expense"
            variant="outlined" size="small" type="text" value={averageExpense} onChange={(e) => setAverageExpense(e.target.value)} />
        <TextField
            className="item"
            sx={{marginBottom: 2}}
            label="Allergy Information"
            variant="outlined" size="small" type="text" value={allergyInformation} onChange={(e) => setAllergyInformation(e.target.value)} />
        <Button type="submit" variant="outlined">Submit</Button>
        {/*<form onSubmit={handleSubmit}>*/}
        {/*<label>*/}
        {/*  Name:*/}
        {/*  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />*/}
        {/*</label>*/}
        {/*<br />*/}
        {/*<label>*/}
        {/*  Location:*/}
        {/*  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />*/}
        {/*</label>*/}
        {/*<br />*/}
        {/*<label>*/}
        {/*  Type of Food:*/}
        {/*  <input type="text" value={typeOfFood} onChange={(e) => setTypeOfFood(e.target.value)} />*/}
        {/*</label>*/}
        {/*<br />*/}
        {/*<label>*/}
        {/*  Occasion:*/}
        {/*  <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} />*/}
        {/*</label>*/}
        {/*<br />*/}
        {/*<label>*/}
        {/*  Dining Options:*/}
        {/*  <input type="text" value={diningOptions} onChange={(e) => setDiningOptions(e.target.value)} />*/}
        {/*</label>*/}
        {/*<br />*/}
        {/*<label>*/}
        {/*  Average Expense:*/}
        {/*  <input type="number" value={averageExpense} onChange={(e) => setAverageExpense(e.target.value)} />*/}
        {/*</label>*/}
        {/*<br />*/}
        {/*<label>*/}
        {/*  Allergy Information:*/}
        {/*  <input type="text" value={allergyInformation} onChange={(e) => setAllergyInformation(e.target.value)} />*/}
        {/*</label>*/}
        {/*<br />*/}
        {/*<button type="submit">Add Restaurant</button>*/}
      {/*</form>*/}
    </form>
  );
}

export default AddRestaurantPage;
