import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Text from '../Text/Text';
import Tickets from '../Tickets/Tickets';
import NotFound from '../NotFound/NotFound';
import Questions from '../Questions/Questions';
import Search from '../Search/Search';
import Calendar from '../calendar/Calendar';
import styles from './App.module.css';

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
			<div>
				<Header />
				<Search />
				<Calendar departureCity=" Москва" arrivalCity=" Калининград" />
				<Tickets />
				<Footer />
			</div>
		),
	},

	{
		path: '/*',
		element: <NotFound />,
	},
]);

function App() {
	return (
		<div className={styles.app}>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
