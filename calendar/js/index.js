$(document).ready(function () {
    setMonth();
    setWeek();
    setTime();
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
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        var time = hh + '：' + mm + '：' + ss;

        if ((hh + '').length === 1) {
            hh = '0' + hh;
        }

        if ((mm + '').length === 1) {
            mm = '0' + mm;
        }

        if ((ss + '').length === 1) {
            ss = '0' + ss;
        }

        $('.time').text(time)
    }, 1000);
}