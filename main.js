const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.numbers');
const allclear = document.querySelector('.buttons.allclear');
const backspace = document.querySelector('.bkspce')
const equal = document.querySelector('.equal');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const modButton = document.querySelector('.mod');
const audio = document.querySelector('audio');
const regex = /[\+\-\*\/\÷\x\^(mod)]/gm;
const regex1 = /[\+\*\/\÷\x\^(mod)]/gm;


window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`[data-key="${e.key}"]`);
    if (e.key >= 0 && e.key <= 9 && display.innerHTML.length < 9 || e.key === '.') {
        audio.currentTime = 0;
        audio.play();
        display.innerHTML += e.key;
        key.classList.add('press');
    }

});

window.addEventListener('keyup', (e) => {
    const key = document.querySelector(`[data-key="${e.key}"]`);
    key.classList.remove('press');
});


window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`[data-key="${e.key}"]`);
    if (e.key === '/' || e.key === '*' || e.key === '-' || e.key === '+' && display.innerHTML.length < 9) {
        key.classList.add('press');
        audio.currentTime = 0;
        audio.play();
        let string = display.innerHTML;
        let count = getFrequency(display.innerHTML, ['+', '-', '/', '*']);
        if (string[0] === '-') {
            if (count > 2) {
                equate();
            } else {
                display.innerHTML += e.key;
            }
        } else {
            if (count > 1) {
                equate();
            } else {
                display.innerHTML += e.key;
            }
        }
    }
    
})


window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`[data-key="${e.key}"]`);
    let count = getFrequency(display.innerHTML, ['+', '-', '/', '*', 'mod', '%']);
    if (e.key === 'Enter') {
        key.classList.add('press');
        audio.currentTime = 0;
        audio.play();
    } else if (e.key === 'Enter' && count > 1) {
        key.classList.add('press');
        audio.currentTime = 0;
        audio.play();
        equate();
    }
});
    


window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`[data-key="${e.key}"]`);
    if (e.key === 'Backspace') {
        key.classList.add('press');
        audio.currentTime = 0;
        audio.play();
        let string = display.innerHTML;
        let array = string.split('');
        array.pop();
        string = array.join('');
        display.innerHTML = string;
    }
});



buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        audio.currentTime = 0;
        audio.play();
        concat(e);
    });

});

function concat(e) {
    if (display.innerHTML.length < 9) {
        display.innerHTML += e.target.innerHTML;
    }
}

allclear.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    display.innerHTML = '';
});


backspace.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    let string = display.innerHTML;
    let array = string.split('');
    array.pop();
    string = array.join('');
    display.innerHTML = string;
});

modButton.addEventListener('click', (e) => {
    audio.currentTime = 0;
    audio.play();
    let string = display.innerHTML;
    let count = getFrequency(display.innerHTML, ['+', '-', '/', '*', '%']);
    if (string.includes('mod')) {
        equateMod();
    } else if (count > 1) {
        equate();
    } else {
        concat(e);
    }
})

equal.addEventListener('click', equate);

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        audio.currentTime = 0;
        audio.play();
        let string = display.innerHTML;
        let count = getFrequency(display.innerHTML, ['+', '-', '/', '*', 'mod', '%']);
        if (string[0] === '-') {
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

function getFrequency(string, char) {
    let count = 1;
    for (j = 0; j < char.length; j++) {
        for (let i = 0; i < string.length; i++) {
            if (string.charAt(i) === char[j]) {
                ++count;
            }
        }
    }

    return count;
};

function find(string, char, subtwo) {
    for (let i = 1; i < string.length; i++) {
        if (string.charAt(i) === char) {
            [first, second] = [string.substring(0, i), string.substring(i + subtwo)];
            return first, second;
        }
    }
    [first, second] = string.split(regex1);
}

function equate() {
    let string = display.innerHTML;
    (string[0] === '-') ? find(string, '-', 1) : [first, second] = string.split(regex);
    console.log(`${first}, ${second}`);
    const num1 = Number(first);
    const num2 = Number(second);
    if (string.includes('+')) {
        display.innerHTML = add(num1, num2);
    } else if (string.includes('-')) {
        display.innerHTML = subtract(num1, num2);
    }
    else if (string.includes('/')) {
        display.innerHTML = divide(num1, num2);
    }
    else if (string.includes('*')) {
        display.innerHTML = multiply(num1, num2);
    }
    else if (string.includes('^')) {
        display.innerHTML = power(num1, num2);
    } else if (string.includes('mod')) {
        equateMod();
    }
}

function equateMod() {
    let string = display.innerHTML;
    find(string, 'm', 3);
    const num1 = Number(first);
    const num2 = Number(second);
    display.innerHTML = mod(num1, num2);
}

function decimal(num) {
    if (Number.isFinite(num)) {
        if (num % 1 === 0) {
            return num;
        } else if (num % 1 === 0.5) {
            return num.toFixed(1);
        } else {
            return num.toFixed(2);
        }
    } else {
        return `Nope!`;
    }

}

function add(num1, num2) {
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
    for (i = 0; i < num2; i++) {
        result = result * num1;
    }
    return decimal(result);
}

function mod(num1, num2) {
    result = num1 % num2;
    return decimal(result);
}