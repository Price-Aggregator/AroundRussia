/* eslint consistent-return: ["error", { "treatUndefinedAsUnspecified": false }] */
import { useEffect } from 'react';
import { useLatest } from './UseLatest';

function useOutsideClick(elementRef, handler, attached = true) {
	const latestHandler = useLatest(handler);

	useEffect(() => {
		if (!attached) return;

		const handleClick = (e) => {
			if (!elementRef.current) return;

			if (!elementRef.current.contains(e.target)) {
				latestHandler.current();
			}
		};

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [elementRef, latestHandler, attached]);
}

export default useOutsideClick;
