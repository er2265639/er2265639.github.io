$(document).ready(function () {
    readingButtonEvent();
    testingButtonEvent();
});

function readingButtonEvent() {
    $("#reading").click(function (e) {
        window.location.href = 'https://er2265639.github.io/test/reading.html';
    });
}

function testingButtonEvent() {
    $("#testing").click(function (e) {
        window.location.href = 'https://er2265639.github.io/test/testing.html';
    });
}
