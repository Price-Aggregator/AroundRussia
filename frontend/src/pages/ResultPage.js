import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../components/Search/Search';
import Calendar from '../components/calendar/Calendar';
import Tickets from '../components/Tickets/Tickets';
import getSearchFormState from '../store/SearchForm/selectors';
import { fetchCalendar } from '../store/Calendar/slice';
import { getAllCities } from '../store/Cities/selectors';
import { clearTickets, fetchTickets } from '../store/Tickets/slice';
import getTickets from '../store/Tickets/selectors';
import { setForm } from '../store/SearchForm/slice';
import Loader from '../components/Loader/Loader';
import { showLoader, hideLoader } from '../store/Loader/slice';
import getLoaderState from '../store/Loader/selectors';

function ResultPage() {
	const dispatch = useDispatch();
	const form = useSelector(getSearchFormState);
	const cities = useSelector(getAllCities);
	const tickets = useSelector(getTickets);
	// dispatch(fetchCalendar(form))
	const isLoading = useSelector(getLoaderState);

	// eslint-disable-next-line no-unused-vars

	useEffect(() => {
		if (cities.length > 1 && tickets && tickets.length < 1) {
			dispatch(showLoader());
			const storageSave = JSON.parse(localStorage.getItem('form'));
			const fromCityIATA = cities.find(
				(item) => item.name.toLowerCase() === storageSave.from.toLowerCase()
			);
			const toCityIATA = cities.find(
				(item) => item.name.toLowerCase() === storageSave.to.toLowerCase()
			);
			const formData = {
				from: fromCityIATA?.code || '',
				to: toCityIATA?.code || '',
				when: storageSave.when || '',
				whenReturn: storageSave.whenReturn || '',
				sortingMode: storageSave.sortingMode || 'price',
				isDirect: storageSave.isDirect || '',
			};
			dispatch(setForm(formData));
			dispatch(clearTickets());
			dispatch(fetchTickets(formData));
			dispatch(fetchCalendar(formData));
			dispatch(hideLoader());
		}
	}, [cities]);

	return (
		<main>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<Search />
					<Calendar
						departureCity={form.from}
						arrivalCity={form.to}
						when={form.when}
					/>
					<Tickets />
				</>
			)}
		</main>
	);
}

export default ResultPage;
