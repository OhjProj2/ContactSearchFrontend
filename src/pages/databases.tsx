import { useDatabases } from "@/hooks/UseDatabases";
import { Card, Separator } from "@heroui/react";
import { Link } from "react-router-dom";

export function Databases() {

  const { databases } = useDatabases();

  return (
    <>
      <Card>
        <h1>Databases</h1>
        <Separator className="my-2" />

        <ul>
          {databases?.map((db, index) => (
            <li key={db}>
              <Link to={`/databases/${db}`} className="text-primary hover:underline">
                {db}
              </Link>
              {index < databases.length - 1 && <Separator className="my-2" />}
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

export default Databases;