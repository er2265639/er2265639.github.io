var testingData = [];
var csvData = '';
var correct = 0;
var errorData = [];

$(document).ready(function () {
    getOption();
    OptionChangeEvent();
    testingStart();
    nextQuestion();
    finish();
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

        csvData = '';

        if (value !== '') {
            $.ajax({
                type: 'get',
                url: 'https://er2265639.github.io/data/' + value,
                datatype: 'text/csv',
                success: function (response) {
                    csvData = d3.csvParse(response);
                }
            });
        }
    });
}

function testingStart() {
    $('#testing').click(function (e) {
        var start = $("#start").val();
        var end = $("#end").val();

        if (csvData === '') {
            alert('題庫載入失敗，請重新選擇!');
        } else {
            if (start === '' || end === '') {
                start = 1;
                end = csvData.length + 1;
    
                alert('全部測驗!');
            }
    
            if ((end * 1) < (start * 1)) {
                alert('測驗範圍輸入錯誤!');
            } else if (((end * 1) - (start * 1)) < 9) {
                alert('測驗範圍需至少大於10題!');
            } else {
                addTestingData(csvData, start, end);
                createContent(testingData[0], 0);
    
                $('#option, .input-group, #testing').hide();
                $('#next').show();
            }
        }
    });
}

function addTestingData(csvData, start, end) {
    testingData = [];
    errorData = [];

    $.each(csvData, function (index, value) {
        var no = value.no * 1;

        if (no >= start && no <= end) {
            var data = {
                no: value.no,
                answer: value.answer,
                question: value.question,
                option1: value.option1,
                option2: value.option2,
                option3: value.option3,
                option4: value.option4,
            }

            testingData.push(data);
        }
    });
}

function createContent(data, count) {
    $('#content').empty();
    $('#content').attr('count', count);
    $('#content').attr('no', data.no);
    $('#content').attr('answer', data.answer);
    $('#content').append('<h1>' + data.no + '. ' + data.question + '</h1>');
    $('#content').append(getTestingOption('1', data.option1));
    $('#content').append(getTestingOption('2', data.option2));
    $('#content').append(getTestingOption('3', data.option3));
    $('#content').append(getTestingOption('4', data.option4));

    testingOptionClick();
}

function getTestingOption(ansNo, text) {
    return '<div class="form-check"><input class="form-check-input" type="radio" name="testingOption" id="testingOption' + ansNo + '" value="' + ansNo + '"><label class="form-check-label" for="testingOption' + ansNo + '"><h2>' + text + '</h2></label></div>'
}

function nextQuestion() {
    $('#next').click(function (e) {
        if ($('[name=testingOption]:checked').length > 0) {
            var next = ($('#content').attr('count') * 1) + 1;

            if (next === testingData.length - 1) {
                $('#next').hide();
                $('#finish').show();
            }

            createContent(testingData[next], next);
        } else {
            alert('請先作答!');
        }
    });
}

function finish() {
    $('#finish').click(function (e) {
        if ($('[name=testingOption]:checked').length > 0) {
            $('#option, .input-group, #testing').show();
            $('#option, #start, #end').val('');
            $('#content').empty();
            $('#finish').hide();

            var percent = Math.trunc(((correct / testingData.length)) * 100);
            var msg = '熟練度:' + percent + '%';

            if (percent !== 100) {
                msg += '，請詳讀錯誤題目。';
            }

            alert(msg);
            displayErrorData();

            csvData = '';
            testingData = [];
            errorData = [];
            correct = 0;
        } else {
            alert('請先作答!');
        }
    });
}

function testingOptionClick() {
    $('[name=testingOption]').click(function (e) {
        var answer = $('#content').attr('answer');
        var no = $('#content').attr('no');
        var thisValue = $(this).val();

        if (thisValue === answer) {
            correct += 1;
        } else {
            errorData.push(no);
        }

        $('label[for=testingOption' + answer + ']').css('background', 'lightgreen')
        $('[name=testingOption]').prop('disabled', true)
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

function displayErrorData() {
    $.each(csvData, function (index, value) {
        if (errorData.indexOf(value.no) !== -1) {
            var text = '';
            var no = value.no;
            var question = value.question;
            var answerText = getAnswerText(value);

            text += no + '. ' + question + '<br>'
            text += '<span style="color:red">' + answerText + '</span><br><br>'

            $('#content').append(text);
        }
    });
}