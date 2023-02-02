import View from './View';

// Extends meaning view is the parent class.

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
}

export default new ResultsView();
