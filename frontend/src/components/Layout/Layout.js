import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout() {
	const isLoading = useSelector((state) => state.loader.isLoading);

	return isLoading ? (
		<Outlet />
	) : (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default Layout;
