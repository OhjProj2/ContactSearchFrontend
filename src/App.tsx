import './styles/App.css';
import { useState } from 'react';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { useContactSearch } from './hooks/useContactSearch';
import Login from './Login';
function App() {
  const [url, setUrl] = useState<string>("");
  const [occupations, setOccupations] = useState<string>("");
  const [newField, setNewField] = useState("");
  const [selectedFields, setSelectedFields] = useState<any>({
    name: true,
    email: true,
    phone: false
  });

  const [fields, setFields] = useState([
    "name",
    "email",
    "phone",
  ]);

  const handleAddField = () => {
    if (!newField) return;
    setFields([...fields, newField]);
    setNewField("");
  };

  const { results, status, search } = useContactSearch();

  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }
  
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
          onSearch={() => search({ url, occupations, selectedFields })}
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