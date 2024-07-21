$(document).ready(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('//192.168.0.125/test/js/pwa-use-sw.js');
    }
});