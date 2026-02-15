import './styles/App.css';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState } from 'react';
import { searchContacts } from './services/api';
import type { SearchResponse } from './types';

function App() {

  const [url, setUrl] = useState<string>("");

  const [occupations, setOccupations] = useState<any>(null);

  const [selectedFields, setSelectedFields] = useState({
    name: true,
    email: true,
    phone: false,
    linkedin: false
  });

  const handleCheckboxClick = (field: keyof typeof selectedFields) => {
    setSelectedFields((prev) => ({
      ...prev,
       [field]: !prev[field]
    }))
  }

  const [results, setResults] = useState<SearchResponse | null>(null);

  const handleSearchClick = async () => {
    setResults(null); 
    try {
      const data = await searchContacts({ url: url, occupations: occupations, selectedFields: selectedFields});
      
        console.log("Sending request...");
        
        console.log("Data received:", data);
        setResults(data);

      } catch (err) {
        console.error(err);
      }
  };

  return (
    <>
      <h1>Contact Search</h1>

      <div className="app-container">

        <div className="input-panel">

          <h3>1. Target websites</h3>
          <textarea
            placeholder="Enter URLs here (each on a new line)"
            rows={3}
            style={{backgroundColor: "transparent"}}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
           />

          <h3>2. Occupation / Role</h3>
          <textarea
            placeholder="Enter occupation or role"
            rows={3}
            style={{backgroundColor: "transparent"}}
            value={occupations}
            onChange={(e) => setOccupations(e.target.value)}
           />

          <h3>3. Data points</h3>
          <div className='checkbox-group'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFields.name}
                  onChange={() => handleCheckboxClick("name")}
                  />
              }
              label="Name"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFields.email}
                  onChange={() => handleCheckboxClick("email")}
                  />
              }
              label="Email"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFields.phone}
                  onChange={() => handleCheckboxClick("phone")}
                  />
              }
              label="Phone number"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFields.linkedin}
                  onChange={() => handleCheckboxClick("linkedin")}
                  />
              }
              label="LinkedIn"
            />
          </div>

          <Button
           variant='contained'
           style={{borderRadius: '8px'}}
           onClick={handleSearchClick}
          >
            Search
          </Button>
        </div>

        <div className="output-panel">
          <div className='output-container'>

          </div>
        </div>

      </div>
    </>
  );
}

export default App;