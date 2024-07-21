$(document).ready(function () {
    readingButtonEvent();
    testingButtonEvent();
});

function readingButtonEvent() {
    $("#reading").click(function (e) {
        window.location.href = 'https://er2265639.github.io/reading.html';
    });
}

function testingButtonEvent() {
    $("#testing").click(function (e) {
        window.location.href = 'https://er2265639.github.io/testing.html';
    });
}
