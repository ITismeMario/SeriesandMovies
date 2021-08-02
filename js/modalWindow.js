import { state } from './model.js';

const winModal = document.querySelector('.modal-img');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const imgModal = document.querySelector('.modal-image');
const imgModalDescription = document.querySelector(`.modal-description`);

class modalWindow {
	_parentElement = document.querySelector('.modal-img');
	_errorMessage = 'Ops, the data got lost on its way here, please try again';
	_message = '';

	suscribeGoToImage() {
		this._parentElement.addEventListener('click', (e) => {
			const btn = e.target.closest('.nextprev-btn');

			if (!btn) return;

			const direction = btn.id; //btn_next OR btn_previous

			this.nextPreviousImage(direction);
		});
	}

	/**
	 * Iterates through all the images displayed so on clik they open the modal window and overlay,
	 * and show the correct image info
	 */
	suscribeImages() {
		const imgOpenModal = document.querySelectorAll('.shrunk-img');

		for (let curImage = 0; curImage < imgOpenModal.length; curImage++) {
			imgOpenModal[curImage].addEventListener('click', () => {
				//Open the modal window:
				winModal.classList.remove('hidden');
				overlay.classList.remove('hidden');
				document.body.style.overflow = 'hidden';

				//Read the attributes on the clicked image to display them on the modal window
				imgModal.setAttribute('src', imgOpenModal[curImage].getAttribute('src'));
				imgModal.setAttribute('data-index', imgOpenModal[curImage].getAttribute('data-index'));
				imgModalDescription.innerHTML = imgOpenModal[curImage].getAttribute('alt');
			});
		}
	}

	closeModal() {
		winModal.classList.add('hidden');
		overlay.classList.add('hidden');
		document.body.style.overflow = 'auto';
	}

	suscribeCloseModal() {
		btnCloseModal.addEventListener('click', this.closeModal);
		overlay.addEventListener('click', this.closeModal);

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && !winModal.classList.contains('hidden')) this.closeModal();
		});
	}

	/**
	 * Displays the next or previous image on the modal window, looping throug the Array in an infinite carousel
	 * @param {string} direction Id of the clicked button btn_next OR btn_previous
	 *
	 */
	nextPreviousImage(direction) {
		try {
			if (!direction) return;

			let currentImgIndex = Number(imgModal.getAttribute('data-index'));
			let goToImage = null;

			if (direction == 'btn_next') {
				//Check if we are in the last image and if that is the case move to the first image (an infinite carousel)
				goToImage = state.images.find((element) => element.index === (currentImgIndex == state.images.length - 1 ? 0 : currentImgIndex + 1));
			} else {
				//Check if we are in the first image
				goToImage = state.images.find((element) => element.index === (currentImgIndex == 0 ? state.images.length - 1 : currentImgIndex - 1));
			}

			imgModal.setAttribute('src', goToImage.url);
			imgModal.setAttribute('data-index', goToImage.index);
			imgModalDescription.innerHTML = goToImage.caption;
		} catch (err) {
			console.error(err);
		}
	}
}

export default new modalWindow();
