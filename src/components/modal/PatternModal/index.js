import Modal from '../../common/Modal';
import { $action } from '@/utils/selector';
import './style.css';

export default class PatternModal extends Modal {
  initState() {
    return {
      pattern: 'N',
    };
  }

  setEvents() {
    // true 대칭값 입력
    $action.call(this, 'input-pattern', 'keyup', e => {
      e.target.value = e.target.value.replace(/[^N-]/g, '');
      this.setState({ pattern: e.target.value });
    });

    // 적용
    // validation Check 및 컬럼 적용
    $action.call(this, 'submit-pattern', 'click', () => {
      const { $select, pattern } = this.state;
      const columnId = $select.attr('id').replace('selectDiag-', '');
      const { columns } = this.parent.dataGrid.state;
      this.parent.dataGrid.setState({
        columns: columns.map(col =>
          col.id === columnId
            ? {
                ...col,
                ruleset: {
                  id: 'numPattern',
                  name: '번호',
                  pattern,
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
    const { pattern } = this.state;

    this.$target.find('.emphasis').text(pattern);
  }

  setHeader() {
    return '패턴지정번호';
  }

  setBody() {
    const { pattern } = this.state;

    return `
      <div class="container">
        <p>※ 사용법</p>
        <p>1. 진단대상컬럼의 패턴지정번호 입력 > 2. 확인</p>

        <form class="form-inline">
          선택컬럼의 유효한 번호의 패턴값은
          <input data-action="input-pattern" type="text" class="form-control text-center" value="${pattern}" />
          값만 유효하다.
        </form>
        <p>입력한 품질기준의 유효값은 <span class="emphasis">'${pattern}'</span> 값만 유효하다
        </p>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="cancel">취소</button>
      <button type="button" class="btn btn-primary" data-action="submit-pattern">확인</button>
    `;
  }
}
