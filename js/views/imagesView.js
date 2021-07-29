import View from './View.js';

class ImagesView extends View {
	_parentElement = document.querySelector('.images-container');
	_errorMessage = 'Ops, the data got lost on its way here, please try again';
	_message = '';

	/**
	 *
	 * @param {function} fnHandler it executes controlGetImages in control.js
	 */
	addHandlerDisplayImages(fnHandler) {
		document.addEventListener('onOverviewLoaded', fnHandler);
	}

	_generateMarkup() {
		return this._data.map((image) => this._generateMarkupPreview(image)).join('');
	}

	_generateMarkupPreview(image) {
		//prettier-ignore
		return `   
        <div class="poster">
            <img src="${image.url}" class="shrunk-img" alt="${image.caption}"/>
        </div>
                `;
		// return `
		// <div class="poster">
		//     <a href="#"><img src="${image.url}" class="shrunk-img" alt="${image.caption}" loading="lazy"/></a>
		// </div>
		//         `;
	}
}

export default new ImagesView();
