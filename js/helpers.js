import { TIMEOUT_SEC } from './config.js';
// import { API_KEY } from './config.js';
import { API_KEY2 } from './config.js';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} second`));
		}, s * 1000);
	});
};

export const getJSON = async function (url) {
	try {
		const fetchIt = fetch(`${url}`, {
			method: 'GET',
			headers: {
				'x-rapidapi-key': `${API_KEY2}`,
				'x-rapidapi-host': 'imdb8.p.rapidapi.com',
			},
		});

		const res = await Promise.race([fetchIt, timeout(TIMEOUT_SEC)]);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);
		return data;
	} catch (err) {
		throw err;
	}
};
