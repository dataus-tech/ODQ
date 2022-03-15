import Modal from '../../common/Modal';
import { $action } from '@/utils/selector';
import './style.css';

export default class WhetherModal extends Modal {
  initState() {
    return {
      trueValue: 'Y',
      falseValue: 'N',
    };
  }

  setEvents() {
    // true 대칭값 입력
    $action.call(this, 'input-true-value', 'keyup', ({ target: { value } }) => {
      this.setState({ trueValue: value });
    });

    // false 대칭값 입력
    $action.call(this, 'input-false-value', 'keyup', ({ target: { value } }) => {
      this.setState({ falseValue: value });
    });

    // 적용
    // validation Check 및 컬럼 적용
    $action.call(this, 'submit-whether', 'click', () => {
      const { $select, dataGrid, trueValue, falseValue } = this.state;
      const columnId = $select.attr('id').replace('selectDiag-', '');
      const { columns } = this.parent.dataGrid.state;
      this.parent.dataGrid.setState({
        columns: columns.map(col =>
          col.id === columnId
            ? {
                ...col,
                ruleset: {
                  id: 'wheSET',
                  name: '여부',
                  trueValue,
                  falseValue,
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

  show($select, grid) {
    this.setState({ $select, dataGrid: grid });
    super.show();
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    const { trueValue, falseValue } = this.state;

    const [trueEl, falseEl] = this.$target.find('.emphasis');
    trueEl.innerText = `'${trueValue}'`;
    falseEl.innerText = `'${falseValue}'`;
  }

  setHeader() {
    return '여부값 지정';
  }

  setBody() {
    const { trueValue, falseValue } = this.state;

    return `
      <div class="container">
        <p>※ 사용법</p>
        <p>1. 진단대상컬럼의 여부 유효값 입력 > 2. 확인</p>

        <form class="form-inline">
          선택컬럼의 유효값은 
          <input data-action="input-true-value" type="text" class="form-control text-center" value="${trueValue}" />
          과(와) 
          <input data-action="input-false-value" type="text" class="form-control text-center" value="${falseValue}" />
          이다
        </form>
        <p>입력한 품질기준의 유효값은 
          <span class="emphasis">'${trueValue}'</span>
          과(와) 
          <span class="emphasis">'${falseValue}'</span>
          값만 유효하다
        </p>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="cancel">취소</button>
      <button type="button" class="btn btn-primary" data-action="submit-whether">확인</button>
    `;
  }
}
