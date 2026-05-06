import { Table, Button } from "@heroui/react";
import { exportToCSV } from "../utils/csv";
import { useParams } from "react-router-dom";
import { Card} from "@heroui/react";
import { useSavedData } from "@/hooks/useSavedData";

export function CollectionData() {

  const params = useParams<{ dbname: string, collection: string }>();

  const dbname = params.dbname ?? "";
  const collection = params.collection ?? "";
  const { data: contacts = [] } = useSavedData(dbname, collection);

  return (
    <>
      <Card className="mb-4">
        <h1>Database: {params.dbname}</h1>
        <h1>Collection: {params.collection}</h1>
      </Card>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Example table">
            <Table.Header>
              {Object.keys(contacts[0] || {}).map((key, index) => (
                <Table.Column key={key} isRowHeader={index === 0}>{key.charAt(0).toUpperCase() + key.slice(1)}</Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {contacts.map((contact, index) => (
                <Table.Row key={index}>
                  {Object.values(contact).map((value, col) => (
                    <Table.Cell key={col}>{value}</Table.Cell>
                  )).filter(value => value !== undefined && value !== null)}
                </Table.Row>))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer className="flex justify-between items-center gap-4 p-2">
          <div className="gap-2 flex">
            <Button
              onClick={() => exportToCSV(contacts)}>
              Export Data
            </Button>
          </div>
        </Table.Footer>
      </Table>
    </>
  );
}

export default CollectionData;