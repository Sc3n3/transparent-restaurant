import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Homepage from './screens/Homepage';
import NotFound from './screens/404';
import Menu from './screens/Menu';
import Meal from './screens/Meal';

const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ pathname ]);

  return null;
}

const App = () => {
  return (
    <Router>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/meal/:mealId" element={<Meal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;