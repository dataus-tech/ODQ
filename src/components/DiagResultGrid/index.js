import { go, map } from 'fxjs/Strict';
import Grid from '../common/Grid';
import { DIAG, INIT } from '@/constants/progress';
import { errorFormatter } from '@/utils/grid-formatter';
import { ruleset as allRuleset } from '@/constants/ruleset';
import {
  isEssential,
  chargeRuleset,
  countRuleset,
  percentRuleset,
  whetherRuleset,
  dateRuleset,
  numberRuleset,
  consistencyRuleset,
  calculationRuleset,
} from '@/utils/ruleset';
import './style.css';

export default class DiagResultGrid extends Grid {
  initState() {
    return {
      progress: INIT,
      noErrorData: false,
    };
  }

  diagnosis(dataGrid) {
    let columns = this.parent.dataGrid.state.columns;
    const data = dataGrid.getData().getItems();
    const errorIndex = [];

    $.each($('.essential'), (idx, el) => {
      const essential = $(el).is(':checked');
      columns[idx + 1].essential = essential;
    });

    // 그리드에 에러 포맷 설정
    go(
      columns,
      map(field => ({
        ...field,
        formatter: errorFormatter,
      })),
      dataGrid.setColumns,
    );

    // 전체 데이터 진단
    // 에러수 초기화
    columns = columns.map((column, idx) => ({
      ...column,
      order: idx,
      errorCount: 0,
    }));

    // 모든 데이터 순회
    const dataLen = data.length;
    for (let i = 0; i < dataLen; i++) {
      const row = data[i];
      const keys = Object.keys(row);
      const keyLen = keys.length;
      for (let j = 0; j < keyLen; j++) {
        const column = columns.find(({ id }) => id === keys[j]);
        const { essential, ruleset } = column;
        let cell = row[keys[j]];
        // index id 예외처리
        if (!ruleset) continue;
        const { name } = ruleset;
        // 필수값 진단 확인
        if (essential && !isEssential(cell)) {
          column.errorCount++;
          continue;
        }

        // 진단 룰셋 적용
        switch (name) {
          case '금액':
            if (!chargeRuleset.valid(cell)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
          case '수량':
            if (!countRuleset.valid(cell)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
          case '율':
            if (!percentRuleset.valid(cell)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
          case '여부':
            if (!whetherRuleset.valid(cell, ruleset)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
          case '날짜':
            if (!dateRuleset.valid(cell, ruleset)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
          case '번호':
            if (!numberRuleset.valid(cell, ruleset)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
          case '일관성':
            if (!consistencyRuleset.valid(cell, ruleset, row)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
          case '계산식':
            if (!calculationRuleset.valid(cell, ruleset, row)) {
              column.errorCount++;
              errorIndex[row.id] = true;
            }
            break;
        }
      }
    }
    this.setState({ errorIndex });
    this.renderGrid(columns);
  }

  renderGrid(columns) {
    const resultColumns = [
      { id: 'column-no', name: '컬럼순번', field: 'columnNo', maxWidth: 80 },
      { id: 'column-name', name: '컬럼명', field: 'columnName', maxWidth: 80 },
      { id: 'diag-rule', name: '진단규칙', field: 'diagRule', maxWidth: 80 },
      {
        id: 'diag-result',
        name: '진단결과',
        field: 'diagResult',
        cssClass: 'diag-result',
        formatter: (...args) => args[2],
      },
      {
        id: 'format',
        name: '표현형식/예시',
        field: 'format',
        cssClass: 'format',
        formatter: (...args) => args[2],
      },
      {
        id: 'error-count',
        name: '에러건수',
        field: 'errorCount',
        maxWidth: 80,
      },
    ];

    // 에러 탐색
    const data = columns
      .filter(({ errorCount }) => !!errorCount)
      .map(({ id, order, errorCount, ruleset }) => {
        const { group, label, errorDiscription, example } = allRuleset.find(
          ({ id }) => ruleset.id === id,
        );

        return {
          columnNo: order,
          columnName: id,
          diagRule: group === label ? label : `${group}(${label})`,
          diagResult: errorDiscription || '에러 설명 미입력',
          format: example || '표현 형식 미입력',
          errorCount,
        };
      });

    // 에러 없는 경우
    if (data.length === 0) {
      alert('진단 결과 규칙에 해당하는 오류가 없습니다.');
      this.setState({ noErrorData: true });
      return;
    }
    this.setState({ noErrorData: false });

    const grid = new Slick.Grid('#diag-result-grid', data, resultColumns, {
      enableCellNavigation: true,
      forceFitColumns: true, // cell 너비 맞추기
      headerRowHeight: 30,
      rowHeight: 42,
    });

    // 너비 맞추기
    go(
      grid.getColumns(),
      map(col => {
        const { maxWidth, ...rest } = col;
        return rest;
      }),
      grid.setColumns,
    );
  }

  template() {
    const { progress, noErrorData } = this.state;

    if (noErrorData) return '';

    return progress === DIAG
      ? `
        <section class="card">
          <article class="card-body">
            <div id="diag-result-grid" />
          </article>
        </section>
      `
      : '';
  }
}
