import { useDatabases } from "@/hooks/UseDatabases";
import { Card } from "@heroui/react";

export function Databases() {

  const { databases } = useDatabases();

  return (
    <>
      <h1>Databases</h1>
      <Card>
        {databases && (databases.map((db) => (
          <div key={db}>{db}</div>
        )))}
      </Card>
    </>
  );
}

export default Databases;