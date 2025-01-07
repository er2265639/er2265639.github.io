var month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];



$(document).ready(function () {
    setMonth();
});

function setMonth() {
    const date = new Date();

    $('.month p').removeClass("current");
    $('.' + month[date.getMonth()]).addClass("current");
}