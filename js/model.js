import { API_CURRENT_COUNTRY, API_IMAGES_LIMIT, API_URL_IMAGES, API_URL_OVERVIEW, API_URL_TITLE, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
	currrentShow: {},
	search: {
		query: '',
		results: [],
		resultsPerPage: RES_PER_PAGE,
		page: 1,
	},
	titleId: '',
	titleIndex: 0,
	images: [],
	bookmarks: [],
};

/**
 * Stores in the "state" the JSON recieved containing all the shows matching the criteria
 * @param {string} query value stored in the state at this point
 */
export const loadSearchFindTitle = async function (query) {
	try {
		//1. get search query
		state.search.query = query;

		const response = await getJSON(`${API_URL_TITLE}${query}`);
		const showsArr = Array.from(response.results);
		//The API throws a lot of show types, but we are only interested in movies and series (and only if they have an image to display)
		const shows = showsArr.filter((show) => (show.titleType === 'tvSeries' || show.titleType === 'movie') && 'image' in show);

		state.search.results = shows.map((show) => {
			return {
				id: show.id.split('/')[2],
				title: show.title,
				titleType: show.titleType,
				imageUrl: show.image.url,
				year: show.year,
				originalPrincipals: show.principals,

				//Series only, attributes:
				//Checks if the attribute exists and if it does exist it adds it, otherwise is not added
				...(show.seriesStartYear && { seriesStartYear: show.seriesStartYear }),

				//Movies only, attributes:
				...(show.year && { year: show.year }),
			};
		});
	} catch (err) {
		throw err;
	}
};

/**
 * Destructures the original object and builds a simpler array with the elements needed
 * @param {object} principals object with the actors and other useless data from the chosen show
 * @returns Array of elements [actorName, [rolesPlayed]]
 */
const getPerformersRoles = function (principals) {
	if (!principals) return;
	let performersList = principals.map((actor) => [actor.name, actor.roles.map((role) => role.character)]);
	return performersList;
};

/**
 * Gets more data about an specific title and merges it with the previous data stored in the "state"
 * @param {string} titleId Target Movie/Series
 * @returns {string} titleIndex: index of the updated element in the array
 */
export const loadOverviewData = async function (titleId) {
	try {
		const response = await getJSON(`${API_URL_OVERVIEW}${titleId}${API_CURRENT_COUNTRY}`);
		state.titleIndex = state.search.results.findIndex((show) => show.id === titleId);
		state.currrentShow = state.search.results[state.titleIndex];

		state.currrentShow.rating = response.ratings.rating ?? 'Unrated';
		state.currrentShow.genres = response.genres;
		state.currrentShow.summary = response.plotSummary?.text || response.plotOutline?.text || 'No description available for this show';
		state.currrentShow.principals = getPerformersRoles(state.currrentShow.originalPrincipals) ?? 'Unknown Performers';
	} catch (err) {
		throw err;
	}
};

export const loadImages = async function (titleId) {
	try {
		const response = await getJSON(`${API_URL_IMAGES}${titleId}${API_IMAGES_LIMIT}`);
		state.images = response.images.map((img) => {
			return {
				url: img.url,
				caption: img.caption,
			};
		});
	} catch (err) {
		throw err;
	}
};
