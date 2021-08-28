import axios from 'axios';

export function getStrapiURL(path = '') {
	return `${'https://soramimvp.herokuapp.com'}${path}`;
}

export async function fetchAPI(path) {
	const requestUrl = getStrapiURL(path);
	const response = await fetch(requestUrl);
	const data = await response.json();
	return data;
}
