import React from 'react';
import { Route, Routes } from 'react-router';

// Pages
import HomePage from './pages/HomePage';
import CarDetailsPage from './pages/CarDetailsPage';
import CarsPage from './pages/CarsPage';
import CreateCarPage from './pages/CreateCarPage';
import EditCarPage from './pages/EditCarPage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './layouts/RootLayout';

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />

        {/* /cars */}
        <Route path="cars">
          <Route index element={<CarsPage />} />
          <Route path="new" element={<CreateCarPage />} />
          <Route path=":id" element={<CarDetailsPage />} />
          <Route path=":id/edit" element={<EditCarPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
