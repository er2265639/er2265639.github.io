const date = new Date();
const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

$(document).ready(function () {
    setMonth();
});

function setMonth() {
    $('.month p').removeClass("current");
    $('.' + month[date.getMonth()]).addClass("current");
}