$(document).ready(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('https://er2265639.github.io/js/pwa-use-sw.js');
    }
});