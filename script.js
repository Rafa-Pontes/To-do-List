const localStoragekey = 'to-do-list-rp';

function validateIfExistsNewTask(newTask){
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]");
    let exists = values.find(item => item.task === newTask);
    return !exists;
}
document.querySelector('#btn-add-task').addEventListener('click' , function() {
    let inputField = document.getElementById('input-new-task');
    inputField.style.border = '';
    if(!inputField.value){
        inputField.style.border = '1px solid red';
        alert("Please enter a task.");
    } else if (!validateIfExistsNewTask(inputField.value)) {
        inputField.style.border = '1px solid red';
        alert("Task already exists.");
    } else {
        let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]");
        values.push({
            task: inputField.value,
        });
        localStorage.setItem(localStoragekey , JSON.stringify(values));
        LoadTasks();
    }
    inputField.value = ''; 
});

function LoadTasks(){
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['task']} <button id='btn-ok' onclick='removeItem(${i})'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
        </svg></button> </li>`;
    }
}
function removeItem(index){
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]");
    values.splice(index, 1);
    localStorage.setItem(localStoragekey , JSON.stringify(values));
    LoadTasks();
}
LoadTasks();