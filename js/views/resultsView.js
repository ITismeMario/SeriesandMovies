import View from './View.js';

class ResultsView extends View {
	_parentElement = document.querySelector('.results');
	_errorMessage = 'We could not find that title. Please try another one!';
	_message = '';

	/**
	 * Iterates through every element in _data(the search result) and prints it
	 * on the document
	 * @returns {HTMLElement} HTML tag
	 */
	_generateMarkup() {
		return this._data.map(show => this._generateMarkupPreview(show)).join('');
	}

	_generateMarkupPreview(show) {
		//prettier-ignore
		return `   
        <li>
            <div class="preview">
                <div class="preview-results">
                    <a class="preview-link" href="#${show.id}" style="text-decoration: none">
                        <div class="result-item">
                            <div class="preview-poster">
                                <img src=${show.imageUrl}" alt="${show.title}" loading="lazy"/>
                            </div>
                            <div class="preview-info">
                                <div class="preview-name">${show.title}</div>
                                <div class="preview-year">${show.year}</div>
                                <div class="preview-type">${show.titleType === 'tvSeries' ? 'Tv Series' : 'Movie'}</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </li>       
                `;
	}
}

export default new ResultsView();
