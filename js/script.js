const container = document.querySelector('.container');
const changeSizeBtn = document.querySelector('.size-choice');
const colorButtons = document.querySelectorAll('.color-choice');
const btnClear = document.querySelector('.clear');
const inputSize = document.querySelector('.slider');
const userColorPicker = document.querySelector('#input-color ');

let color = 'blue';
let userInput;

// Создаём сетку

function createGrid (gridNumber) {
    let gridArea = gridNumber * gridNumber;

    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        container.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
        container.insertAdjacentElement('beforeend', gridItem);
    }

    let gridPixel = container.querySelectorAll('div');

    gridPixel.forEach(gridPixel  => {
        gridPixel.style.border = '1px solid lightgray';
        gridPixel.addEventListener('mouseover', gridColor);
    });

    // Сбрасываем цвета
    btnClear.addEventListener('click', () => gridPixel.forEach(pixel => pixel.style.backgroundColor = 'white'));

}


// Меняем цвет по наведению

function gridColor () {
    switch (color) {
        case 'black':
            this.style.backgroundColor = 'black';
            break;
        case 'gray': 
            this.style.backgroundColor = 'gray';
            break;
        case 'rainbow': 
            this.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            break;
        case 'eraser': 
            this.style.backgroundColor = '#ffffff';
            break;
        default:
            this.style.backgroundColor = color;
            break;
    }
}

function changeColor (event) {
    switch (event.target.dataset.color) {
        case 'black': 
            color = 'black';
            break;
        case 'gray':
            color = 'gray';
            break;
        case 'rainbow':
            color = 'rainbow';
            break;
        case 'eraser':
            color = 'white';
            break;
    }

}

// Назначаем дефолтный цвет

function defaultColor () {
    switch (color) {
        default:
            this.style.backgroundColor = 'white';
            this.classList.remove('gray');
            break;
    }
}

// Изменяем размер сетки

function changeSize () {
    let userInput = prompt('Укажите размер сетки в диапазоне от 1 до 100', '');
    if (userInput === '' || isNaN(userInput) || userInput > 100) {
        alert('Было введено не верное значение, попробуйте еще раз');
        changeSize();
    } else {
        container.innerHTML = '';
        createGrid(userInput);
    }
}


// Выбор цвета пользователем

function userColorSelect (event) {
    color = event.target.value;
}

// Обработчики событий

changeSizeBtn.addEventListener('click', changeSize);
userColorPicker.addEventListener('change', userColorSelect);
colorButtons.forEach(element => element.addEventListener('click', changeColor));

inputSize.addEventListener('change', () => {
    container.innerHTML = '';
    createGrid(inputSize.value);
});


createGrid(16);