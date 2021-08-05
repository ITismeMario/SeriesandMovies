class InputValidation {
	_input = '';

	validateRating(_input) {
		const regEx = new RegExp('^\\+?\\d*(\\.\\d+)?$');
		const valid = regEx.test(_input);

		return valid;
	}
}

export default new InputValidation();
