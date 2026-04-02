import '../styles/App.css';
import "../styles/HeroUITheme.css"
import { InputPanel } from '../components/InputPanel';
import { useContactSearch } from '../hooks/useContactSearch';
import {Table, ProgressCircle, Button} from "@heroui/react";
import { exportToCSV } from '../utils/csv';

function Home() {
  
  const {results, loading, search} = useContactSearch();
  
  const contacts = results?.data.contacts || [
    {name: "", email: "", phone: ""},
  ];
  
  return (
    <>
      <div className="gap-6 flex flex-col max-w-7xl mx-auto">
        <InputPanel
        search={search}
        />

        {loading && (
        <ProgressCircle isIndeterminate color='default' aria-label="Loading">
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
          <Table.Footer className="flex flex-row-reverse items-center gap-4 p-1">
            <Button
              onClick={() => exportToCSV(contacts)}>
              Export Data
            </Button>
          </Table.Footer>
        </Table>
        )}
      </div>
    </>
  );
}

export default Home;