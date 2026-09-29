import {MiniMaple} from './miniMaple';

const input = document.getElementById('expression');
const result = document.getElementById('result');
const miniMaple = new MiniMaple();

document.getElementById('diffButton').onclick = () => {
    const [expression, variable] = input.value.split(',').map(value => value.trim());

    try {
        result.textContent = miniMaple.diff(expression, variable);
    } catch (error) {
        result.textContent = error.message;
    }
};
