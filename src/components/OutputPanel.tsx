import type { SearchResponse } from '../types';
import { Button } from '@mui/material';
import { exportToCSV } from '../utils/csv';
import '../styles/App.css';

type Props = {
    results: SearchResponse | null;
    status: string;
}

export function OutputPanel({ results, status }: Props) {
    return (
        <div className="output-panel">
            <h3>Output</h3>
            {results && (
                <div className="time_and_export">
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                        Found {results.data.contacts.length} contacts in <strong>{results.time.toFixed(2)}s</strong>
                    </div>
                    <Button className="button" onClick={() => exportToCSV(results.data.contacts)}>
                        Export to CSV
                    </Button>
                </div>
            )}

            <div className='output-container'>
                {status}
                {results && results.data.contacts.map((contact: any, index: number) => (
                    <div key={index}>
                        {Object.entries(contact).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
                            </div>
                        ))}
                        <hr style={{ width: "90%", margin: "10px 0 10px 0", borderColor: "#8f8f8f" }} />
                    </div>
                ))}

            </div>
        </div>
    )
}