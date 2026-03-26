type Props = {
  url: string;
  setUrl: (value: string) => void;
  occupations: string;
  setOccupations: (value: string) => void;
  fields: string[];
  newField: string;
  setNewField: (value: string) => void;
  selectedFields: { [key: string]: boolean };
  setSelectedFields: (fields: { [key: string]: boolean }) => void;
  onAddField: () => void;
  onSearch: () => void;
};

export function InputPanel({
  url,
  setUrl,
  occupations,
  setOccupations,
  fields,
  newField,
  setNewField,
  selectedFields,
  setSelectedFields,
  onAddField,
  onSearch,
}: Props) {
  return (
    <div className="input-panel">
      <h3>1. Target websites</h3>
      <textarea
        placeholder="Enter URL"
        rows={3}
        className="fixed input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <h3>2. Occupation / Role</h3>
      <textarea
        placeholder="Enter occupation or role"
        rows={3}
        className="fixed input"
        value={occupations}
        onChange={(e) => setOccupations(e.target.value)}
      />

      <h3>3. Data points</h3>
      <div style={{ marginTop: "-10px", display: "flex", gap: "8px", width: "70%"}}>
        <input
          type="text"
          placeholder="Add new field"
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
          className="fixed input"
        />
        <button className="button" onClick={onAddField}>
          Add
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "20px" }}>
        {fields.map((field) => (
          <button
            key={field}
            className={`button ${selectedFields[field] ? "selected" : ""}`}
            onClick={() => {
              const copy = { ...selectedFields };
              copy[field] = !copy[field];
              setSelectedFields(copy);
            }}
          >
            {field}
          </button>
        ))}
      </div>

      <button className="button" style={{ marginTop: "20px" }} onClick={onSearch}>
        Search
      </button>
    </div>
  );
}