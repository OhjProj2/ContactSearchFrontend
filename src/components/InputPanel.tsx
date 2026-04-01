import { Button, Label, TextArea, Form, Card, Input, Checkbox } from "@heroui/react";
import { useState, useEffect } from "react";
import type { SearchParams } from "../types";
import { useDatabase } from "../context/DatabaseContext";
import { listFields } from "../services/api";

type InputPanelProps = {
  search: (params: SearchParams) => Promise<void>;
};

export function InputPanel({ search }: InputPanelProps) {

  const [url, setUrl] = useState<any>()
  const [occupations, setOccupations] = useState<string>("")

  const [newField, setNewField] = useState<string>("")
  const [fields, setFields] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const fetchDefaultFields = async () => {
      try {
        const defaultFields = await listFields();
        const fieldsObj: { [key: string]: boolean } = {};
        
        defaultFields.forEach((field, index) => {
          fieldsObj[field] = index < 5;
        });
        
        setFields(fieldsObj);
      } catch (error) {
        console.error("Failed to fetch default fields", error);
        setFields({ name: true, email: true, phone: true });
      }
    };
    fetchDefaultFields();
  }, []);

  const { selectedDb, selectedCollection } = useDatabase();

  const toggleField = (field: string, isSelected: boolean) => {
    setFields(prev => {
      const newState = {
        ...prev,
        [field]: isSelected
      };
      console.log(`Setting ${field} to ${isSelected}`);
      return newState;
    });
  };

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

        <Card className="p-4 gap-4">
          <Label>3. Data Points to Extract</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter custom data point"
              value={newField}
              onChange={(e) => setNewField(e.target.value)}
            />
            <Button
             onClick={() => {
               if (newField) {
                 setFields((prev) => ({ ...prev, [newField]: true }));
                 setNewField("");
               }
             }}>
              Add
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {Object.keys(fields).map((field) => (
              <Checkbox 
                key={field} 
                id={`checkbox-${field}`}
                defaultSelected={fields[field]} 
                onValueChange={(isSelected) => toggleField(field, isSelected)}
              >
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Content>
                  <Label htmlFor={`checkbox-${field}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                </Checkbox.Content>
              </Checkbox>
            ))}
          </div>  
        </Card>

        <Button
          onClick={() => {
            const activeFields = Object.keys(fields).filter(f => fields[f]);
            search({ 
              url, 
              occupations, 
              dataPoints: activeFields, 
              database: selectedDb || undefined,
              collection: selectedCollection || undefined
            });
          }}
          className="w-full">
          Search
        </Button>
      </Form>
  );
}