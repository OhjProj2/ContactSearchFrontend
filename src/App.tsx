import {Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import Databases from './pages/databases';
import { MainLayout } from './layouts/MainLayout';
import { DatabaseCollections } from './pages/databaseCollections';
import { CollectionData } from './pages/collectionData';

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/databases" element={<Databases />} />
          <Route path="/databases/:dbname" element={<DatabaseCollections />} />
          <Route path="/databases/:dbname/:collection" element={<CollectionData />} />
        </Route>
      </Routes>
    </> 
  );
}

export default App;