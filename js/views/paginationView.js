import View from './View.js';

class PaginationView extends View {
	_parentElement = document.querySelector('.pagination');

	addHandlerClick(handler) {
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn-inline');

			if (!btn) return;

			const goToPage = +btn.dataset.goto;
			handler(goToPage);
		});
	}

	_generateMarkup() {
		const currPage = this._data.currentPage; //_data = model.state.currentPage
		const numPages = Math.ceil(this._data.images.length / this._data.imagesPerPage);

		//Page 1 and there are more pages.
		if (currPage === 1 && numPages > 1) {
			//prettier-ignore
			return `
            <div class="current-page">${currPage}</div>
            <button data-goto="${currPage + 1}" class="btn-inline pagination-btn-next">                            
                <span>${currPage + 1}</span>
                <i class="fas fa-angle-right arrow-icon"></i>
            </button> 
            `;
		}

		//Last page
		if (currPage === numPages && numPages > 1) {
			//prettier-ignore
			return `                   
            <button data-goto="${currPage - 1}" class="btn-inline pagination-btn-prev">
                <i class="fas fa-angle-left arrow-icon"></i>    
                <span>${currPage - 1}</span>                
            </button>
            <div class="current-page">${currPage}</div>
            `;
		}

		//other page
		if (currPage < numPages) {
			//prettier-ignore
			return `            
            <button data-goto="${currPage - 1}" class="btn-inline pagination-btn-prev">
                <i class="fas fa-angle-left arrow-icon"></i>
                <span>${currPage - 1}</span>
            </button>
            <div class="current-page">${currPage}</div>
            <button data-goto="${currPage + 1}" class="btn-inline pagination-btn-next">                        
                <span>${currPage + 1}</span>
                <i class="fas fa-angle-right arrow-icon"></i>
            </button> 
      `;
		}

		//Page 1 and there are NO more pages
		return '';
	}
}

export default new PaginationView();
