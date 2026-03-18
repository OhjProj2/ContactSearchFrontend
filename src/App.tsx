import './styles/App.css';
import { useState } from 'react';
import { searchContacts } from './services/api';
import type { SearchResponse } from './types';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';



function App() {
  
  const [url, setUrl] = useState<string>("");
  const [occupations, setOccupations] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [newField, setNewField] = useState("");
  const [results, setResults] = useState<SearchResponse | null>(null);

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
  
  const handleAddField = () => {
    if (!newField) return;
    setFields([...fields, newField]);
    setNewField("");
  };
  const handleSearchClick = async () => {
    setResults(null);
    setStatus("Loading, please wait...")
    try {
      console.log("Sending request...");
      const data = await searchContacts({ url: url, occupations: occupations, selectedFields: selectedFields});
      console.log("Data received:", data);
      setResults(data);
      setStatus("")
    } catch (err) {
      console.error(err);
      setResults(null);
      setStatus("Oops, something went wrong. Please try again.");
    }
  };


  return (
    <>
      <h1>Contact Search</h1>

      <div className="app-container">

      <InputPanel
        url={url}
        setUrl={setUrl}
        occupations={occupations}
        setOccupations={setOccupations}
        fields={fields}
        newField={newField}
        setNewField={setNewField}
        selectedFields={selectedFields}
        setSelectedFields={setSelectedFields}
        onAddField={handleAddField}
        onSearch={handleSearchClick}
      />

      <OutputPanel
        results={results}
        status={status}
      />

      </div>
    </>
  );
}

export default App;