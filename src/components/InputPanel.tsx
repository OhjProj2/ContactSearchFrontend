import { Button, TextField, FormControl } from "@mui/material";

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
              onClick={onAddField}>
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
            onClick={onSearch}
          >
            Search
          </Button>
        </div>
  );
}