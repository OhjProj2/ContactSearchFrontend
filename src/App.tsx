import './styles/App.css';

function App() {

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
           />

          <h3>2. Occupation / Role</h3>
          <input type="text"
            placeholder="Enter occupation or role"
            style={{backgroundColor: "transparent"}}
          />

          <h3>3. Data points</h3>
          <div className='checkbox-group'>
            <label className="checkbox-label"><input type="checkbox" checked/> Full Name</label>
            <label className="checkbox-label"><input type="checkbox" checked/> Email</label>
            <label className="checkbox-label"><input type="checkbox" checked/> Phone Number</label>
            <label className="checkbox-label"><input type="checkbox" checked/> Address</label>
          </div>

          <button className='primary-btn'>Search</button>
        </div>

        <div className="output-panel">
        </div>

      </div>
    </>
  );
}

export default App;