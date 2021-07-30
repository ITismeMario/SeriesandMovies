import View from './View.js';

class OverviewView extends View {
	_parentElement = document.querySelector('.overview-container');
	_errorMessage = 'Ops, the data got lost on its way, please try again';
	_message = '';

	/**
	 * The titleId is necesary to perform the 2nd fetch
	 * @returns {string} titleId
	 */
	getTitleId() {
		const titleId = window.location.hash.slice(1);
		return titleId;
	}

	addHandlerRender(fnHandler) {
		// ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, fnHandler));
		window.addEventListener('hashchange', fnHandler);
	}

	_generateMarkup() {
		//prettier-ignore
		return `          
		    <div class="col-lg-4 image-container">
				<div class="poster"><img src="${this._data.imageUrl}" alt="" /></div>
			</div>
			<div class="col-lg-8 summary-container">
				<div class="display-title">
					<h3 class="display-name">${this._data.title}</h3>
					<p class="display-year">${this._data.year}</p>
					<p class="display-genres">${this._data.genres.join(', ')}</p>
				</div>
				<div class="summary">
					<h6>SUMMARY</h6>
					<div class="line1"></div>
					<p class="description">${this._data.summary}</p>
					<div class="display-footer">
						<figure class="display-fig">
							<i class="fas fa-star rating-icon"></i>
						</figure>

						<div class="display-score">${this._data.rating}</div>
					</div>

					<!-- THE ACTORS LIST WILL GO HERE -->

				</div>
                <div class="display-cast-header">PERFORMING</div>
				<div class="line2"></div>
			</div>            
                `;
	}
}

export default new OverviewView();
