const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.numbers');
const backspace = document.querySelector('.buttons.bkspce');
const equal = document.querySelector('.equal');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
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
        let string = display.innerHTML;
        let count = getFrequency(display.innerHTML,['+','-','/','*','mod','%']);
        if (string[0]=== '-') {
            if (count > 2) {
                equate();
            } else {
                concat(e);
            }
        } else {
            if (count > 1) {
                equate();
            } else {
                concat(e);
            }
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

function findSubtract(string) {
    for (let i= 1; i<string.length; i++) {
        if(string.charAt(i) === '-'){
            [first,second] = [string.substring(0,i),string.substring(i+1)];
            return first, second;
        }
    }
    [first, second] = string.split(regex1);
}

function equate() {
    let string = display.innerHTML;
    (string[0] === '-') ?  findSubtract(string) : [first, second] = string.split(regex);
    console.log(`${first}, ${second}`);
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
    if(Number.isFinite(num)) {
        if (num % 1 === 0) {
            return num;
        } else if (num % 1 === 0.5){
            return num.toFixed(1);
        } else {
            return num.toFixed(2);
        }
    } else {
        return `Nope!`;
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

