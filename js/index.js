$(document).ready(function () {
    readingButtonEvent();
    testingButtonEvent();
});

function readingButtonEvent() {
    $("#reading").click(function (e) {
        window.location.href = '//192.168.0.125/test/reading.html';
    });
}

function testingButtonEvent() {
    $("#testing").click(function (e) {
        window.location.href = '//192.168.0.125/test/testing.html';
    });
}
