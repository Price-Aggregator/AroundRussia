import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Text from '../Text/Text';
import NotFound from '../NotFound/NotFound';
import Questions from '../Questions/Questions';
import Ticket from '../Ticket/Ticket';
import Search from '../Search/Search';


const router = createBrowserRouter([

	{
		path: '/',
		element: (
			<>
				<Header />
				<Search />
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

  {
    path: '/*',
    element: (
      <NotFound />
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
