import Modal from '../../common/Modal';
import { $action } from '@/utils/selector';
import './style.css';

export default class FormulaModal extends Modal {
  initState() {
    return {
      targets: [],
      op: '+',
      columnId: '',
      columns: [],
    };
  }

  setEvents() {
    // 컬럼 선택 변경
    $action.call(this, 'select-target1', 'change', ({ target: { value } }) => {
      const [target1, target2] = this.state.targets;
      this.setState({ targets: [value, target2] });
    });

    $action.call(this, 'select-target2', 'change', ({ target: { value } }) => {
      const [target1, target2] = this.state.targets;
      this.setState({ targets: [target1, value] });
    });

    // 비교 연산자 변경
    $action.call(this, 'change-operator', 'change', ({ target: { value } }) => {
      this.setState({ op: value });
    });

    // 적용
    // validation Check 및 컬럼 적용
    $action.call(this, 'submit-formula', 'click', () => {
      const { columnId, targets, op, columns } = this.state;
      this.parent.dataGrid.setState({
        columns: columns.map(col =>
          col.id === columnId
            ? {
                ...col,
                ruleset: {
                  id: 'calFormula',
                  name: '계산식',
                  targets,
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
      targets: [columns[1].name, columns[1].name],
    });
    this.render();
    super.show();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    const { op, targets } = this.state;

    this.$target.find('.emphasis').text(op);
    this.$target.find('.target1-text').text(targets[0]);
    this.$target.find('.target2-text').text(targets[1]);
  }

  setHeader() {
    return '산식';
  }

  setBody() {
    const { columnId, columns, op } = this.state;
    const columnName = columns.find(({ id }) => id === columnId)?.name;

    return `
      <div class="container">
        <p>※ 사용법</p>
        <p>1. 진단대상컬럼의 비교컬럼 선택 > 2. 계산식 선택 > 3. 두번째 비교컬럼 선택 > 4. 확인</p>

        <form class="form-inline">
          선택한 <span class="bold">[${columnName}] </span>컬럼은 
          <select data-action="select-target1" class="custom-select">
            ${columns
              .slice(1)
              .reduce((acc, { id, name }) => acc + `<option value="${id}">${name}</option>`, '')}
          </select>
          <div class="radio-box">
            <div class="form-check form-check-inline">
              <input
                id="plus"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value="+"
                checked />
              <label class="form-check-label" for="plus">+</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="minus"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value="−" />
                <label class="form-check-label" for="minus">−</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="multiple"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value="×" />
              <label class="form-check-label" for="multiple">×</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="division"
                data-action="change-operator"
                class="form-check-input"
                type="radio"
                name="operator"
                value="÷" />
              <label class="form-check-label" for="division">÷</label>
            </div>
          </div>
          <select data-action="select-target2" class="custom-select">
            ${columns
              .slice(1)
              .reduce((acc, { id, name }) => acc + `<option value="${id}">${name}</option>`, '')}
          </select>
          와 같다
        </form>
        <p>
          지정한 품질기준은 
          <span class="bold">[${columnName}] </span>컬럼은
          <span class="bold target1-text">[${columns[1]?.name}] </span>
          <span class="emphasis">${op}</span>
          <span class="bold target2-text">[${columns[1]?.name}] </span>
          과 같다
        </p>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="cancel">취소</button>
      <button type="button" class="btn btn-primary" data-action="submit-formula">확인</button>
    `;
  }
}
