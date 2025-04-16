var mediaLength = 0;
var currentMediaNo = 0;

$(document).ready(function () {
    mediaLength = $('.media').length;

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

        var todayIndex = [
            [
                '00,24', '00,28', '00,32', '00,36', '00,40', '00,44', '00,48',
                '04,24', '04,28', '04,32', '04,36', '04,40', '04,44', '04,48',
                '08,24', '08,28', '08,32', '08,36', '08,40', '08,44', '08,48',
                '12,24', '12,28', '12,32', '12,36', '12,40', '12,44', '12,48',
                '16,24', '16,28', '16,32'
            ],
            [
                         '00,24', '00,28', '00,32', '00,36', '00,40', '00,44',
                '04,20', '04,24', '04,28', '04,32', '04,36', '04,40', '04,44',
                '08,20', '08,24', '08,28', '08,32', '08,36', '08,40', '08,44',
                '12,20', '12,24', '12,28', '12,32', '12,36', '12,40', '12,44',
                '16,20', '16,24', '16,28', '16,32'
            ],
            [
                                  '00,24', '00,28', '00,32', '00,36', '00,40',
                '04,16', '04,20', '04,24', '04,28', '04,32', '04,36', '04,40',
                '08,16', '08,20', '08,24', '08,28', '08,32', '08,36', '08,40',
                '12,16', '12,20', '12,24', '12,28', '12,32', '12,36', '12,40',
                '16,16', '16,20', '16,24', '16,28', '16,32'
            ],
            [
                                           '00,24', '00,28', '00,32', '00,36',
                '04,12', '04,16', '04,20', '04,24', '04,28', '04,32', '04,36',
                '08,12', '08,16', '08,20', '08,24', '08,28', '08,32', '08,36',
                '12,12', '12,16', '12,20', '12,24', '12,28', '12,32', '12,36',
                '16,12', '16,16', '16,20', '16,24', '16,28', '16,32'
            ],
            [
                                                    '00,24', '00,28', '00,32',
                '04,08', '04,12', '04,16', '04,20', '04,24', '04,28', '04,32',
                '08,08', '08,12', '08,16', '08,20', '08,24', '08,28', '08,32',
                '12,08', '12,12', '12,16', '12,20', '12,24', '12,28', '12,32',
                '16,08', '16,12', '16,16', '16,20', '16,24', '16,28', '16,32'
            ],
            [
                                                             '00,24', '00,28',
                '04,04', '04,08', '04,12', '04,16', '04,20', '04,24', '04,28',
                '08,04', '08,08', '08,12', '08,16', '08,20', '08,24', '08,28',
                '12,04', '12,08', '12,12', '12,16', '12,20', '12,24', '12,28',
                '16,04', '16,08', '16,12', '16,16', '16,20', '16,24', '16,28',
                '20,04'
            ],
            [
                                                                      '00,24',
                '04,00', '04,04', '04,08', '04,12', '04,16', '04,20', '04,24',
                '08,00', '08,04', '08,08', '08,12', '08,16', '08,20', '08,24',
                '12,00', '12,04', '12,08', '12,12', '12,16', '12,20', '12,24',
                '16,00', '16,04', '16,08', '16,12', '16,16', '16,20', '16,24',
                '20,00', '20,04'
            ]
        ];

        var todayIndexByFirstDay = todayIndex[date.getDay()]
        var date = new Date();
        var today = date.getDate();
        var todayTop = todayIndexByFirstDay[today - 1].split(',')[0]
        var todayLeft = todayIndexByFirstDay[today - 1].split(',')[1]

        $('.day .today').css('top', todayTop + 'rem').css('left', todayLeft + 'rem');

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

    currentMediaNo = getMediaNo();

    displayMedia(currentMediaNo);

    $('body').click(function (e) {
        currentMediaNo = getMediaNo();

        displayMedia(currentMediaNo);
        palyVideo();
    });

    setInterval(function () {
        currentMediaNo = getMediaNo();

        displayMedia(currentMediaNo);
    },1000);
});

function displayMedia(no) {
    $('.media').removeClass('visible');
    $($('.media').get(no)).addClass('visible');
}

function getMediaNo() {
    return Math.floor(Math.random() * mediaLength);
}

function palyVideo() {
    $.each($('video'), function (index, value) { 
        if ($(this).get(0).paused === true) {
            $(this).get(0).play();
        }
    });
}