import {Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/Login';
import Databases from './pages/coming_soon';
import { MainLayout } from './layouts/MainLayout';

function App() {
  
  return (
    <>
      <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={() => {}} />} />
        <Route path="/coming_soon" element={<Databases />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;