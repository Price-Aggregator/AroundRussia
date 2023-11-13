async function checkResponse(res) {
	if (res.ok) {
		if (res.status === 204) {
			return res;
		}
		return res.json();
	}
	const object = await Promise.resolve(res.json());
	const array = Object.keys(object).map((key) => `${key}: ${object[key]}`);
	return Promise.reject(array);
}

export default checkResponse;
