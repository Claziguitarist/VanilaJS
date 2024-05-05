const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list");
const doneList = document.querySelector("#done-list");
const didIt = document.querySelector(".right-square h1:first-child");

const TODOS_KEY = "todos";
const DONELIST_KEY = "donelist";

let toDos = [];
let doneStuff = [];

function saveToDos()
{
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function saveDoneList()
{
    localStorage.setItem(DONELIST_KEY, JSON.stringify(doneStuff));
}

function handleToDoSubmit(event)
{
    event.preventDefault();
    const newToDo = toDoInput.value;
    toDoInput.value = "";
    const newToDoObj =
    {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newToDoObj);
    printToDo(newToDoObj);
    saveToDos();
}

function handleCheck(event)
{
    event.preventDefault();
    const checkBox = event.target;
    const li = checkBox.parentElement;
    const toDoId = parseInt(li.id);

    const toDoIndex = toDos.findIndex(toDo => toDo.id === toDoId);
    if(toDoIndex !== -1)
        {
            const toDo = toDos.splice(toDoIndex, 1)[0];
            doneStuff.push(toDo);
            saveToDos();
            saveDoneList();
            printDoneList();
        }

}

function deleteTodo(event)
{
    const li = event.target.parentElement;
    li.remove();
 // Checks if the todo item is moved to the done list
    const movedToDo = toDos.find((toDo) => toDo.id === parseInt(li.id));
    if (movedToDo)  // If moved, add it to the doneList
        {
            let doneList = JSON.parse(localStorage.getItem(DONELIST_KEY)) || [];
            doneList.push(movedToDo);
            localStorage.setItem(DONELIST_KEY, JSON.stringify(doneList));
        }
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
    
}

function printToDo(newToDo)
{
    const li = document.createElement("li");
    li.id = newToDo.id;
    const span = document.createElement("span");
    span.innerText = newToDo.text;
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.addEventListener("change", handleCheck);
    li.appendChild(checkBox);
    li.appendChild(span);
    toDoList.appendChild(li);
}


function printDoneList()
{
    didIt.innerText = "Things you've done:"
    doneList.innerHTML = "";
    doneStuff.forEach(doneItem => 
        {
            const li = document.createElement("li");
            li.innerText = doneItem.text;
            const checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.checked = true;
            li.appendChild(checkBox);
            doneList.appendChild(li);
    
        });
}


toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
const savedDoneList = localStorage.getItem(DONELIST_KEY);

if(savedToDos !== null)
    {
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(printToDo);
    }

if(savedDoneList !== null)
    {
        doneStuff = JSON.parse(savedDoneList);
        printDoneList();
    }
