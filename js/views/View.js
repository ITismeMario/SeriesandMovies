export default class View {
	_data;

	/**
	 * Display the data recieved on the document
	 * @param {*} data
	 * @param {*} render
	 * @returns
	 */
	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.displayError();

		this._data = data;
		const markup = this._generateMarkup();

		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	/**
	 * Animation that lets know the user the website is loading data
	 */
	displayLoading() {
		const markup = `   
        <div class="loading-animation">
            <div>
                <img src="./img/loading.gif" alt="" />
		    </div>
            <p>Loading...</p>
        </div>
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	displayError(message = this._errorMessage) {
		const markup = `
        <div class="error">
            <div>
                <img src="./img/error.png" alt="" />
            </div>
                <p>${message}!</p>
        </div>
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}
}
