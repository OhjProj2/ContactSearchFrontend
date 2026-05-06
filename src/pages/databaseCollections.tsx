import { Card, Separator } from "@heroui/react";
import { useCollections } from "@/hooks/useCollections";
import { Link, useParams } from "react-router-dom";

export function DatabaseCollections() {
  const params = useParams<{ dbname?: string }>();
  const db = params.dbname ?? "";
  const { collections } = useCollections(db);

  return (
    <>

      <Card>
        <h1>Database: {db}</h1>
        <Separator className="my-2" />

        <ul>
          {collections.map((collection) => (
            <li key={collection}>
              <Link to={`/databases/${db}/${collection}`} className="text-primary hover:underline">
                {collection}
              </Link>
            </li>
          ))}
        </ul>

      </Card>

      <div className="mt-4">
        <Link to={"/databases"} className="text-sm font-medium text-primary hover:underline">
          Back to Databases
        </Link>
      </div>
    </>
  );
}

export default DatabaseCollections;