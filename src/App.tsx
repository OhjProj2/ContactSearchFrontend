import './styles/App.css';
import { Button, TextField, FormControl } from '@mui/material';
import { useState } from 'react';
import { searchContacts } from './services/api';
import type { SearchResponse } from './types';
import Login from './Login';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [url, setUrl] = useState<string>("");

  const [occupations, setOccupations] = useState<string>("");

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

  const [loading, setLoading] = useState<string>("")

  const handleSearchClick = async () => {
    setResults(null);
    setLoading("Loading, please wait...")
    
    try {
      console.log("Sending request...");
      const data = await searchContacts({ url: url, occupations: occupations, selectedFields: selectedFields});
        
      console.log("Data received:", data);
      setResults(data);
      setLoading("")

    } catch (err) {
      console.error(err);
    }
  };
    if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <h1>Contact Search</h1>

      <div className="app-container">

        <div className="input-panel">

          <h3>1. Target websites</h3>
          <textarea
            placeholder="Enter URL"
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
          <h3>Output</h3>
        <div className='output-container'>

          {loading}

          {results && (
            <div style={{ marginBottom: '10px', color: '#666', fontSize: '0.9rem' }}>
              Found {results.data.contacts.length} contacts in <strong>{results.time.toFixed(2)}s</strong>
            </div>
          )}
            
          {results && results.data.contacts.map((contact: any, index: number) => (
            <div key={index}>
              {Object.entries(contact).map(([key, value]) => (
                <div key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                </div>
              ))}
              <hr />
            </div>
          ))}

        </div>
      </div>

      </div>
    </>
  );
}

export default App;