$(document).ready(function () {
    setInterval(function () {
        var date = new Date();
        var month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        $('.month p').removeClass("current");
        $('.' + month[date.getMonth()]).addClass("current");

        var week = ['24rem', '20rem', '16rem', '12rem', '8rem', '4rem', '0rem'];
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var date = new Date(year + '-' + month + '-1');

        $('.day .week').css('left', week[date.getDay()]);

        var date = new Date();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();

        if (hh < 10) {
            hh = '0' + hh;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        if (ss < 10) {
            ss = '0' + ss;
        }

        $('.time').text(hh + '：' + mm + '：' + ss)
    }, 1000);

    $('body').click(function (e) { 
        $('video').css('display', 'block').get(0).play();
        $('.picture').css('display', 'none');
    });
});