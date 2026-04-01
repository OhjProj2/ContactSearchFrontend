import { Button, Label, TextArea, Form, Card, Input } from "@heroui/react";
import { useState } from "react";
import type { SearchParams } from "../types";

type InputPanelProps = {
  search: (params: SearchParams) => Promise<void>;
};

export function InputPanel({ search }: InputPanelProps) {

  const [url, setUrl] = useState<any>()
  const [occupations, setOccupations] = useState<string>("")

  const [newField, setNewField] = useState<string>("")
  const [fields, setFields] = useState<{ [key: string]: boolean }>({
    name: true,
    email: true,
    phone: true,
  })

  return (
      <Form className="flex flex-col gap-4 w-full">  {/* Form Container */}

        <Card className="flex flex-col">  {/* URL Input */}
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
            onChange={(e) => setOccupations(e.target.value)}
          />
        </Card>

        <Card>
          <Label>3. Data Points to Extract</Label>
          <Input
            placeholder="Enter data point"
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
          />
          <Button
           onClick={() => setFields((prev) => ({ ...prev, [newField]: true }))}>
            Add
          </Button>
          <div className="flex flex-row gap-2">
            {Object.keys(fields).map((field) => (
              <div key={field} className="flex items-center gap-2">
                <Button>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Button>
              </div>
            ))}
          </div>  
        </Card>

        <Button
          onClick={() => search({ url, occupations, dataPoints: Object.keys(fields) })}
          className="w-full">
          Search
        </Button>
      </Form>
  );
}