import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useDispatch } from "react-redux";
import NotFound from '../NotFound/NotFound';
import ResultPage from '../../pages/ResultPage';
import MainPage from '../../pages/MainPage';
import Layout from '../Layout/Layout';
import styles from './App.module.css';
import { getCities } from '../../store/Cities/slice';


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
