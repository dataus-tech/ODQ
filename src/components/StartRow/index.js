import Component from '@/core/Component.js';
import { $action } from '@/utils/selector.js';
import { INIT, LOAD } from '@/constants/progress.js';

export default class StartRow extends Component {
  initState() {
    return {
      progress: INIT,
    };
  }

  setEvents() {
    $action.call(this, 'start-row', 'click', () => {
      this.parent.setStartRow($('#start-row').val());
    });
  }

  template() {
    const { progress } = this.state;

    return `
      <div class="input-group input-group-sm">
        <span class="input-group-text">시 작 행</span>
        <input
          type="number"
          value="0"
          min="0"
          id="start-row"
          class="form-control"
        />
        <button
          data-action="start-row"
          class="btn btn-outline-primary"
          type="button"
          ${progress === LOAD ? '' : 'disabled'}
        >
          시작
        </button>
      </div>
    `;
  }
}
