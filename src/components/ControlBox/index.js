import Component from '@/core/Component.js';
import { DIAG, INIT, READY, REPAIR } from '@/constants/progress.js';
import { $action } from '@/utils/selector.js';
import { unparse } from 'papaparse';
import './style.css';

export default class ControlBox extends Component {
  initState() {
    return { progress: INIT };
  }

  setEvents() {
    // 진단
    $action.call(this, 'diag', 'click', () => {
      this.parent.diagnosis();
    });

    // 초기화
    $action.call(this, 'reset', 'click', () => {
      this.parent.reset();
    });

    // 정비
    $action.call(this, 'repair', 'click', () => {
      this.parent.repair();
    });

    // 진단파일 다운로드
    $action.call(this, 'diagfile-download', 'click', () => {
      this.downloadCsv();
    });

    // 설정
    $action.call(this, 'setting', 'click', () => {
      this.parent.settingModal.show();
    });
  }

  downloadCsv() {
    const { columns, dataView } = this.parent.repairGrid.state;
    const fields = columns.slice(1).map(({ name }) => name);
    const csvData = unparse({
      fields,
      data: dataView.getItems(),
    });
    const csv = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    const csvURL = URL.createObjectURL(csv);
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.style = 'display: none';
    anchor.href = csvURL;
    anchor.download = `진단결과-${new Date().getTime()}.csv`;
    anchor.click();
    // location.href = csvURL;
    URL.revokeObjectURL(csvURL);
  }

  template() {
    const progress = this.state.progress;
    const active = [
      progress === READY || progress === DIAG,
      progress === DIAG,
      progress === REPAIR,
    ];

    return `
      <div class="btn-group" role="group">
        <button data-action="reset" type="button" class="btn btn-primary">초기화</button>
        <button data-action="diag" type="button" class="btn btn-${
          active[0] ? '' : 'outline-'
        }primary" ${active[0] ? '' : 'disabled'}>진단</button>
        <button data-action="repair" type="button" class="btn btn-${
          active[1] ? '' : 'outline-'
        }primary" ${active[1] ? '' : 'disabled'}>정비</button>
        <button data-action="diagfile-download" type="button" class="btn btn-${
          active[2] ? '' : 'outline-'
        }primary" ${active[2] ? '' : 'disabled'}>정비파일<br/>다운로드</button>
        <button data-action="setting" type="button" class="btn btn-primary">설정</button>
      </div>
    `;
  }
}
