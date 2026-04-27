import { Button, Label, TextArea, Card, Input, Chip } from "@heroui/react";
import { useState, useEffect } from "react";
import {CircleXmark, Magnifier, CirclePlus} from '@gravity-ui/icons';
import type { SearchParams } from "../types";
import { useFields } from "../hooks/useFields";
type InputPanelProps = {
  search: (params: SearchParams) => Promise<void>;
};

type Field = {
  label: string;
  value: string;
};

export function InputPanel({ search }: InputPanelProps) {
  const [url, setUrl] = useState<any>()
  const [occupations, setOccupations] = useState<string[]>([])
  const [newOccupation, setNewOccupation] = useState<string>("")
  const [newField, setNewField] = useState<string>("")
  const [fields, setFields] = useState<Field[]>([])
  const [activeFields, setActiveFields] = useState<Record<string, boolean>>({});
  
  const { fields: data } = useFields();

useEffect(() => {
  if (!data) return;

  setFields(data);

  const newActive: Record<string, boolean> = {};
  data.forEach((f, index) => {
    newActive[f.value] = index < 5;
  });
  setActiveFields(newActive);
}, [data]);

  const handleSearch = () => {
    const activeDataPoints = fields.filter(f => activeFields[f.value]).map(f => f.value);
    search({ url, occupations, dataPoints: activeDataPoints });
  }
  const addOccupation = () => {
  const trimmed = newOccupation.trim();
  if (trimmed && !occupations.includes(trimmed)) {
    setOccupations(prev => [...prev, trimmed]);
    setNewOccupation("");
  }
};
  return (
      <Card className="flex flex-col gap-4 w-full bg-surface-secondary">
        
        <Card className="flex flex-col drop-shadow-2xl">  {/* URL Input */}
          <Label htmlFor="url">
            1. Target websites
          </Label>
          <TextArea
            id="url"
            placeholder="https://www.example.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            rows={5}
            required={true}/>
        </Card>

        <Card className="flex flex-col">
          <Label htmlFor="occupations">2. Occupation / Role</Label>
          <div className="flex flex-row gap-2">
            <Input
              placeholder="Enter occupation or role"
              value={newOccupation}
              onChange={(e) => setNewOccupation(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addOccupation(); }}
            />
            <Button onClick={addOccupation}>
              Add
              <CirclePlus className="w-3.5 h-3.5"/>
            </Button>
          </div>
          <div className="flex flex-row gap-2 flex-wrap mt-2">
            {occupations.map((occ) => (
              <Chip key={occ} className="chip--lg bg-primary text-white border border-gray-400">
                <div className="flex items-center justify-between w-full">
                  <span>{occ}</span>
                  <Button
                    className="p-0 ml-2"
                    size="sm"
                    variant="ghost"
                    onClick={() => setOccupations(prev => prev.filter(o => o !== occ))}
                  >
                    <CircleXmark className="w-3.5 h-3.5 m-0"/>
                  </Button>
                </div>
              </Chip>
            ))}
          </div>
        </Card>

        <Card>  {/* Data Points Input */}
          <Label>3. Data Points to Extract</Label>
          <Input
            placeholder="Enter data point"
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
          />
          <Button
           onClick={() => {
            const fieldObj = { label: newField, value: newField };
            setFields(prev => [...prev, fieldObj]);
            setActiveFields(prev => ({ ...prev, [fieldObj.value]: true }));
            setNewField("");
            }}>
            Add
            <CirclePlus className="w-3.5 h-3.5"/>
          </Button>
          <div className="flex flex-row gap-2 flex-wrap mt-2">
            {fields.map((field) => (
              <Chip
                key={field.value}
                className={`chip--lg cursor-pointer border border-transparent 
                  ${activeFields[field.value] ? "bg-primary text-white border-gray-400" : "bg-surface-light text-muted"}`}
              >
                <div
                  className="flex items-center justify-between w-full"
                  onClick={() =>
                    setActiveFields(prev => ({ ...prev, [field.value]: !prev[field.value] }))
                  }
                >
                  <span>{field.label}</span>
                  <Button
                    className="p-0 ml-2"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setFields(prev => prev.filter(f => f.value !== field.value));
                      setActiveFields(prev => {
                        const copy = { ...prev };
                        delete copy[field.value];
                        return copy;
                      });
                    }}
                  >
                    <CircleXmark className="w-3.5 h-3.5 m-0"/>
                  </Button>
                </div>
              </Chip>
            ))}
          </div>  
        </Card>

        <Button
          onClick={handleSearch}
          className="w-full">
          Search
          <Magnifier className="w-4 h-4"/>
        </Button>
      </Card>
  );
}