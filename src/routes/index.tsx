import React from 'react';
import { useRoutes } from 'react-router-dom';
import { HomePage } from '../features/home';

const AppRoutes: React.FC = () => {
  return useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
  ]);
};

export default AppRoutes;
