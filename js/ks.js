function getRandomInt(n = 1, m = 100) {
    return Math.floor(Math.random() * (m - n + 1)) + n;
}

function getRandomBoolean() {
    return getRandomInt(1, 2) == 1;
}

let questionSet = new Set();
let maxValue = 20;
let amount = 40;
let bitValue = 0;

function plus() {
    while (true) {
        let a = getRandomInt(1, maxValue);
        let b = getRandomInt(1, maxValue);
        let c = a + b;
        if (c > maxValue) {
            continue;
        }
        return `${a} + ${b} = `;
    }
}

function plusLeftBlank() {
    let c = getRandomInt(Math.floor(maxValue / 3), maxValue);
    let b = getRandomInt(1, c);
    return `(&nbsp;&nbsp;&nbsp;&nbsp;) + ${b} = ${c}`;
}

function plusRightBlank() {
    let c = getRandomInt(Math.floor(maxValue / 3), maxValue);
    let a = getRandomInt(1, c);
    return `${a} + (&nbsp;&nbsp;&nbsp;&nbsp;) = ${c}`;
}

function sub() {
    let a = getRandomInt(1, maxValue);
    let b = getRandomInt(1, maxValue);
    if (a < b) {
        a = a ^ b;
        b = b ^ a;
        a = a ^ b;
    }
    return `${a} - ${b} = `;
}

function subLeftBlank() {
    let a = getRandomInt(1, maxValue);
    let b = getRandomInt(1, maxValue);
    if (a < b) {
        a = a ^ b;
        b = b ^ a;
        a = a ^ b;
    }
    return `(&nbsp;&nbsp;&nbsp;&nbsp;) - ${b} = ${a - b}`;
}

function subRightBlank() {
    let a = getRandomInt(1, maxValue);
    let b = getRandomInt(1, maxValue);
    if (a < b) {
        a = a ^ b;
        b = b ^ a;
        a = a ^ b;
    }
    return `${a} - (&nbsp;&nbsp;&nbsp;&nbsp;) = ${a - b}`;
}

function plusPlus() {
    while (true) {
        let a = getRandomInt(1, maxValue);
        let b = getRandomInt(1, maxValue);
        let c = getRandomInt(1, maxValue);
        let d = a + b + c;
        if (d > maxValue) {
            continue;
        }
        return `${a} + ${b} + ${c} = `;
    }
}

function subSub() {
    while (true) {
        let a = getRandomInt(Math.floor(maxValue / 2), maxValue);
        let b = getRandomInt(1, a);
        let c = getRandomInt(1, a);
        if ((a - b - c) < 0) {
            continue;
        }
        return `${a} - ${b} - ${c} = `;
    }
}

function mixPlusAndSub() {
    while (true) {
        let a = getRandomInt(1, maxValue);
        let b = getRandomInt(1, maxValue);
        let ex = a + (getRandomBoolean() ? ' + ' : ' - ') + b;
        let t = eval(ex);
        if (t < 0 || t > maxValue) {
            continue;
        }

        let c = getRandomInt(1, maxValue);
        ex = ex + (getRandomBoolean() ? ' + ' : ' - ') + c;
        t = eval(ex);
        if (t < 0 || t > maxValue) {
            continue;
        }
        return ex + " = ";
    }
}

function getQuestionSet() {
    questionSet.clear();
    let c = 0;
    while (questionSet.size < amount) {
        if (++c >= maxValue * 1000) {
            alert("生成题目数量过大，请修改题目数量！");
            return;
        }
        if (((bitValue & 1) == 1) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(plus());
        }
        if (((bitValue & 2) == 2) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(sub());
        }
        if (((bitValue & 4) == 4) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(plusPlus());
        }
        if (((bitValue & 8) == 8) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(subSub());
        }
        if (((bitValue & 16) == 16) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(mixPlusAndSub());
        }
        if (((bitValue & 32) == 32) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(plusLeftBlank());
        }
        if (((bitValue & 64) == 64) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(plusRightBlank());
        }
        if (((bitValue & 128) == 128) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(subLeftBlank());
        }
        if (((bitValue & 256) == 256) && getRandomBoolean() && questionSet.size < amount) {
            questionSet.add(subRightBlank());
        }
    }
}

function printQuestion() {
    getQuestionSet();
    let page = '';
    questionSet.forEach((ques) => {
        page = page + `<div class="ex col-3">${ques}</div>`;
    });
    document.getElementById("main").innerHTML = page;
}

document.getElementById("btn").addEventListener("click", function () {
    if (document.getElementById("amount").value < 10) {
        alert("至少生成10道题目！");
    }
    if (document.getElementById("maxValue").value < 5) {
        alert("最简单题目为5以内的加减运算！")
    }
    if (document.querySelectorAll("input[name='quesType']:checked").length == 0) {
        alert("请至少选择一种题型！");
        return;
    }
    maxValue = document.getElementById('maxValue').value;
    amount = document.getElementById('amount').value;
    printQuestion();
});

document.querySelectorAll("input[name='quesType']").forEach((input) => {
    input.addEventListener('change', (e) => {
        let el = e.target;
        if (el.checked) {
            bitValue += parseInt(el.value);
        } else {
            bitValue -= parseInt(el.value);
        }
    });
});