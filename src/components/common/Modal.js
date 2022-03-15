import Component from '../../core/Component.js';

export default class Modal extends Component {
  show() {
    this.$target.find('.modal').modal('show');
  }

  hide() {
    this.$target.find('.modal').modal('hide');
  }

  setHeader() {
    return '';
  }

  setBody() {
    return '';
  }

  setFooter() {
    return '';
  }

  template() {
    return `
      <div class="modal fade" id="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.setHeader()}</h5>
            </div>
            <div class="modal-body">${this.setBody()}</div>
            <div class="modal-footer">${this.setFooter()}</div>
          </div>
        </div>
      </div>
    `;
  }
}
