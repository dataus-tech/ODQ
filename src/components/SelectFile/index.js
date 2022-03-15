import { $action } from '@/utils/selector.js';
import { INIT } from '@/constants/progress.js';
import Component from '@/core/Component.js';

export default class SelectFile extends Component {
  initState() {
    return {
      progress: INIT,
    };
  }

  setEvents() {
    // 파일 로드
    $action.call(this, 'file-load', 'change', ({ target: { files } }) => {
      const [file] = files;
      this.parent.loadCsvFile(file);
    });

    // 파일 선택
    $action.call(this, 'file-select', 'click', () => {
      $('#form-file').on('click');
    });
  }

  template() {
    return `
      <div class="input-group input-group-sm mb-1">
        <input data-action="file-load" class="form-control" type="file" id="form-file" accept=".csv"/>
        <button
          data-action="file-select"
          class="btn btn-outline-primary"
          type="button"
          id="select-file"
        >
          파일선택
        </button>
      </div>
    `;
  }

  render() {
    const progress = this.state.progress;
    if (progress !== INIT) {
      this.$target.find('#form-file, #select-file').attr('disabled', true);
      return;
    }
    this.$target.html(this.template());
  }
}
