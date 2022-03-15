import Component from '@/core/Component.js';
import './style.css';
import cat from '@/assets/images/nyan-cat.gif';

export default class LoadingSpinner extends Component {
  initState() {
    return {
      isLoading: false,
    };
  }

  template() {
    return this.state.isLoading
      ? `
        <div class="overlay">
          <div class="spinner-border text-primary" />
        </div>
        `
      : '';
  }
  // <img src="${cat}" />
  //
}
