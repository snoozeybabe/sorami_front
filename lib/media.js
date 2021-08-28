import { getStrapiURL } from './api';

export function getStrapiMedia(media) {
	console.log('media');
	if (!media) return false;
	const imageUrl =
		media.url && media.url.startsWith && media.url.startsWith('/')
			? getStrapiURL(media.url)
			: media.url;
	return imageUrl;
}
