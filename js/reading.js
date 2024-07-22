const synth = window.speechSynthesis;

$(document).ready(function () {
    speechSynthesisCancel();
    getOption();
    OptionChangeEvent();
});

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
                        text = '<div class="block" id="question' + no + '">' + text + '</div>';

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
    if (synth.speaking) {
        synth.cancel();
    }
}

function speechSynthesisSpeak(target) {
    const utterThis = new SpeechSynthesisUtterance(target.text());

    utterThis.addEventListener("start", () => {
        target.addClass('speak');
        $(window).scrollTop(target.offset().top - 50);
    });

    utterThis.addEventListener("end", () => {
        target.removeClass('speak');
    });

    utterThis.rate = 1.5;
    synth.speak(utterThis);
}