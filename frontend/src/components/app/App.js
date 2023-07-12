import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from "react-redux";
import NotFound from '../NotFound/NotFound';
import ResultPage from '../../pages/ResultPage';
import MainPage from '../../pages/MainPage';
import Layout from '../Layout/Layout';
import styles from './App.module.css';
import { getCities } from '../../store/Cities/slice';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import TravelPlanPage from '../../pages/TravelPlanPage';



const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <MainPage />
        )
      },
      {
        path: 'result',
        element: (
          <ResultPage />
        )
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'travel/plan',
        element: (
          <TravelPlanPage />
        )
      }
    ]
  },
  {
    path: '/*',
    element: <NotFound />,
  },
])

function App() {
  const dispatch = useDispatch()
  dispatch(getCities())



  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
