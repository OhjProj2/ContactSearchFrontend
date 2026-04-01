import '../styles/App.css';
import "../styles/HeroUITheme.css"
import { InputPanel } from '../components/InputPanel';
import { useContactSearch } from '../hooks/useContactSearch';
import {Table} from "@heroui/react";

function Home() {

  const {results, search} = useContactSearch();

  const contacts = results?.data.contacts || [
    {"name": "John Doe", "email": "john.doe@example.com", "phone": "123-456-7890", "occupation": "Software Engineer"},
  ];
  
  return (
    <>

      <div className="gap-6 flex flex-col max-w-7xl mx-auto">
        <InputPanel
        search={search}
        />

          <Table className="h-">
            <Table.ScrollContainer>
              <Table.Content aria-label="Example table">
                <Table.Header>
                    <Table.Row>
                      {Object.keys(contacts[0] || {}).map((key, index) => (
                        <Table.Column key={key} isRowHeader={index === 0}>{key}</Table.Column>
                      ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {contacts.map((contact, index) => (
                      <Table.Row key={index}>
                        {Object.values(contact).map((value, idx) => (
                          <Table.Cell key={idx}>{value}</Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
      </div>
    </>
  );
}

export default Home;