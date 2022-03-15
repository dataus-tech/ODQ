import Grid from '../common/Grid';
import { INIT, REPAIR } from '@/constants/progress';
import { errorFormatter } from '@/utils/grid-formatter';
import { fetchSettings } from '@/utils/localStorage';
import {
  isEssential,
  stringRuleset,
  chargeRuleset,
  countRuleset,
  percentRuleset,
  whetherRuleset,
  dateRuleset,
  numberRuleset,
  consistencyRuleset,
  calculationRuleset,
} from '@/utils/ruleset';
import { clone, go, values } from 'fxjs';
import { getRulesetGroup, getRulesetLabel } from '@/constants/ruleset';
import '@/lib/slickgrid/plugins/slick.customtooltip.css';

import './style.css';

export default class RepairGrid extends Grid {
  initState() {
    return {
      progress: INIT,
    };
  }

  renderGrid(columns, data) {
    const _columns = this.setRepairFormat(columns);
    const dataView = new Slick.Data.DataView();
    const errorIndex = this.parent.diagResultGrid.state.errorIndex;

    const grid = new Slick.Grid('#repair-grid', dataView, _columns, this.setGridOptions());
    this.state.grid = grid;
    this.state.dataView = dataView;
    grid.setSelectionModel(new Slick.CellSelectionModel());
    const customTooltipPlugin = new Slick.Plugins.CustomTooltip();
    grid.registerPlugin(customTooltipPlugin);
    this.setGridEvents();
    grid.init();
    dataView.beginUpdate();
    // grid.addCellCssStyles('repair', this.state.repairStyleCss);
    dataView.syncGridSelection(grid, 'repair');
    dataView.setItems(data);
    dataView.setFilter(({ id }) => !!errorIndex[id]);
    dataView.endUpdate();
  }

  setGridOptions() {
    const dataView = this.parent.dataGrid.state.dataView;
    function tooltipFormatter(row, cell, value, { name }, { id }) {
      return `
        <div class="my-tooltip">
          <div>이전 데이터: <span class="error-text">${dataView.getItemById(id)[name]}</span></div>
          <div>정비된 데이터: <span class="repaired-text">${value}</span></div>
        </div>  
      `;
    }

    function headerFormatter(row, cell, value, { name, ruleset: { id } }, dataContext) {
      const rulesetGroup = getRulesetGroup(id);
      const rulesetLabel = getRulesetLabel(id);
      return `
        <div class="my-tooltip">
          <div style="font-weight: bold">
            ${name} 컬럼
          </div>
          <div>
            적용된 진단 규칙: ${rulesetGroup} (${rulesetLabel})
          </div>
        </div>
      `;
    }

    return {
      editable: true,
      autoEdit: false,
      headerRowHeight: 30, // 헤더 높이
      forceFitColumns: true, // cell 너비 맞추기
      asyncEditorLoading: false,
      enableCellNavigation: true,
      explicitInitialization: true,
      customTooltip: {
        formatter: tooltipFormatter,
        headerFormatter: headerFormatter,
      },
    };
  }

  setGridEvents() {
    const { grid, dataView } = this.state;
    const { oneGrid = false } = fetchSettings();

    if (!oneGrid) {
      /* 스크롤 동기화 */
      const dataGrid = this.parent.dataGrid.state.grid;

      grid.onScroll.subscribe((_, { scrollLeft, scrollTop }) => {
        dataGrid.scrollTo(scrollTop);
        dataGrid.render();
      });

      dataGrid.onScroll.subscribe((_, { scrollLeft, scrollTop }) => {
        grid.scrollTo(scrollTop);
        grid.render();
      });
    }
    dataView.onRowCountChanged.subscribe(function (e, args) {
      grid.updateRowCount();
      grid.render();
    });

    dataView.onRowsChanged.subscribe(function (e, args) {
      grid.invalidateRows(args.rows);
      grid.render();
    });

    grid.setSelectionModel(new Slick.CellSelectionModel());
  }

  repair(dataGrid) {
    const columns = dataGrid.getColumns();
    const data = go(dataGrid.getData().getItems(), clone, values);

    // 정비
    let repairStyleCss = {};
    const dataLen = data.length;
    for (let i = 0; i < dataLen; i++) {
      const row = data[i];
      const keys = Object.keys(row);
      const keyLen = keys.length;
      for (let j = 0; j < keyLen; j++) {
        const { essential, ruleset, errorCount, field } = columns.find(({ id }) => id === keys[j]);
        if (!ruleset || !!errorCount) continue;
        const oldCell = typeof row[keys[j]] === 'string' ? row[keys[j]].trim() : row[keys[j]];
        let newCell;
        const { name } = ruleset;

        // 정비 룰셋 적용
        switch (name) {
          case '문자열':
            newCell = stringRuleset.repair(oldCell);
            break;
          case '금액':
            newCell = chargeRuleset.repair(oldCell);
            break;
          case '수량':
            newCell = countRuleset.repair(oldCell);
            break;
          case '율':
            newCell = percentRuleset.repair(oldCell);
            break;
          case '여부':
            newCell = whetherRuleset.repair(oldCell, ruleset);
            break;
          case '날짜':
            newCell = dateRuleset.repair(oldCell, ruleset);
            break;
          case '번호':
            newCell = numberRuleset.repair(oldCell, ruleset);
            break;
          case '일관성':
            newCell = consistencyRuleset.repair(oldCell, ruleset, row);
            break;
          case '계산식':
            newCell = calculationRuleset.repair(oldCell, ruleset, row);
            break;
        }

        if (oldCell != newCell) {
          if (!repairStyleCss.hasOwnProperty(i)) repairStyleCss[i] = {};
          repairStyleCss[i][field] = 'repaired-cell';
        }
        row[keys[j]] = newCell;
      }
    }
    this.state = { ...this.state, columns, repairStyleCss };
    this.renderGrid(columns, data);
  }

  setRepairFormat(columns) {
    return columns.map(column => ({
      ...column,
      formatter: errorFormatter,
      editor: column.id !== 'id' ? Slick.Editors.Text : null,
    }));
  }

  template() {
    const { progress } = this.state;

    return progress === REPAIR
      ? `
        <section class="card">
          <article class="card-body">
            <div id="repair-grid" />
          </article>
        </section>
      `
      : '';
  }
}
