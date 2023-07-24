function checkResponse(res) {
	if (res.ok) {
		if (res.status === 204) {
			return res;
		}
		return res.json();
	}
	return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

export default checkResponse;
