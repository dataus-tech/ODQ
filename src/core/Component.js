import { observable, observe } from './observer.js';

export default class Component {
  $target;
  parent;
  state;
  constructor(config) {
    Object.entries(config).forEach(([key, value]) => {
      this[key] = value;
    });

    this.setup();
  }

  initState() {
    return {};
  }

  setup() {
    this.state = observable(this.initState());
    observe(() => {
      this.render();
      this.setEvents();
      this.mounted();
    });
  }

  setEvents() {}

  mounted() {}

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  render() {
    this.$target.html(this.template());
  }

  template() {
    return '';
  }
}
