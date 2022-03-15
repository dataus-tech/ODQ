import Component from '@/core/Component.js';

export default class DataCount extends Component {
  initState() {
    return {
      dataCount: 0,
      columnCount: 0,
    };
  }

  filter(count) {
    return Number(count).toLocaleString('ko-KR');
  }

  template() {
    const { dataCount, columnCount } = this.state;

    return `
      <div class="input-group input-group-sm mb-1">
        <div class="input-group-prepend input-group-sm">
          <span class="input-group-text"
            >데이터건수</span
          >
        </div>
        <input
          id="data-count"
          readonly
          value="${this.filter(dataCount)}"
          type="text"
          class="form-control"
        />
      </div>
      <div class="input-group input-group-sm">
        <div class="input-group-prepend input-group-sm">
          <span class="input-group-text"
            >전체 컬럼수</span
          >
        </div>
        <input
          id="column-count"
          readonly
          value="${this.filter(columnCount)}"
          type="text"
          class="form-control"
        />
      </div>
    `;
  }
}
