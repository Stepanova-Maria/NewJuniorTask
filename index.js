let addButton = document.getElementById('add')    
let inputTask = document.getElementById('new-task')
let inputSearch = document.getElementById('search')
let unfinishedTasks = document.getElementById('unfinished-tasks') 
let prior = document.getElementById('priority')
let NewTodoArr = [];
let index = 0;
let count = 0;
let priority;

function addTask () {
    if (inputTask.value === ''){
        return alert ('Введите текст задачи!') 
    }
    
    let NewTodo = {
        text: inputTask.value, 
        priority: prior.value,
        date: new Date().toLocaleString()
    }
    NewTodoArr.push(NewTodo);   //добавляет элемент в начало массива и возвращает новую длину
    saveTask(NewTodo);
    inputTask.value = '';  //обнулим значение строки

}    

function swap(task) { 
    switch (task.priority) {
        case 'under':
            priority = `<font color="red">низкий</font>`;
            break;

        case 'middle':
            priority = `<font color="blue">средний</font>`;
            break;
              
        case 'high':
            priority = `<font color="green">высокий</font>`;
            break;
    } 
} 

function saveTask (task) {
    swap(task); 
    console.log(task);
    let div = document.createElement("div");
    div.classList.add('tasks');
    div.id = count++;
    div.innerHTML = `
    <li class = "priors"> ${priority}</li>
    <li class = "text"> ${task.text}   
    <br> ${task.date}</li> 
    <i class= 'material-icons checkbox' onclick="activeTask(${task})">checkbox</i>
    <i class= 'material-icons close'>close</i> 
    <i class= 'material-icons delete' id="${index}" onclick = "deleteTask(${div.id})">delete</i>`
    unfinishedTasks.appendChild(div);
}    


function deleteTask(id) {
    let del = document.querySelectorAll('.tasks');
    //let del = document.getElementById('div.id')
    NewTodoArr.splice(id, 1);
    del[id].remove();
    //NewTodoArr.forEach((task, id) => {
       // NewTodoArr.splice(id,1) //начиная с элемента с индексом i  удаляем 1 элемент
    //})
    //saveTask(task)
    if (NewTodoArr.length === 0) unfinishedTasks.innerHTML = ''; //если массив пустой, то удаляем и из визуала
    console.log(NewTodoArr);   
}

//function activeTask(task) {
    //let del = document.querySelectorAll('.text');
    //let del = document.getElementById('div.id')
     //console.log(del)
     //document.text.style.backgroundCollor = '#ff0000'
     //del.style.backgroundCollor  === "red"
    // del.style.color === 'red'
     //del = `<font color="red"></font>`;
//}

document.querySelector('#search').oninput = function() {
    let search = this.value.trim();  //удаляет пробелы с начала и конца строки
    let ArrFilter = NewTodoArr.filter((task) => task.text.includes(search));  //создаем новый массив, значение которого равно отфильтрованному старому массиву 
                                                                         //фильтрация осуществляется по поиску в старом массиве введенного элемента
    if (search != '') {
        ArrFilter.forEach((task) => {
            unfinishedTasks.innerHTML = ''
            saveTask(task) 
        })
    }else {
        NewTodoArr.forEach((task) => {
            unfinishedTasks.innerHTML = ''
            saveTask(task) 
        })
    }
    //for (let i=0; i<search.length; i++) {
        //saveTask(ArrFilter)
    //}   
   // } else {
       // saveTask(NewTodoArr[i]);
    //}

}

function priorsFiltr() {
    let select = document.getElementById('filters')
    let getValue = select.value;
    switch (getValue) {
        case 'filter-any':
            console.log('любой');
            break;

        case 'filter-under':
            let ArrFilterUnder = NewTodoArr.filter((task) => task.priority.includes('under'))   //создаем новый массив, значение которого равно отфильтрованному старому массиву
                                                                                                //фильтрация происходит по наличию в приоритете значения "низкий"
            // ArrFilterUnder.forEach((task) => {
            // unfinishedTasks.innerHTML = ''
            // saveTask(task) 
            // })
            console.log(ArrFilterUnder);
            break;
              
        case 'filter-middle':
            let ArrFilterMiddle = NewTodoArr.filter((task) => task.priority.includes('middle'))
            console.log(ArrFilterMiddle);
            break;

        case 'filter-high':
            let ArrFilterHigh = NewTodoArr.filter((task) => task.priority.includes('high'))
            console.log(ArrFilterHigh);
            break;
    } 
    
}

function sortDate() {
    let getValueDate = document.getElementById('sort-date').value;
    switch (getValueDate) {
        case 'date-increase':
            NewTodoArr.sort(function(a, b) {
                return b.date>a.date ? -1 : b.date<a.date ? 1 : 0; 
            });
            console.log('по возрастанию');
            console.log(NewTodoArr);
            break;

        case 'date-decrease':
            NewTodoArr.sort(function(a, b) {
                return a.date>b.date ? -1 : a.date<b.date ? 1 : 0;
            });
            console.log('по убыванию');
            console.log(NewTodoArr);
            break;
            
    } 
}

function sortPrior() {
    let getValuePriority = document.getElementById('sort-priority').value;
    if (getValuePriority === 'priorit-increase') {
            NewTodoArr.sort(function(a, b) {
                return a.priority>b.priority ? -1 : a.priority<b.priority ? 1 : 0; 
            });
        console.log('по возрастанию');
        console.log(NewTodoArr)
    }else if(getValuePriority === 'priorit-decrease'){    
            NewTodoArr.sort(function(a, b) {
                return b.priority>a.priority ? -1 : b.priority<a.priority ? 1 : 0;
            });
        console.log('по убыванию');
        console.log(NewTodoArr)    
    } 
}

