import addBladeLanguage from './addBladeLanguage.js';

(function (Prism) {
  if (!Prism) {
    console.warn('[prism-blade] Prism not found.');
    return;
  }
  addBladeLanguage(Prism);
})(typeof globalThis !== 'undefined' ? globalThis.Prism : undefined);
