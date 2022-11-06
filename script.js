const taskForm = document.getElementById('new-task')
const inputName = document.getElementById('inputName')
const inputDesc = document.getElementById('inputDesc')
const inputDate = document.getElementById('inputDate')
const taskContainer = document.getElementById('task-container')
const selectSorting = document.getElementById('sorting')
const selectFiltering = document.getElementById('filtering')

//let lsTasks = localStorage.getItem('Tasks');

const taskList = []
const taskList1 = []

let baseId = 0

// console.log(JSON.parse(lsTasks)[0])

// JSON.parse(lsTasks).forEach((test) => {
// 	console.log(test)
// })
// window.addEventListener('load', () => {
//     lsTasks = localStorage.getItem('Tasks');
// })

const sortFunction = (a,b) => {
    let dateA = new Date(a.due_date).getTime()
    let dateB = new Date(b.due_date).getTime()
    return dateA > dateB ? 1 : -1;
}

const generateTask = (taskData) => {
    console.log(taskData)
    const taskCard = document.createElement('div')
    const taskContent = document.createElement('div')
    const taskDelete =  document.createElement('div')
    const taskHeader = document.createElement('div')
    const taskTitle = document.createElement('h3')
    const line = document.createElement('hr')
    const taskDesc = document.createElement('p')
    const taskSelect = document.createElement('select')
    const optionTodo = new Option('todo', 'todo')
    const optionDoing = new Option('doing', 'doing')
    const optionDone = new Option('done', 'done')
    
    taskSelect.add(optionTodo, undefined)
    taskSelect.add(optionDoing, undefined)
    taskSelect.add(optionDone, undefined)

    taskSelect.value = taskData.status

    taskSelect.addEventListener('change', (event) => {
        // Change the value in the array
        taskToUpdate = taskList.filter(obj =>  obj.taskId === taskData.taskId )
		let i = taskList.indexOf(taskToUpdate[0])
		taskList[i].status = event.target.value
        // localStorage.setItem('Tasks', JSON.stringify(taskList));
    })

    taskCard.classList.add('task')
    taskContent.classList.add('taskContent')
    taskDelete.innerText = "X"
    taskDelete.classList.add("delete")
    taskDelete.addEventListener('click', (event) => {
        event.target.parentNode.remove()
        // localStorage.setItem('Tasks', JSON.stringify(taskList));
    })
   
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const firstDate = new Date();
	const secondDate = new Date(taskData.due_date);

	const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));

    taskHeader.innerText = `In ${diffDays} days`
    taskContent.append(taskHeader, taskTitle, line, taskDesc, taskSelect)

    taskTitle.innerText = taskData.title
    taskDesc.innerText = taskData.description

    taskCard.append(taskContent, taskDelete)
    taskContainer.append(taskCard)

    // localStorage.setItem('Tasks', JSON.stringify(taskList));
}
console.log()

const generateCards = (cardsData) => {
	console.log(cardsData)
    cardsData.forEach((card) => {
        generateTask(card)
    })
	// for (var i = 0; i < cardsData.length; i++) {
	// 	console.log("test")
	// 	generateTask(cardsData[i])
	// }
}

//const lsTasks = localStorage.getItem('Tasks');

// generateCards(JSON.parse(lsTasks))

taskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let formData = Object.fromEntries(new FormData(taskForm))
    formData.status = "todo"
    formData.taskId = baseId
	baseId ++
    
    taskContainer.innerHTML = ""
    taskList.push(formData)
    taskList1.push(formData)
    
    // localStorage.setItem('Tasks', JSON.stringify(taskList));
    generateCards(taskList)
    inputName.value = ""
    inputDesc.value = ""
    inputDate.value = ""      
})

selectSorting.addEventListener('change', (event) => {
    if(event.target.value === "urgent"){
        taskContainer.innerHTML = ""
		generateCards(taskList.sort(sortFunction))
    }
    else if(event.target.value === "name"){
        taskContainer.innerHTML = ""
        let sortingName = taskList.sort((a, b) => a.title.localeCompare(b.title))
		generateCards(sortingName)
    }
    else if(event.target.value === "sort"){
        taskContainer.innerHTML = ""
        generateCards(taskList1)
    }
})

selectFiltering.addEventListener('change', (event) => {
    if(event.target.value === "todo"){
        taskContainer.innerHTML = ""
        generateCards(taskList.filter(obj => obj.status === "todo"))
    }
    else if(event.target.value === "doing"){
        taskContainer.innerHTML = ""
        generateCards(taskList.filter(obj => obj.status === "doing"))
    }
    else if(event.target.value === "done"){
        taskContainer.innerHTML = ""
        generateCards(taskList.filter(obj => obj.status === "done"))
    }
    else {
        taskContainer.innerHTML = ""
		generateCards(taskList1)
    }
})
