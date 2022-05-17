const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.numbers');
const backspace = document.querySelector('.buttons.bkspce');
const equal = document.querySelector('.equal');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const addButton = document.querySelector('.add');
const regex = /[\+\-\*\/\÷\x\^(mod)]/gm;
const regex1 = /[\+\*\/\÷\x\^(mod)]/gm;
let result = '';



buttons.forEach(button => {
    button.addEventListener('click', concat);
    
});

function concat(e) {
        if (display.innerHTML.length < 9) {
            display.innerHTML += e.target.innerHTML;
        }  
}

backspace.addEventListener('click', () => {
    display.innerHTML = '';
})

equal.addEventListener('click', equate);

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        let count = getFrequency(display.innerHTML,['+','-','/','*','mod','%']);
    if (count > 1) {
        equate();
    } else {
        concat(e);
    }
    })
});

function getFrequency(string,char) {
    let count = 1;
    for(j=0; j< char.length; j++){
        for (let i=0; i<string.length;i++) {
            if (string.charAt(i) === char[j]) {
               ++count;
            } 
        }
    }

    return count;
};


function equate() {
    let string = display.innerHTML;
    (string[0] === '-') ? [first, second] = string.split(regex1): [first, second] = string.split(regex);
    const num1 = Number(first);
    const num2 = Number(second);
    if (string.includes('+')) {
        display.innerHTML = add(num1,num2);
    } else if (string.includes('-')) {
        display.innerHTML = subtract(num1,num2);
    }
    else if (string.includes('/')) {
        display.innerHTML = divide(num1,num2);
    }
    else if (string.includes('*')) {
        display.innerHTML = multiply(num1,num2);
    }
    else if (string.includes('^')) {
        display.innerHTML = power(num1,num2);
    }
}

function decimal(num) {
    if (num % 1 === 0) {
        return num;
    } else if (num % 1 === 0.5){
        return num.toFixed(1);
    } else {
        return num.toFixed(2);
    }
}

function add(num1,num2) {
    result = num1 + num2;
    return decimal(result);
}

function subtract(num1, num2) {
    result = num1 - num2;
    return decimal(result);
}

function divide(num1, num2) {
    result = num1 / num2;
    return decimal(result);
}

function multiply(num1, num2) {
    result = num1 * num2;
    return decimal(result);
}

function power(num1, num2) {
    let result = 1;
	for (i = 0; i<num2; i++) {
    result = result * num1;
  }
   return decimal(result);
}

