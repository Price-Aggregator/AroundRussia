import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.module.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Text from '../Text/Text';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<Header />
				<Text />
				<Footer />
			</>
		),
	},
	{
		path: 'result',
		element: (
			<>
				<Header />
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
