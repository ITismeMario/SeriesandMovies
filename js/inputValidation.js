class InputValidation {
	_input = '';

	validateRating(_input) {
		const regEx = new RegExp('^\\+?\\d*(\\.\\d+)?$');
		const valid = regEx.test(_input) && _input <= 10;

		return valid;
	}
}

export default new InputValidation();

//FIXME: Cuando se le da una calificación no válida el texto se queda en blanco en lugar de mostrar el valor anterior
