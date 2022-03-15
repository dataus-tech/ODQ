import Modal from '../../common/Modal';
import { $action } from '@/utils/selector';
import './style.css';

export default class TimeOrderModal extends Modal {
  initState() {
    return {
      target: '',
      op: '>=',
      columnId: '',
      columns: [],
    };
  }

  setEvents() {
    // 컬럼 선택 변경
    $action.call(this, 'select-column', 'change', ({ target: { value } }) => {
      this.setState({ target: value });
    });

    // 비교 연산자 변경
    $action.call(this, 'change-operator', 'change', ({ target: { value } }) => {
      this.setState({ op: value });
    });

    // 적용
    // validation Check 및 컬럼 적용
    $action.call(this, 'submit-timeorder', 'click', () => {
      const { columnId, target, op, columns } = this.state;
      this.parent.dataGrid.setState({
        columns: columns.map(col =>
          col.id === columnId
            ? {
                ...col,
                ruleset: {
                  id: 'conTime',
                  name: '일관성',
                  target,
                  op,
                },
              }
            : col,
        ),
      });
      this.hide();
    });

    $action.call(this, 'cancel', 'click', () => {
      this.hide();
    });
  }

  show($select, { columns }) {
    this.setState({
      columnId: $select.attr('id').replace('selectDiag-', ''),
      columns,
      target: columns[1].name,
    });
    this.render();
    super.show();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    const { op, target } = this.state;

    this.$target.find('.emphasis').text(operatorText(op));
    this.$target.find('.target-column').text(target);
  }

  setHeader() {
    return '시간순서 일관성';
  }

  setBody() {
    const { columnId, columns, target, op } = this.state;
    const columnName = columns.find(({ id }) => id === columnId)?.name;

    return `
      <div class="container">
        <p>※ 사용법</p>
        <p>1. 진단대상컬럼의 비교컬럼 선택 > 2. 비교 연산자 선택 > 3. 확인</p>

        <form class="form-inline">
          선택한 <span class="bold">[${columnName}] </span>컬럼은 
          <select data-action="select-column" class="custom-select">
            ${columns
              .slice(1)
              .map(
                ({ id, name }) =>
                  `<option value="${id}" ${id === target ? 'selected' : ''}>${name}</option>`,
              )
              .join('')}
          </select>
          컬럼보다
          <div class="radio-box">
            <div class="form-check form-check-inline">
              <input
                id="greater-than-to-equal"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value=">="
                ${op === '>=' ? 'checked' : ''}>
              <label class="form-check-label" for="greater-than-to-equal">>=</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="greater-than"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value=">"
                ${op === '>' ? 'checked' : ''}>
                <label class="form-check-label" for="greater-than">></label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="less-than-to-equal"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value="<="
                ${op === '<=' ? 'checked' : ''}>
              <label class="form-check-label" for="less-than-to-equal"><=</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="less-than"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value="<"
                ${op === '<' ? 'checked' : ''}>
              <label class="form-check-label" for="less-than"><</label>
            </div>
          </div>
        </form>
        <p>
          지정한 품질기준은 
          <span class="bold">[${columnName}] </span>컬럼이
          <span class="bold target-column">[${columns[1]?.name}] </span>컬럼보다 
          <span class="emphasis">${operatorText(op)}</span> 한다.
        </p>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="cancel">취소</button>
      <button type="button" class="btn btn-primary" data-action="submit-timeorder">확인</button>
    `;
  }
}

function operatorText(op) {
  if (op === '>=') return '크거나 같아야';
  if (op === '>') return '커야';
  if (op === '<=') return '작거나 같아야';
  if (op === '<') return '작아야';
}
