import View from './View.js';

class PerformersView extends View {
	_parentElement = document.querySelector('.display-cast');
	_errorMessage = 'Ops, the data got lost on its way here, please try again';
	_message = '';

	_generateMarkup() {
		//prettier-ignore
		if (Array.isArray(this._data) && this._data.length !== 0)
             return this._data.map((actor) => this._generateMarkupPreview(actor)).join('');
		else
			return `   
        <div class="display-actors">
            <div class="display-performer">No performers data is available</div>
            <div class="display-role"></div>
        </div>
                `;
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
