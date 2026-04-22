
import {Button, ComboBox, ListBox, Label, Input, Modal} from "@heroui/react";
import { useState } from "react";
import { saveIdToColl } from "../services/saveIdToColl.ts";

export function SaveButton({id}: {id: string}) {

  const [databases, setDatabases] = useState<null | string[]>(null);
  const [collections, setCollections] = useState<null | string[]>(null);

  const [dbInput, setDbInput] = useState<string | null>(null);
  const [collInput, setCollInput] = useState<string | null>(null);

  const handleOpenChange = async (open: boolean) => {
    if (!open) return; 
    try {
      const databases = await fetch(`${import.meta.env.VITE_BACKEND_URL}/listdbs`);
      const json = await databases.json();
      setDatabases(json);
      console.log("databases: ", json);
    } catch (err) {
        console.error(err);
    }
  };

  const handleDbInputChange = async (input: string) => {
    setDbInput(input);
    if (!input) {
      setCollections([]);
      return
    }
    try {
      const collections = await fetch(`${import.meta.env.VITE_BACKEND_URL}/listcollections?db_name=${input}`);
      const json = await collections.json();
      setCollections(json);
      console.log("collections: ", json);
    } catch (err) {
        console.error(err);
        setCollections(null);
    }
  }

  const handleCollInputChange = (input: string) => {
    if (!input) return;
    setCollInput(input);
  }

  const handleSubmit = async () => {
    if (!dbInput || !collInput) {
      return;
    }

    try {
      const result = await saveIdToColl({id, db_name: dbInput, col_name: collInput});
      console.log("Save successful: ", result);
    } catch (err) {
      console.error("Save failed: ", err);
    };
  }

  return (

    <Modal onOpenChange={handleOpenChange}>
      <Button>Save To Database</Button>
      <Modal.Backdrop variant="blur">
        <Modal.Container size="sm">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Save To Database</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit} className="h-50 justify-center items-center gap-4 flex flex-col">

                <ComboBox 
                  className="w-[256px]"
                  allowsCustomValue
                  onInputChange={handleDbInputChange}
                  isRequired
                  >
                  <Label>Database</Label>
                  <ComboBox.InputGroup>
                    <Input required placeholder="Search databases..." />
                    <ComboBox.Trigger />
                  </ComboBox.InputGroup>
                  <ComboBox.Popover>
                    <ListBox>
                      {databases?.map((db) => (
                        <ListBox.Item key={db} textValue={db}>
                          {db}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </ComboBox.Popover>
                </ComboBox>

                <ComboBox
                  className="w-[256px]" 
                  allowsCustomValue
                  isRequired
                  onInputChange={handleCollInputChange}
                  >
                  <Label>Collection</Label>
                  <ComboBox.InputGroup>
                    <Input required placeholder="Search collections..."/>
                    <ComboBox.Trigger />
                  </ComboBox.InputGroup>
                  <ComboBox.Popover>
                    <ListBox>
                      {collections?.map((coll) => (
                        <ListBox.Item key={coll} textValue={coll}>
                          {coll}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </ComboBox.Popover>
                </ComboBox>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="w-full" type="submit" slot="close" onClick={handleSubmit}>
                Save
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}