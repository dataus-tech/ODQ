import Grid from '@/components/common/Grid.js';
import { $action } from '@/utils/selector.js';
import { INIT, REPAIR } from '@/constants/progress.js';
import { groupedRuleset } from '@/constants/ruleset.js';
import { fetchSettings } from '@/utils/localStorage';
import './style.css';

export default class DataGrid extends Grid {
  initState() {
    return {
      progress: INIT,
      grid: null,
      dataView: null,
      columns: [],
      gridId: 'data-grid',
    };
  }

  setEvents() {
    // 룰셋 선택
    $action.call(this, 'select-ruleset', 'change', ({ target }) => {
      const $select = $(target);
      const { columns } = this.state;
      const columnId = $select.attr('id').replace('selectDiag-', '');
      const ruleset = $select.find('option:selected').data('ruleset');
      const rulesetId = $select.find('option:selected').val();
      if (
        ruleset === '금액' ||
        ruleset === '수량' ||
        ruleset === '율' ||
        rulesetId === 'wheYN' ||
        rulesetId === 'numPhone' ||
        rulesetId === 'numPostalCode' ||
        rulesetId === 'numBusiness'
      ) {
        $select.val(rulesetId);
        this.setState({
          columns: columns.map(col =>
            col.id === columnId
              ? {
                  ...col,
                  ruleset: {
                    id: rulesetId,
                    name: ruleset,
                  },
                }
              : col,
          ),
        });
      }
      if (rulesetId === 'wheSET') this.parent.whetherModal.show($select, this.state.grid);
      if (ruleset === '날짜') this.parent.dateModal.show($select, rulesetId);
      if (rulesetId === 'numPattern') this.parent.patternModal.show($select, this.state.grid);
      if (rulesetId === 'conTime') this.parent.timeOrderModal.show($select, this.state);
      if (rulesetId === 'conLogicRelationShip')
        this.parent.logicRelationshipModal.show($select, this.state);
      if (rulesetId === 'calFormula') this.parent.formulaModal.show($select, this.state);
      if (rulesetId === 'calSum') this.parent.sumModal.show($select, this.state);
    });
  }

  setStartRow(originalData, startRow) {
    const { setCollWidth = '' } = fetchSettings();
    const { columns, data } = this.sliceDataColumns(originalData, startRow);
    const dataView = new Slick.Data.DataView();
    const options = {
      enableCellNavigation: true,
      showHeaderRow: true,
      forceFitColumns: !setCollWidth, // cell 너비 맞추기
      headerRowHeight: 30, // 헤더 높이
      explicitInitialization: true, // 의도적 초기화 -> 헤더 이벤트
    };
    const grid = new Slick.Grid('#data-grid', dataView, columns, options);
    this.setState({
      grid,
      columns: grid.getColumns().map(col => ({
        ...col,
        ruleset: { id: 'str', name: '문자열' },
      })),
    });

    dataView.onRowCountChanged.subscribe(_ => {
      grid.updateRowCount();
      grid.render();
    });

    dataView.onRowsChanged.subscribe((_, { rows }) => {
      grid.invalidateRows(rows);
      grid.render();
    });

    grid.onHeaderRowCellRendered.subscribe(
      (_, { node, column: { id, ruleset = { id: 'str', name: '문자열' } } }) => {
        if (id === 'id') return;

        const selectOption = this.rulesetSelectTemplate(id, ruleset);
        $(node).append(selectOption);
      },
    );
    grid.init();
    dataView.setItems(data);
  }

  template() {
    return `
      <div class="row">
        <div class="col">
          <article class="card">
            <div class="card-body">
              <div id="data-grid">
                <h1>CSV 파일을 선택해주세요.</h1>
              </div>
            </div>
          </article>
        </div>
      </div>
    `;
  }

  render() {
    const { progress } = this.state;
    const { oneGrid } = fetchSettings();

    if (progress === INIT) this.$target.html(this.template());
    else if (oneGrid && progress === REPAIR) this.$target.html('');
  }

  rulesetSelectTemplate(columnId, { id: rulesetId }) {
    return $(`
        <div>
          <input type="checkbox" class="essential" id="essential-${columnId}" />
          <select id=selectDiag-${columnId} class="custom-select selected-ruleset" data-action="select-ruleset">
            ${groupedRuleset
              .map((rulesetGroup, multi) =>
                rulesetGroup
                  .map(
                    ({ id, index, group, label }) =>
                      `<option value="${id}" data-ruleset="${group}" ${
                        id === rulesetId ? 'selected' : ''
                      }>${index}) ${!!multi ? group + ' > ' : ''}${label}</option>`,
                  )
                  .join(''),
              )
              .join('')}
          </select>
        </div>
    `);
  }
}
