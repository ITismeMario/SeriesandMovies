import * as model from './model.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import overviewView from './views/overviewView.js';
import imagesView from './views/imagesView.js';
import performersView from './views/performersView.js';
import modalWindow from './modalWindow.js';

const eventImages = new Event('onOverviewLoaded'); //The event will load and display the images (the handler is in imagesView)

const controlFindTitle = async function () {
	try {
		resultsView.displayLoading();

		const query = searchView.getQuery();
		if (!query) return;

		await model.loadSearchFindTitle(query);

		resultsView.render(model.state.search.results);
	} catch (err) {
		resultsView.displayError();
		console.error(err);
	}
};

const controlGetOverview = async function () {
	try {
		overviewView.displayLoading();

		model.state.titleId = overviewView.getTitleId();
		if (!model.state.titleId) return;

		await model.loadOverviewData(model.state.titleId);

		if (model.state.titleIndex == null && model.state.titleIndex != 0) return;

		overviewView.render(model.state.currrentShow);

		controlGetPerformers();

		document.dispatchEvent(eventImages);
	} catch (err) {
		resultsView.displayError();
		console.error(err);
	}
};

const controlGetPerformers = function () {
	performersView.render(model.state.currrentShow.principals);
};

const controlGetImages = async function () {
	try {
		imagesView.displayLoading();

		await model.loadImages(model.state.titleId);

		imagesView.render(model.state.images);

		modalWindow.suscribeImages();
	} catch (err) {
		resultsView.displayError();
		console.error(err);
	}
};

const init = function () {
	searchView.addHandlerSearch(controlFindTitle);
	overviewView.addHandlerRender(controlGetOverview);
	imagesView.addHandlerDisplayImages(controlGetImages);
	modalWindow.suscribeCloseModal();
	modalWindow.suscribeImages();
};
init();
