import View from './View.js'
import icons from 'url:../../img/icons.svg'
import previewView from './previewView.js';

class Bookmarksview extends View {
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = 'No Bookmarks yet.';
    _message = ''

    addHandlerRender(handler){
        window.addEventListener('load',handler);
    }

    _generateMarkup() {
        return this._data.map(bookmark => previewView.render(bookmark,false)).join('');
        
    }

}

export default new Bookmarksview();