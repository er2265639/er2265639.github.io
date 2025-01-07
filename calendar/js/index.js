const date = new Date();
const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const week = ['24rem', '20rem', '16rem', '12rem', '8rem', '4rem', '0rem'];

$(document).ready(function () {
    setMonth();
    setWeek();
});

function setMonth() {
    $('.month p').removeClass("current");
    $('.' + month[date.getMonth()]).addClass("current");
}

function setWeek() {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var date = new Date(year + '-' + month + '-1');

    $('.day .week').css('left', week[date.getDay()]);
}