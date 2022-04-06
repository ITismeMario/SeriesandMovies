import View from './View.js';
import inputValidation from '../inputValidation.js';

class UserRating extends View {
	_parentElement = document.getElementById('local_score');
	_errorMessage = 'The rating you entered is not valid ';
	_message = '';

	displayUserRating(rating) {
		const txtRating = document.querySelector(`.user_score`);
		txtRating.value = rating;
	}

	addHandlerAddRating(fnHandler) {
		const btnRating = document.querySelector(`.btn_rating`);
		const txtRating = document.querySelector(`.user_score`);
		const titleId = window.location.hash.slice(1);

		btnRating.addEventListener('click', function () {
			if (!inputValidation.validateRating(txtRating.value)) {
				alert(`ERROR: The rating you entered is not valid`);
				txtRating.value = '';
				return;
			}

			let userRating = { id: titleId, rating: txtRating.value };
			fnHandler(userRating);
		});

		txtRating.addEventListener('keyup', function (e) {
			if (e.keyCode === 13) {
				//keyCode 13 = Enter
				if (!inputValidation.validateRating(txtRating.value)) {
					alert(`ERROR: The rating you entered is not valid`);
					txtRating.value = '';
					return;
				}

				let userRating = { id: titleId, rating: txtRating.value };
				fnHandler(userRating);
				document.activeElement.blur();
			}
		});
	}
}

export default new UserRating();
