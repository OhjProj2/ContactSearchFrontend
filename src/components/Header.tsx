import { Button, Link, Dropdown, Header as HeroHeader, Label, Input } from "@heroui/react";
import { useState } from "react";
import { useDatabase } from "../context/DatabaseContext";
import { useListDatabases } from "../hooks/useListDatabases";
import { listCollections } from "../services/api";

export function Header() {
  const { 
    selectedDb, 
    selectedCollection, 
    setDatabaseAndCollection, 
    customDatabases, 
    addCustomDatabase,
    displayText 
  } = useDatabase();
  
  const { databases, loading } = useListDatabases();
  const [newDbName, setNewDbName] = useState("");
  const [newCollName, setNewCollName] = useState("");
  const [collectionsMap, setCollectionsMap] = useState<Record<string, string[]>>({});

  const allDatabases = [...new Set([...databases, ...customDatabases])];

  // Fetch collections for all databases to ensure submenus are populated
  const fetchAllCollections = async () => {
    for (const db of allDatabases) {
      if (!collectionsMap[db]) {
        try {
          const colls = await listCollections(db);
          setCollectionsMap(prev => ({ ...prev, [db]: colls }));
        } catch (error) {
          console.error(`Failed to fetch collections for ${db}`, error);
        }
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-divider bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/">
            <span className="text-xl font-bold tracking-tight">Contact Search</span>
          </a>
        </div>

        {/* Links (Desktop) */}
        <div className="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:flex items-center gap-6">
          <Link href="/coming_soon" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">Databases</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Dropdown onOpenChange={(open) => open && fetchAllCollections()}>
            <Button 
              size="sm" 
              aria-label="Select Database" 
              variant={selectedDb && selectedCollection ? "solid" : "secondary"}
              color={selectedDb && selectedCollection ? "primary" : "default"}
              className={`min-w-[140px] transition-all duration-300 ${
                selectedDb && selectedCollection 
                  ? 'ring-2 ring-primary/20 shadow-lg' 
                  : 'animate-pulse border-primary/50 border-2'
              }`}
            >
              {loading ? "Loading..." : displayText}
            </Button>
            <Dropdown.Popover className="min-w-[280px]">
              <div className="p-3 border-b border-divider flex flex-col gap-2">
                <Label className="text-xs font-semibold">Add New Database</Label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Database name" 
                    value={newDbName}
                    onChange={(e) => setNewDbName(e.target.value)}
                  />
                  <Button size="sm" onPress={() => {
                    if (newDbName) {
                      addCustomDatabase(newDbName);
                      setNewDbName("");
                    }
                  }}>
                    Add
                  </Button>
                </div>
              </div>

              <Dropdown.Menu onAction={(key) => {
                const keyStr = String(key);
                if (keyStr.includes(":::")) {
                   const [db, coll] = keyStr.split(":::");
                   setDatabaseAndCollection(db, coll);
                }
              }}>
                <Dropdown.Section>
                  <HeroHeader>Select Database & Collection</HeroHeader>
                  {allDatabases.map((db) => (
                    <Dropdown.SubmenuTrigger key={db}>
                      <Dropdown.Item 
                        id={db} 
                        textValue={db}
                      >
                        <Label>{db}</Label>
                        <Dropdown.SubmenuIndicator />
                      </Dropdown.Item>
                      <Dropdown.Popover className="min-w-[200px]">
                        <div className="p-2 border-b border-divider flex flex-col gap-2">
                          <Label className="text-xs font-semibold">New Collection in {db}</Label>
                          <div className="flex gap-1">
                            <Input 
                              placeholder="Name" 
                              value={newCollName}
                              onChange={(e) => setNewCollName(e.target.value)}
                            />
                            <Button size="sm" onPress={() => {
                              if (newCollName) {
                                setDatabaseAndCollection(db, newCollName);
                                setNewCollName("");
                              }
                            }}>Set</Button>
                          </div>
                        </div>
                        <Dropdown.Menu onAction={(key) => {
                          const keyStr = String(key);
                          if (keyStr.includes(":::")) {
                            const [dbName, collName] = keyStr.split(":::");
                            setDatabaseAndCollection(dbName, collName);
                          }
                        }}>
                          {(collectionsMap[db] || []).length > 0 ? (
                            collectionsMap[db].map(coll => (
                              <Dropdown.Item key={`${db}:::${coll}`} id={`${db}:::${coll}`} textValue={coll}>
                                <div className="flex items-center justify-between w-full">
                                  <Label>{coll}</Label>
                                  {selectedDb === db && selectedCollection === coll && (
                                    <Dropdown.ItemIndicator />
                                  )}
                                </div>
                              </Dropdown.Item>
                            ))
                          ) : (
                            <Dropdown.Item id={`${db}:::none`} isDisabled textValue="No collections found">
                              <Label className="text-xs text-foreground/50">No collections found</Label>
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown.SubmenuTrigger>
                  ))}
                </Dropdown.Section>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          <Button size="sm" onPress={() => window.location.href = "/login"}>
            Log in
          </Button>
          <Button size="sm" onPress={() => window.location.href = "/coming_soon"}>
            Register
          </Button>
        </div>
        
      </div>
    </nav>
  );
}
