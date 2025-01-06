$(document).ready(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('https://er2265639.github.io/test/js/pwa-use-sw.js');
    }
});