let minValue = parseInt(prompt('Минимальное знание числа для игры','0'));
let maxValue = parseInt(prompt('Максимальное знание числа для игры','100'));
// При вводе максимума изменяет границы от -999 до 999.
minValue = (minValue < -999) ? minValue = -999 : (minValue > 999) ? minValue = 999 : minValue;
maxValue = (maxValue > 999) ? maxValue = 999 : (maxValue < -999) ? maxValue = -999 : maxValue;
if (maxValue < minValue) {
    [maxValue, minValue] = [minValue, maxValue]; 
}
if (Number.isNaN(maxValue) || Number.isNaN(minValue)) {
    minValue = 0;
    maxValue = 100;
}
alert = (`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`); // загадать число
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

// Преобразования числа в текстовую форму. Число выводится в текстовой форме, если в текстовой форме меньше 20 символов, включая пробелы.
let units = ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let teens = ['', 'десять', 'одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    let dozens = ['', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    let hundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

    function numberToText() { // Функция преобразования числа из цифр в слова (числа от -999 до 999).
        let number = Math.abs(answerNumber);
        let text = '';

        if (number == 0) {
            text = 'ноль';
            return text;
        }

        if (number <= 9) {
            return units[Math.floor(Math.abs(number) / 1)];
        }

        if (number > 9 && number < 20) {
            return teens[Math.floor(number / 10 + number % 10)];
        }

        if (number >= 20 && number <= 99) {
            return dozens[(Math.floor(number / 10)) - 1] + " " + units[Math.floor(number % 10)];
        }

        if (number >= 100 && number <= 999) {
            return hundreds[Math.floor(number / 100)] + " " + numberToTextHundreds();
        }
    }

    function numberToTextHundreds() { // Функция вычисления остатка от сотого числа и преобразования его в числа из цифр в слова (числа от 0 до 99) для последующего присоединения к функции numberToText() расчитывающей сотни hundreds.
        let unitsTeensDozens = Math.abs(answerNumber) % 100;

        if (unitsTeensDozens <= 9) {
            return units[Math.floor(unitsTeensDozens / 1)];
        }

        if (unitsTeensDozens > 9 && unitsTeensDozens < 20) {
            return teens[(Math.floor(unitsTeensDozens / 10)) + (unitsTeensDozens % 10)];
        }

        if (unitsTeensDozens >= 20 && unitsTeensDozens <= 99) {
            return dozens[(Math.floor(unitsTeensDozens / 10)) - 1] + " " + units[Math.floor(unitsTeensDozens % 10)];
        }
    }

    orderNumberField.innerText = orderNumber; 
    answerField.innerText = answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? `Вы загадали число ${numberToText()}?` : `Вы загадали число ${answerNumber}?` : numberToText().length < 20  ? `Вы загадали число минус ${numberToText()}?` : `Вы загадали число ${answerNumber}?`;  

document.getElementById('btnRetry').addEventListener('click', function ()  { // кнопка "заново"
    minValue = 0;
    maxValue = 100;
    orderNumber = 1;
    location.reload();
});
    


document.getElementById('btnOver').addEventListener('click', function () { // кнопка "больше"
    if (gameRun){
        if (minValue === maxValue){ 
            const phraseRandom = Math.round( Math.random() * 2);
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            function getRandomInt (max) {
                return Math.floor(Math.random() * max); // изменение фраз в рандомном порядке
            }
            let answersText = ["Это число", "Скорее всего это", "Наверное, это число", "Легко,это"]; 
            answerField.innerText = answersText[getRandomInt(4)] + " " + (answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? ` ${numberToText()}?` : ` ${answerNumber}?` : numberToText().length < 20  ? ` минус ${numberToText()}?` : ` ${answerNumber}?`);  
             

        }
    }
})
document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || minValue === answerNumber){ 
            const phraseRandom = Math.round( Math.random() * 3 );
            switch (phraseRandom) { // здесь решил попробовать через switch
                case 0:
                 answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
                 break;
                case 1:
                answerPhrase = `Я сдаюсь..\n\u{1F92F}`
                break;
                case 2:
                answerPhrase =`Вы явно забыли число которое загадали\n\u{1F620}`
                break;
                case 3:
                answerPhrase =`Что-то тут явно не так \n\u{1F92A}`
                break;
            
            }

            answerField.innerText = answerPhrase;
            gameRun = false;
            
        } else { 
           maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++; 
            orderNumberField.innerText = orderNumber;  
            function getRandomInt (max) {
                return Math.floor(Math.random() * max); // изменение фраз в рандомном порядке (как и на кнопке больше)
            }
            let answersText = ["Это число", "Скорее всего это", "Наверное, это число", "Легко,это"];
            answerField.innerText = answersText[getRandomInt(4)] + " " + (answerNumber >= 0 ? numberToText().length < 20 && answerNumber >= 0 ? ` ${numberToText()}?` : ` ${answerNumber}?` : numberToText().length < 20  ? ` минус ${numberToText()}?` : ` ${answerNumber}?`);  
           
        }
    }   
})


document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        let phraseRandom = Math.round(Math.random() * 3);
        switch (phraseRandom) { //  рандомный порядок выдачи фраз через switch
            case 0:
                answerPhrase = `Я всегда угадываю\n\u{1F609}`;
                break;
            case 1:
                answerPhrase = `Это было легко\n\u{1F929}`;
                break;
            case 2:
                answerPhrase = `Проще простого\n\u{1F61C}`;
                break;
            case 3:
                answerPhrase = `В следующий раз, давай по сложнее что-то\n\u{1F60E}`;
                break;
        }
        answerField.innerText = answerPhrase;
        gameRun = false;
    }
});
