import {Routes, Route} from 'react-router-dom';

import Home from './pages/home';
import { MainLayout } from './layouts/MainLayout';
import ComingSoon from './pages/coming_soon';

function App() {
  
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/coming_soon" element={<ComingSoon />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;