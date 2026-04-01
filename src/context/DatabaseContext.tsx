import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface DatabaseContextType {
  selectedDb: string | null;
  selectedCollection: string | null;
  setDatabaseAndCollection: (db: string | null, collection: string | null) => void;
  customDatabases: string[];
  addCustomDatabase: (name: string) => void;
  displayText: string;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDb, setSelectedDb] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [customDatabases, setCustomDatabases] = useState<string[]>([]);

  const setDatabaseAndCollection = (db: string | null, collection: string | null) => {
    setSelectedDb(db);
    setSelectedCollection(collection);
  };

  const addCustomDatabase = (name: string) => {
    if (!name.trim()) return;
    setCustomDatabases(prev => [...new Set([...prev, name])]);
    setSelectedDb(name);
    setSelectedCollection(null);
  };

  const displayText = selectedDb 
    ? `${selectedDb}${selectedCollection ? ` / ${selectedCollection}` : ''}`
    : "Select Database";

  return (
    <DatabaseContext.Provider value={{ 
      selectedDb, 
      selectedCollection, 
      setDatabaseAndCollection, 
      customDatabases, 
      addCustomDatabase,
      displayText
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
