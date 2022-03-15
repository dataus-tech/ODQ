// Components

// Core
import SelectFile from '@/components/SelectFile';
import StartRow from '@/components/StartRow';
import ControlBox from '@/components/ControlBox';
import DataCount from '@/components/DataCount';
import DiagResultGrid from '@/components/DiagResultGrid';
import DataGrid from '@/components/DataGrid';
import RepairGrid from '@/components/RepairGrid';
import Discription from '@/components/Discription';

// Support
// - Modal
import DateModal from '@/components/modal/DateModal';
import WhetherModal from '@/components/modal/WhetherModal';
import PatternModal from '@/components/modal/PatternModal';
import TimeOrderModal from '@/components/modal/TimeOrderModal';
import LogicRelationshipModal from '@/components/modal/LogicRelationshipModal';
import FormulaModal from '@/components/modal/FormulaModal';
import SumModal from '@/components/modal/SumModal';
import SettingModal from '@/components/modal/SettingModal';

// - LoadingSpinner
import LoadingSpinner from '@/components/LoadingSpinner';

// utils
import Component from '@/core/Component';
import { $component } from '@/utils/selector';
import { parseCSV } from '@/utils/csv';
import { DIAG, INIT, LOAD, progressKR, READY, REPAIR } from '@/constants/progress';

export default class App extends Component {
  initState() {
    return {
      progress: INIT,
      diagFile: null,
      dataCount: 0,
      isLoading: false,
    };
  }

  mounted() {
    this.selectFile = new SelectFile({
      $target: $component('select-file'),
      parent: this,
    });
    this.startRow = new StartRow({
      $target: $component('start-row'),
      parent: this,
    });
    this.controlBox = new ControlBox({
      $target: $component('control-box'),
      parent: this,
    });
    this.dataCount = new DataCount({
      $target: $component('data-count'),
      parent: this,
    });
    this.diagResultGrid = new DiagResultGrid({
      $target: $component('diag-result-grid'),
      parent: this,
    });
    this.dataGrid = new DataGrid({
      $target: $component('data-grid'),
      parent: this,
    });
    this.repairGrid = new RepairGrid({
      $target: $component('repair-grid'),
      parent: this,
    });
    this.discription = new Discription({
      $target: $component('discription'),
      parent: this,
    });
    this.loadingSpinner = new LoadingSpinner({
      $target: $component('loading-spinner'),
      parent: this,
    });
    this.dateModal = new DateModal({
      $target: $component('date-modal'),
      parent: this,
    });
    this.whetherModal = new WhetherModal({
      $target: $component('whether-modal'),
      parent: this,
    });
    this.patternModal = new PatternModal({
      $target: $component('pattern-modal'),
      parent: this,
    });
    this.timeOrderModal = new TimeOrderModal({
      $target: $component('time-order-modal'),
      parent: this,
    });
    this.logicRelationshipModal = new LogicRelationshipModal({
      $target: $component('logic-relationship-modal'),
      parent: this,
    });
    this.formulaModal = new FormulaModal({
      $target: $component('formula-modal'),
      parent: this,
    });
    this.sumModal = new SumModal({
      $target: $component('sum-modal'),
      parent: this,
    });
    this.settingModal = new SettingModal({
      $target: $component('setting-modal'),
      parent: this,
    });
  }

  async loadCsvFile(file) {
    try {
      this.onLoading();
      const result = await parseCSV(file);
      const data = result.data;
      this.setState({
        diagFile: file,
        progress: LOAD,
        dataCount: data.length - 1,
        columnCount: data[0].length,
      });
      this.dataGrid.renderGrid(data);
    } catch (error) {
      alert(error);
      this.reset();
    } finally {
      this.offLoading();
    }
  }

  async setStartRow(startRow) {
    this.onLoading();
    const { data } = await parseCSV(this.state.diagFile);
    this.setState({
      progress: READY,
      startRow,
      dataCount: data.length - startRow - 1,
    });
    this.dataGrid.setStartRow(data, startRow);
    this.offLoading();
  }

  diagnosis() {
    this.onLoading();
    this.setState({ progress: DIAG });
    const { grid } = this.dataGrid.state;
    this.diagResultGrid.diagnosis(grid);
    this.offLoading();
  }

  async repair() {
    this.onLoading();
    this.setState({ progress: REPAIR });
    const { grid } = this.dataGrid.state;
    this.repairGrid.repair(grid);
    this.offLoading();
  }

  reset() {
    this.render();
    this.mounted();
  }

  onLoading() {
    this.loadingSpinner.setState({ isLoading: true });
  }

  offLoading() {
    this.loadingSpinner.setState({ isLoading: false });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    console.log(
      `%c******현재는 ${progressKR[this.state.progress]} 단계 입니다*******`,
      'background: #222; color: #bada55; font-weight: bold;',
    );
    this.selectFile.setState({
      progress: this.state.progress,
    });
    this.startRow.setState({
      progress: this.state.progress,
    });
    this.controlBox.setState({
      progress: this.state.progress,
    });
    this.dataCount.setState({
      progress: this.state.progress,
      dataCount: this.state.dataCount,
      columnCount: this.state.columnCount,
    });
    this.dataGrid.setState({
      progress: this.state.progress,
    });
    this.diagResultGrid.setState({
      progress: this.state.progress,
    });
    this.repairGrid.setState({
      progress: this.state.progress,
    });
    this.discription.setState({
      progress: this.state.progress,
    });
  }

  template() {
    return `
      <div class="row justify-content-center">
        <div class="card-group">
          <section class="card">
            <div class="card-body">
              <article data-component="select-file" />
              <article data-component="start-row" />
            </div>
          </section>
          <section class="card">
            <article data-component="control-box" class="card-body" />
          </section>
          <section class="card">
            <article data-component="data-count" class="card-body" />
          </section>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <section data-component="diag-result-grid" />
        </div>
      </div>
      <section data-component="data-grid" />
      <div class="row">
        <div class="col">
          <section data-component="repair-grid" />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <section data-component="discription" />
        </div>
      </div>
      <section data-component="date-modal" />
      <section data-component="whether-modal" />
      <section data-component="pattern-modal" />
      <section data-component="time-order-modal" />
      <section data-component="logic-relationship-modal" />
      <section data-component="formula-modal" />
      <section data-component="sum-modal" />
      <section data-component="setting-modal" />
      <section data-component="loading-spinner" />
    `;
  }
}
