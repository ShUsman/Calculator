const main = document.querySelector('.main');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.calc-button');
const erase = document.querySelector('#erase');
display.textContent = '0';

function sum(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

let a = '';
let operation = '';
let b = '';

function operate(a, operation, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operation == "+") {
        return sum(a, b);
    } else if (operation == "-") {
        return substract(a, b);
    } else if (operation == "*") {
        return multiply(a, b);
    } else if (operation == "/") {
        return division(a, b);
    }
}

function removeSimbol() {
    if (a.length === 1 && operation === '' && b === '') {
        a = '0';
    } else if (a.length > 1 && operation === '' && b === '') {
        a = a.slice(0, -1);
    } else if (a !== '' && operation !== '' && b === '') {
        operation = operation.slice(0, -1);
    } else {
        b = b.slice(0, -1);
    }
    updateDisplay();
}

erase.addEventListener('click', e => {
    removeSimbol();
})

function updateDisplay() {
    display.textContent = `${a} ${operation} ${b}`;
    console.log(operation);
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        const value = e.target.value;

        if (value >= '0' && value <= '9') { // Проверка на число
            if (operation === '') {
                a = a === '0' ? value : a + value;
                updateDisplay();
            } else {
                b = b === '0' ? value : b + value;
                updateDisplay();
            }
        } else if (value === 'C') { // Очистка
            a = '';
            operation = '';
            b = '';
            updateDisplay();
            display.textContent = '0';
        } else if (value === '=') { // Равно
            if (a !== '' && operation !== '' && b !== '') {
                const result = operate(a, operation, b).toString();
                display.textContent = result;
                a = result;
                operation = '';
                b = '';
            }
        } else { // Операция
            if (a !== '' && b === '') {
                operation = value;
                updateDisplay();
            }
        } 
    });

});

