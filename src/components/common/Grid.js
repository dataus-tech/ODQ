import Component from '@/core/Component.js';
import { fetchSettings } from '@/utils/localStorage';

export default class Grid extends Component {
  initState() {
    return {
      options: {},
      grid: null,
      dataView: null,
      gridId: '',
    };
  }

  setGridOptions() {
    const { setCollWidth = '' } = fetchSettings();

    return {
      enableCellNavigation: true,
      forceFitColumns: !setCollWidth, // cell 너비 맞추기
      headerRowHeight: 30, // 헤더 높이
      explicitInitialization: true, // 의도적 초기화 -> 헤더 이벤트
    };
  }

  setGridEvents() {
    const { grid, dataView } = this.state;
    dataView.onRowCountChanged.subscribe(_ => {
      grid.updateRowCount();
      grid.render();
    });

    dataView.onRowsChanged.subscribe((_, { rows }) => {
      grid.invalidateRows(rows);
      grid.render();
    });
  }

  renderGrid(originalData, startRow = 0) {
    const { columns, data } = this.sliceDataColumns(originalData, startRow);
    const { gridId } = this.state;
    const dataView = new Slick.Data.DataView();
    const grid = new Slick.Grid(`#${gridId}`, dataView, columns, this.setGridOptions());
    this.setState({ grid, dataView });
    this.setGridEvents();
    grid.init();
    dataView.setItems(data);
  }

  sliceDataColumns(originalData, start) {
    start = Number(start);

    const { setCollWidth = '' } = fetchSettings();

    const columns = !setCollWidth
      ? originalData[start].map(field => ({
          id: field.replaceAll(' ', '').replace(/[\b\t\v\n\r\f\'\"\0]/gi, ''),
          name: field,
          field: field.replaceAll(' ', '').replace(/[\b\t\v\n\r\f\'\"\0]/gi, ''),
        }))
      : originalData[start].map(field => ({
          id: field.replaceAll(' ', '').replace(/[\b\t\v\n\r\f\'\"\0]/gi, ''),
          name: field,
          field: field.replaceAll(' ', '').replace(/[\b\t\v\n\r\f\'\"\0]/gi, ''),
          width: Number(setCollWidth),
        }));

    const data = originalData.splice(start + 1).map((itemArr, idx) => {
      const newItem = { id: idx + 1 };
      itemArr.forEach((val, idx) => (newItem[columns[idx].id] = val));
      return newItem;
    });

    columns.unshift({
      id: 'id',
      name: '행번호(NO)',
      field: 'id',
      resizable: false,
      selectable: false,
      cssClass: 'id-columns',
      behavior: 'select',
      cannotTriggerInsert: true,
      width: 80,
    });
    return { columns, data };
  }
}
