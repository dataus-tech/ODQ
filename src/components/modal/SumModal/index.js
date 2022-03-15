import Modal from '../../common/Modal';
import { $action } from '@/utils/selector';
import './style.css';

export default class SumModal extends Modal {
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
    $action.call(this, 'select-target', 'change', ({ target }) => {
      this.setState({ targets: $(target).val() });
    });

    // 비교 연산자 변경
    $action.call(this, 'change-operator', 'change', ({ target: { value } }) => {
      this.setState({ op: value });
    });

    // 적용
    // validation Check 및 컬럼 적용
    $action.call(this, 'submit-sum', 'click', () => {
      const { columnId, targets, op, columns } = this.state;
      this.parent.dataGrid.setState({
        columns: columns.map(col =>
          col.id === columnId
            ? {
                ...col,
                ruleset: {
                  id: 'calSum',
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
    });
    this.render();
    super.show();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    const { op, targets } = this.state;

    this.$target.find('.emphasis').text(op);
    this.$target.find('.targets-text').text(targets.map(target => `[${target}]`).join(' + '));
  }

  setHeader() {
    return '합계';
  }

  setBody() {
    const { columnId, columns } = this.state;
    const columnName = columns.find(({ id }) => id === columnId)?.name;

    return `
      <div class="container">
        <p>※ 사용법</p>
        <p>1. 진단대상컬럼의 비교컬럼 선택 > 2. 확인</p>

        <form class="form-inline">
          선택한 <span class="bold">[${columnName}] </span>컬럼은 
          <select data-action="select-target" class="custom-select" multiple>
            ${columns
              .slice(1)
              .reduce((acc, { id, name }) => acc + `<option value="${id}">${name}</option>`, '')}
          </select>
          컬럼들의
          <button type="button" class="btn btn-outline-success">더하기(+)</button> 
          와 같다
        </form>
        <p>
          지정한 품질기준은 
          <span class="bold">[${columnName}] = </span>
          <span class="bold targets-text">[${columns[1]?.name}] </span>
          이어야 한다
        </p>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="cancel">취소</button>
      <button type="button" class="btn btn-primary" data-action="submit-sum">확인</button>
    `;
  }
}
