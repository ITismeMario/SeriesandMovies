import View from './View.js';

class PerformersView extends View {
	_parentElement = document.querySelector('.display-cast');
	_errorMessage = 'Ops, the data got lost on its way here, please try again';
	_message = '';

	_generateMarkup() {
		console.log(`Actores ${this._data}`);
		return this._data.map((actor) => this._generateMarkupPreview(actor)).join('');
	}

	_generateMarkupPreview(actor) {
		//prettier-ignore
		return `   
        <div class="display-actors">
            <div class="display-performer">${actor[0]} </div>
            <div class="display-role">as ${actor[1].join(', ')}</div>
        </div>
                `;
	}
}

export default new PerformersView();
