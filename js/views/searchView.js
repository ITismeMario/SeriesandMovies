class searchView {
	_parentElement = document.querySelector(`.frmSearch`);

	/**
	 *
	 * Gets the input value in the searchbox
	 * @returns {string} searchbox value
	 */
	getQuery() {
		const query = this._parentElement.querySelector('.txtSearch').value;
		this._clearInput();
		return query;
	}

	_clearInput() {
		this._parentElement.querySelector('.txtSearch').value = '';
	}

	addHandlerSearch(fnHandler) {
		this._parentElement.addEventListener('submit', function (e) {
			e.preventDefault();
			fnHandler();
		});
	}
}

export default new searchView();
