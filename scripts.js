"use strict";
let tbody = document.getElementById('tbody');
let inp = document.getElementById('inp');
let form = document.getElementById('form');
let clearBtn = document.getElementById('clear');
let returnTextVal = () => {
    return inp.value;
};
let handleSubmit = (e) => {
    e.preventDefault();
    let task = returnTextVal();
    if (!task) {
        alert('Please fill out the task field');
    }
    else {
        if (!localStorage.getItem('tasks')) {
            let newArr = [];
            newArr.push(task);
            localStorage.setItem('tasks', JSON.stringify(newArr));
            populateData();
        }
        else {
            let todos = JSON.parse(localStorage.getItem('tasks'));
            todos.push(task);
            localStorage.setItem('tasks', JSON.stringify(todos));
            populateData();
        }
    }
};
form.onsubmit = handleSubmit;
let populateData = () => {
    let todos = localStorage.getItem('tasks');
    let parsed = JSON.parse(todos);
    if (!parsed || parsed.length === 0) {
        tbody.innerHTML = `
        <tr>
        <td>
            1
        </td>
        <td>
            No tasks
        </td>
        <td class="table">
            <div class="i" style = "color:gray">
                <i class="far fa-trash-alt"></i>
            </div>
        </td>
    </tr>
        `;
    }
    else {
        let content = "";
        parsed.forEach((todo, index) => {
            content += `
            <tr>
            <td>
                ${index + 1}
            </td>
            <td>
                ${todo}
            </td>
            <td class="table">
                <div class="i" onclick = "deleteTodos(${index})">
                    <i class="far fa-trash-alt"></i>
                </div>
            </td>
        </tr>
            `;
        });
        tbody.innerHTML = content;
    }
};
document.addEventListener('DOMContentLoaded', populateData);
let clearTodos = () => {
    localStorage.setItem('tasks', JSON.stringify([]));
    populateData();
};
clearBtn.addEventListener('click', clearTodos);
let deleteTodos = (index) => {
    let tasks = localStorage.getItem('tasks');
    let todos = JSON.parse(tasks);
    console.log(todos);
    todos.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(todos));
    populateData();
};
let initialFunctionRun = () => {
    if (!localStorage.getItem('name')) {
        let name = prompt('What is your name');
        if (name === '') {
            initialFunctionRun();
        }
        else {
            localStorage.setItem('name', name);
            document.getElementById('name').innerText = `Whats up ${name}. What are your upcoming tasks?`;
        }
    }
    else {
        document.getElementById('name').innerText = `Whats up ${localStorage.getItem('name')}. What are your upcoming tasks?`;
    }
};
initialFunctionRun();
