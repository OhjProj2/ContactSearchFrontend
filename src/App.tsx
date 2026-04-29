import {Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import Databases from './pages/databases';
import { MainLayout } from './layouts/MainLayout';

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/databases" element={<Databases />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;