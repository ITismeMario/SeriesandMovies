const winModal = document.querySelector('.modal-img');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const imgModal = document.querySelector('.modal-image');
const imgModalDescription = document.querySelector(`.modal-description`);

class modalWindow {
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

				//Change the attributes displayed on the mod window to those in the image
				imgModal.setAttribute('src', imgOpenModal[curImage].getAttribute('src'));
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
}

export default new modalWindow();
