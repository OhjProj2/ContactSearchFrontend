 import { Table, ProgressCircle, Button } from "@heroui/react"
 import { exportToCSV } from "../utils/csv"
import type { SearchResponse } from "../types"
import { SaveButton } from "./SaveButton.tsx"
 
type Props = {
  results: SearchResponse | null
  loading: boolean
}

export function OutputPanel({results, loading}: Props) {
  
  const contacts = results?.data.contacts || [
    {name: "", email: "", phone: ""},
  ];

  return(
    <>
      {loading && (
        <ProgressCircle valueLabel="Loading..." isIndeterminate color='default' aria-label="Loading">
        <ProgressCircle.Track>
        <ProgressCircle.TrackCircle />
        <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
        </ProgressCircle>
      )}
      
      
      {results && 
      (<Table className="h-">
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
                ))}
              </Table.Row>))}
              </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer className="flex justify-between items-center gap-4 p-2">  
        <p>Found {results.data.contacts.length} contacts in <strong>{results.time.toFixed(2)}s</strong></p>
        <div className="gap-2 flex">
          <SaveButton id={results.id} />
          <Button
            onClick={() => exportToCSV(contacts)}>
            Export Data
          </Button>
        </div>
          </Table.Footer>
        </Table>
        )}
    </>
  )
}
