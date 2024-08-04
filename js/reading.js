const synth = window.speechSynthesis;

$(document).ready(function () {
    speechSynthesisCancel();
    getOption();
    OptionChangeEvent();
    reading();
    leave();
    screenLock();
});

async function screenLock() {
    if (isScreenLockSupported()) {
        let screenLock;

        try {
            screenLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.log(err.name, err.message);
        }

        return screenLock;
    }
}

function isScreenLockSupported() {
    return ('wakeLock' in navigator);
}

function getOption() {
    $.getJSON('https://er2265639.github.io/data/option.json', function (data, textStatus, jqXHR) {
        $.each(data.data, function (index, value) {
            $('#option').append(createOption(value.value, value.name))
        });
    });
}

function createOption(value, text) {
    return '<option value="' + value + '">' + text + '</option>';
}

function OptionChangeEvent() {
    $('#option').change(function (e) {
        e.preventDefault();
        var value = $(this).val();
        var content = $('#content');

        content.empty();

        if (value !== '') {
            $.ajax({
                type: 'get',
                url: 'https://er2265639.github.io/data/' + value,
                datatype: 'text/csv',
                success: function (response) {
                    var csvData = d3.csvParse(response);

                    $.each(csvData, function (index, value) {
                        var text = '';
                        var no = value.no;
                        var question = value.question;
                        var answerText = getAnswerText(value);

                        text += '<div class="title">' + no + '. ' + question + '</div>';
                        text += '<div class="answer">' + answerText + '</div>';
                        text = '<div class="block" id="question' + no + '" no="' + no + '">' + text + '</div>';

                        content.append(text);
                    });
                }
            });
        }
    });
}

function getAnswerText(value) {
    var answerText = '';

    switch (value.answer) {
        case '1':
            answerText = value.option1;
            break;
        case '2':
            answerText = value.option2;
            break;
        case '3':
            answerText = value.option3;
            break;
        case '4':
            answerText = value.option4;
            break;
    }

    return answerText;
}

function speechSynthesisCancel() {
    $('#content .block').removeClass('speak');
    synth.cancel();
}

function speechSynthesisSpeak(target) {
    const utterThis = new SpeechSynthesisUtterance(target.text());

    utterThis.addEventListener("start", () => {
        target.addClass('speak');
        $(window).scrollTop(target.offset().top - Math.trunc(window.innerHeight / 5))
    });

    utterThis.addEventListener("end", () => {
        target.removeClass('speak');
    });

    utterThis.rate = 1.5;
    synth.speak(utterThis);
}

function reading() {
    $('#reading').click(function (e) {
        var start = $("#start").val();
        var end = $("#end").val();
        var content = $('#content .block');
        var speakControl = $('#speakControl');

        if (content.length === 0) {
            alert('題庫載入失敗，請重新選擇!');
        } else {
            if (start === '' || end === '') {
                start = 1;
                end = content.length;

                alert('全部閱讀!');
            }

            if ((end * 1) < (start * 1)) {
                alert('閱讀範圍輸入錯誤!');
            } else if (((end * 1) - (start * 1)) < 49) {
                alert('閱讀範圍需至少大於50題!');
            } else {
                speechSynthesisCancel();

                $.each(content, function (index, value) {
                    var no = $(this).attr('no') * 1;

                    if (no >= start && no <= end) {
                        speechSynthesisSpeak($(this));
                    }
                });

                speakControl.css('display', 'block');
                
                speakControlEvent();
            }
        }
    });
}

function leave() {
    $(window).on('unload', function () {
        speechSynthesisCancel();
    });
}

function speakControlEvent() {
    $('#speakControl').find('i').removeClass('bi-play').addClass('bi-pause');

    $('#speakControl').unbind('click').click(function (e) {
        var icon = $(this).find('i');

        if (icon.hasClass('bi-pause')) {
            icon.removeClass('bi-pause').addClass('bi-play');
            synth.pause();
        } else {
            icon.removeClass('bi-play').addClass('bi-pause');
            synth.resume();
        }
    });
}