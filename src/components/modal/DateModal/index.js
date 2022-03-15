import Modal from '../../common/Modal.js';
import { dateDiagtypes } from '@/constants/diagtype.js';
import { $action } from '@/utils/selector.js';
import { go, each } from 'fxjs/Strict';
import './style.css';

export default class DateModal extends Modal {
  initState() {
    return {
      event: null,
      dateRuleset: {
        YYYY: false,
        MM: false,
        DD: false,
        HH24: false,
        MI: false,
        SS: false,
      },
    };
  }

  setEvents() {
    this.$target.on('keypress', ({ key }) => {
      if (key === 'Enter') this.closeModal();
    });

    $action.call(this, 'close-modal', 'click', () => {
      this.closeModal();
    });

    $action.call(this, 'date-check', 'change', ({ target: { dataset } }) => {
      const { datetype } = dataset;
      if (datetype === 'YYYYMMDDH24MISS')
        this.setState({
          event: 'check-all',
          dateRuleset: {
            YYYY: true,
            MM: true,
            DD: true,
            HH24: true,
            MI: true,
            SS: true,
          },
        });
      else {
        this.state.dateRuleset[datetype] = !this.state.dateRuleset[datetype];
        this.setState({ event: 'check' });
      }
    });

    $action.call(this, 'date-select', 'change', e => {
      const dateDiagtype = $(e.target).find('option:selected').val();
      this.setState({
        event: 'select',
        dateRuleset: {
          YYYY: dateDiagtype.includes('YYYY'),
          MM: dateDiagtype.includes('MM'),
          DD: dateDiagtype.includes('DD'),
          HH24: dateDiagtype.includes('HH24'),
          MI: dateDiagtype.includes('MI'),
          SS: dateDiagtype.includes('SS'),
        },
      });
    });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };

    const select = this.$target.find('select');
    const selectedDiagRule = this.$target.find('#selected-diag-rule');

    const dateRuleset = this.state.dateRuleset;
    const dateDiagtype = dateDiagtypes.find(
      ({ id }) =>
        `dt${Object.entries(dateRuleset)
          .filter(([key, value]) => value)
          .map(([key, value]) => key)
          .join('')}` === id,
    );

    // check 박스를 클릭 안한 경우
    if (this.state.event !== 'check') {
      go(
        this.$target.find('input[type="checkbox"]'),
        each(checkbox => {
          const { datetype } = checkbox.dataset;
          checkbox.checked = dateRuleset[datetype];
        }),
      );
    }

    // select 박스를 클릭 안한 경우
    if (this.state.event !== 'select') select.val(dateDiagtype.id).prop('selected', true);

    selectedDiagRule.val(dateDiagtype.label);
  }

  show($select, diagtypeId) {
    this.setState({
      $select,
      dateRuleset: {
        YYYY: diagtypeId.includes('YYYY'),
        MM: diagtypeId.includes('MM'),
        DD: diagtypeId.includes('DD'),
        HH24: diagtypeId.includes('HH24'),
        MI: diagtypeId.includes('MI'),
        SS: diagtypeId.includes('SS'),
      },
    });
    super.show();
  }

  closeModal() {
    this.hide();
    const { $select, dateRuleset } = this.state;
    const columnId = $select.attr('id').replace('selectDiag-', '');
    const { columns } = this.parent.dataGrid.state;

    $select.val(
      dateDiagtypes.find(
        ({ id }) =>
          id ===
          'dt' +
            Object.entries(dateRuleset)
              .filter(([key, value]) => value)
              .map(([key, value]) => key)
              .join(''),
      ).id,
    );

    this.parent.dataGrid.setState({
      columns: columns.map(col =>
        col.id === columnId
          ? {
              ...col,
              ruleset: {
                id: $select.val(),
                name: '날짜',
              },
            }
          : col,
      ),
    });
  }

  setHeader() {
    return '진단 날짜 유형 선택';
  }

  setBody() {
    const dateType = [
      { type: 'YYYY', text: '연' },
      { type: 'MM', text: '월' },
      { type: 'DD', text: '일' },
      { type: 'HH24', text: '시간' },
      { type: 'MI', text: '분' },
      { type: 'SS', text: '초' },
    ];

    return `
      <p>※ 사용법</p>
      <p>1. 진단대상컬럼의 진단 날짜 유형 선택 > 2. 확인</p>
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div class="row">
              <input type="text" class="form-control text-center" style="visibility: hidden;" />
            </div>
            <div class="row">
              <div>
                <input data-action="date-check" data-datetype="YYYYMMDDH24MISS" type="checkbox" id="modal-date-all" class="custom-control-input">
                <label class="custom-control-label" for="modal-date-all">전체</label>
              </div>
            </div>
          </div>
          ${dateType
            .map(
              ({ type, text }) => `
              <div class="col">
                <div class="row px-1">
                  <input type="text" class="form-control text-center mr-2" value="${type}" readonly />
                </div>
                <div class="row">
                  <div>
                    <input data-action="date-check" data-datetype="${type}" type="checkbox" id="modal-date-${type}" class="custom-control-input" />
                    <label class="custom-control-label" for="modal-date-${type}">${text}</label>
                  </div>
                </div>
              </div>
            `,
            )
            .join('')}
        <div class="row">
          <div class="col">
            <select data-action="date-select" class="custom-select" size="${dateDiagtypes.length}">
              ${dateDiagtypes
                .map(({ id, content }) => `<option value="${id}">${content}</option>`)
                .join('')}
            </select>
          </div>
          <div class="col">
            <h1>선택된 날짜 진단규칙</h1>
            <div class="input-group input-group-lg">
              <input id="selected-diag-rule" type="text" class="form-control text-center" readonly />
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setFooter() {
    return `
      <button type="button" class="btn btn-secondary" data-action="close-modal">취소</button>
      <button type="button" class="btn btn-primary" data-action="close-modal">확인</button>
    `;
  }
}
