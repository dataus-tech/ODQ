import Modal from '../../common/Modal';
import { $action } from '@/utils/selector';
import './style.css';

export default class LogicRelationshipModal extends Modal {
  initState() {
    return {
      replaceValue: 'Y',
      columnId: '',
      target: '',
      columns: [],
    };
  }

  setEvents() {
    // 컬럼 선택 변경
    $action.call(this, 'select-column', 'change', ({ target: { value } }) => {
      this.setState({ target: value });
    });

    // 조건 값 입력
    $action.call(this, 'input-replace-value', 'keyup', ({ target: { value } }) => {
      this.setState({ replaceValue: value });
    });

    // 적용
    // validation Check 및 컬럼 적용
    $action.call(this, 'submit-logic-relationship', 'click', () => {
      const { columnId, columns, replaceValue, target } = this.state;
      this.parent.dataGrid.setState({
        columns: columns.map(col =>
          col.id === columnId
            ? {
                ...col,
                ruleset: {
                  id: 'conLogicRelationShip',
                  name: '일관성',
                  target,
                  replaceValue,
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
    const { target, replaceValue } = this.state;

    this.$target.find('.target-column').text(target);
    this.$target.find('.replace-value').text(replaceValue);
  }

  setHeader() {
    return '컬럼 간 논리관계 일관성';
  }

  setBody() {
    const { columnId, columns, target, replaceValue } = this.state;
    const columnName = columns.find(({ id }) => id === columnId)?.name;

    return `
      <div class="container">
        <p>※ 사용법</p>
        <p>1. 진단대상컬럼의 조건 값 입력 > 2. 논리관계가 있는 날짜 컬럼 선택 > 3. 확인</p>

        <form class="form-inline">
          선택한 <span class="bold">[${columnName}] </span>컬럼이
          <input 
            data-action="input-replace-value"
            type="text"
            class="form-control text-center"
            value="${replaceValue}" />
          라면
          <select data-action="select-column" class="custom-select">
            ${columns
              .slice(1)
              .map(
                ({ id, name }) =>
                  `<option value="${id}" ${id === target ? 'selected' : ''}>${name}</option>`,
              )
              .join('')}
          </select>
          컬럼은 반드시 날짜가 존재해야 한다
        </form>
        <p>
          지정한 품질기준은 
          <span class="bold">[${columnName}] </span>컬럼이
          <span class="bold replace-value">
            '${replaceValue}' 
          </span>
           (이)라면 
          <span class="bold target-column">
            [${columns[1]?.name}] 
          </span>
          컬럼은 반드시 날짜가 존재해야 한다
        </p>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="cancel">취소</button>
      <button type="button" class="btn btn-primary" data-action="submit-logic-relationship">확인</button>
    `;
  }
}
