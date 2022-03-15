const $component = componentName => $(`[data-component="${componentName}"]`);

function $action(actionName, eventName, callback) {
  this.$target.delegate(`[data-action="${actionName}"]`, eventName, callback);
}

export { $component, $action };
