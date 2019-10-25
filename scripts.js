//reverse Polish notation
// 3 (enter) 2(enter) ÷

var operandStack = [];
var tempOperand = "";
const storage = ["", "", "", "", "", "", "", "", ""];
storeBool = false;
recallBool = false;

var addOperand = (function(x){
    operandStack.push(x);
});

var calculator = (function () {

    var delta = 1;

    var increment = function(val) {
        return val + delta;
    }

    var add = function(x, y){
        return +x + +y;
    }

    var subtract = function(x, y){
        return +x - +y;
    }

    var multiply = function(x, y){
        return +x * +y;
    }

    var divide = function(x,y){
        return +x/+y;
    }

    var oneOverX = function(x){
        return 1/+x;
    }

    var squareRoot = function(x){
        return Math.sqrt(+x);
    }
    
    
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        squareRoot: squareRoot,
        oneOverX: oneOverX,
    }
})();

var updateVisualStack = function(){
    let visualStack = document.getElementById("smallInput");
    let visualNum = document.getElementById("bigInput");
    visualStack.textContent = operandStack.join(", ");
    if (tempOperand != ""){
        visualNum.textContent = tempOperand;
        return;
    }
    else{
        visualNum.textContent = operandStack.slice(-1)[0];
    }
}

var checkTempOperand = function(){
    if (tempOperand != ""){
        addOperand(tempOperand);
        tempOperand = "";
    }
}

for (let i = 0; i<10; i++){
    var numButtons = [];
    numButtons[i] = document.getElementById(i);
    numButtons[i].addEventListener("click", () => {
        if (storeBool == true){
            if (tempOperand != ""){
                storage[i] = tempOperand;
            }
            else{
                storage[i]= operandStack.slice(-1)[0];
            }
            storeBool = false;
            tempOperand = "";
            console.log(storage);
        }
        else if (recallBool == true){
            tempOperand = storage[i];
            recallBool = false;
        }
        else if (tempOperand.length >= 30){

        }
        else{
            tempOperand = tempOperand + "" + i;
        }
        updateVisualStack();
        console.log(tempOperand.length);
    });
}

var storeButton = document.getElementById("storeButton");
storeButton.addEventListener("click", () => {
    storeBool = true;
});

var recallButton = document.getElementById("recallButton");
recallButton.addEventListener("click", () => {
    recallBool = true;
});

var dotButton = document.getElementById("dotButton");
dotButton.addEventListener("click", () => {
    if (tempOperand.indexOf('.') > -1){
        return;
    }
    else{
        tempOperand = tempOperand + "" + ".";
        updateVisualStack();
    }
});

var entButton = document.getElementById("enterButton");
entButton.addEventListener("click", () => {
    checkTempOperand();
    updateVisualStack();
});

var addButton = document.getElementById("addButton");
addButton.addEventListener("click", () => {

    if (operandStack.length > 0){
        checkTempOperand();
    } 
    if (operandStack.length > 1){
        let num2 = operandStack.pop();
        let num1 = operandStack.pop();
        let sum = calculator.add(num1, num2);
        addOperand(sum);
        updateVisualStack();
    }
});

var subButton = document.getElementById("subButton");
subButton.addEventListener("click", () => {

    if (operandStack.length > 0){
     checkTempOperand();
    } 
    if (operandStack.length > 1){
        let num2 = operandStack.pop();
        let num1 = operandStack.pop();
        let difference = calculator.subtract(num1, num2);
        addOperand(difference);
        updateVisualStack();
    }
});

var mulButton = document.getElementById("mulButton");
mulButton.addEventListener("click", () => {

    if (operandStack.length > 0) {
        checkTempOperand();
    } 
    if (operandStack.length > 1){
        let num2 = operandStack.pop();
        let num1 = operandStack.pop();
        let product = calculator.multiply(num1, num2);
        addOperand(product);
        updateVisualStack();
    }
});

var divButton = document.getElementById("divButton");
divButton.addEventListener("click", () => {

    if (operandStack.length > 0){
        checkTempOperand();
    } 
    if (operandStack.length > 1){ 
        let num2 = operandStack.pop();
        let num1 = operandStack.pop();
        let quotient = calculator.divide(num1, num2);
        addOperand(quotient);
        updateVisualStack();
    }
});

var cycleButton = document.getElementById("cycleButton");
cycleButton.addEventListener("click", () => {

    if (tempOperand != ""){
        checkTempOperand();
    } 
    if (operandStack.length > 0){ 
        let num = operandStack.pop();
        operandStack.unshift(num);
        updateVisualStack();
    }
});

var swapButton = document.getElementById("swapButton");
swapButton.addEventListener("click", () => {

    if (tempOperand != ""){
        checkTempOperand();
    } 
    if (operandStack.length > 1){ 
        let num1 = operandStack.pop();
        let num2 = operandStack.pop();
        operandStack.push(num1);
        operandStack.push(num2);
        updateVisualStack();
    }
});

var sqrtButton = document.getElementById("sqrtButton");
sqrtButton.addEventListener("click", () => {

    if (tempOperand != ""){
        checkTempOperand();
    } 
    if (operandStack.length > 0){
        let result = calculator.squareRoot(operandStack.pop());
        addOperand(result);
        updateVisualStack();
    }
});

var oneOverX = document.getElementById("oneOverX");
oneOverX.addEventListener("click", () => {

    if (tempOperand != ""){
        checkTempOperand();
    } 
    if (operandStack.length > 0){
        let result = calculator.oneOverX(operandStack.pop());
        addOperand(result);
        updateVisualStack();
    }
});

var chsButton = document.getElementById("chsButton");
chsButton.addEventListener("click", () => {
    if (tempOperand.indexOf('-') > -1){
        tempOperand = tempOperand.slice(1);
        updateVisualStack();
    }
    else{
        tempOperand = "-" + tempOperand;
        updateVisualStack();
    }
    

});

var clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", () => {
    if (tempOperand != ""){
        tempOperand = "";
    }
    else{
        operandStack.pop();
    }
    updateVisualStack();
});
