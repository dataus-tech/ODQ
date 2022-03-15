import App from '@/App.js';
import { $component } from '@/utils/selector.js';
import '@/assets/css/main.css';

$(() => {
  new App({ $target: $component('app') });
});

/**
 * Bootstrap Tooptip
 */
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
