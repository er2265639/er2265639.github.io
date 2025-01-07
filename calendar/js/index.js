$(document).ready(function () {
    setMonth();
    setWeek();
});

function setMonth() {
    var date = new Date();
    var month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    $('.month p').removeClass("current");
    $('.' + month[date.getMonth()]).addClass("current");
}

function setWeek() {
    var date = new Date();
    var week = ['24rem', '20rem', '16rem', '12rem', '8rem', '4rem', '0rem'];
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var date = new Date(year + '-' + month + '-1');

    $('.day .week').css('left', week[date.getDay()]);
}

function setTime() {
    setInterval(function () {
        var date = new Date();
        var time = date.getHours() + '：' + date.getMinutes() + '：' + date.getSeconds();

        $('.time').text(time)
    }, 1000);
}