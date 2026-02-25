import './styles/App.css';
import { Button, TextField, FormControl } from '@mui/material';
import { useState } from 'react';
import { searchContacts } from './services/api';
import type { SearchResponse } from './types';

function App() {

  const [url, setUrl] = useState<string>("");

  const [occupations, setOccupations] = useState<any>(null);

  const [selectedFields, setSelectedFields] = useState<any>({
    name: true,
    email: true,
    phone: false
  });
  const [fields, setFields] = useState([
    "name",
    "email",
    "phone",
    "linkedin"
  ]);
  const [newField, setNewField] = useState("");
  
  const [results, setResults] = useState<SearchResponse | null>(null);

  const handleAddField = () => {
    if (!newField) return;
    setFields([...fields, newField]);
    setNewField("");
  };

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
          <div style={{marginTop: "-20px"}}>
            <TextField
              size="small"
              placeholder="Add new field"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
            />
            <Button
              variant="outlined"
              style={{marginLeft: "8px"}}
              onClick={handleAddField}>
              Add
            </Button>
          </div>
          <FormControl fullWidth>
            <div style={{display: "flex", gap: "8px"}}>
              {fields.map((field) => (
                <Button
                  key={field}
                  variant={selectedFields[field] ? "contained" : "outlined"}
                  onClick={() => {
                    const copy = { ...selectedFields };
                    copy[field] = !copy[field];
                    setSelectedFields(copy);}}>
                  {field}
                </Button>
              ))}
            </div>
          </FormControl>

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
            <pre>{JSON.stringify(results, null, 2)}</pre>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;