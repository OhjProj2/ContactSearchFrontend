import { Button, Label, TextArea, Card, Input, Chip } from "@heroui/react";
import { useState } from "react";
import {CircleXmark, Magnifier, CirclePlus} from '@gravity-ui/icons';
import type { SearchParams } from "../types";

type InputPanelProps = {
  search: (params: SearchParams) => Promise<void>;
};

export function InputPanel({ search }: InputPanelProps) {

  const [url, setUrl] = useState<any>()
  const [occupations, setOccupations] = useState<string>("")

  const [newField, setNewField] = useState<string>("")
  const [fields, setFields] = useState<string[]>(["name", "email", "phone"])

  const handleSearch = () => {
    const occupationsArray = occupations ?occupations.split(",").map((occ) => occ.trim()) : [""];
    search({ url, occupations: occupationsArray, dataPoints: fields})
    console.log( typeof(occupationsArray), occupationsArray)
  }

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
            required={true}
          />
        </Card>

        <Card className="flex flex-col">   {/* Occupation Input */}
          <Label htmlFor="occupations">2. Occupation / Role</Label>
          <TextArea
            id="occupations"
            placeholder="Enter occupation or role"
            rows={3}
            value={occupations}
            onChange={(e) => {
              setOccupations(e.target.value)
              console.log(occupations)
            }}
          />
        </Card>

        <Card>  {/* Data Points Input */}
          <Label>3. Data Points to Extract</Label>
          <Input
            placeholder="Enter data point"
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
          />
          <Button
           onClick={() => setFields((prev) => ([...prev, newField]))}>
            Add
            <CirclePlus className="w-3.5 h-3.5"/>
          </Button>
          <div className="flex flex-row gap-2">
            {fields.map((field) => (
              <div key={field} className="flex items-center gap-2">
                <Chip className="chip--lg">
                  <div className="">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </div>
                  <Button
                    className="p-0"
                    size="sm"
                    variant="ghost"
                    onClick={() => setFields((prev) => prev.filter((f) => f !== field))}>
                    <CircleXmark  className="w-3.5 h-3.5 m-0 "/>
                  </Button>
                </Chip>
              </div>
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