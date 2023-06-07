import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Text from '../Text/Text';
import Questions from '../Questions/Questions';
import Ticket from '../Ticket/Ticket';


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Text />
        <Questions />
        <Footer />
      </>
    ),
  },
  {
    path: 'result',
    element: (
      <>
        <Header />
        <Ticket price='2 000' />
        <Footer />
      </>
    ),
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
