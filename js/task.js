const addTask= document.querySelector("#addTask")
const taskWrap = document.querySelector("#taskWrap")
const singleWrap= document.querySelector("#singleWrap")
const editForm= document.querySelector("#editForm")
const taskTitleInput =document.getElementById("taskTitle")
const taskContentInput = document.getElementById("taskContent")
const descriptionInput =document.getElementById("description")
const taskHeads = [
    {key: "id", default:Date.now()},
    {key: "status", default:false},
    {key: "taskTitle", default:null},
    {key: "taskContent", default:null},
    {key: "description", default:null},
    ]
const addFun = (e)=>{
    e.preventDefault()
    const allTasks = readFromStorage()
    const data = { }
    taskHeads.forEach(head=> {
        if(head.default == null) data[head.key] = addTask.elements[head.key].value
        else data[head.key] = head.default
    })
    allTasks.push(data)
    writeToStorage(allTasks)
    addTask.reset()
    window.location.href = "index.html"
}
const editFun = (e)=>{
    e.preventDefault()
    const allTasks = readFromStorage()
    const i = readFromStorage("editIndex", "string")
    const data = { }
    taskHeads.forEach(head=> {
        if(head.default == null) data[head.key] = editForm.elements[head.key].value
        else data[head.key] = head.default
    })
    allTasks.splice(i,1,data)
    writeToStorage(allTasks)
    editForm.reset()
    window.location.href = "index.html"
}
const readFromStorage=(storageKey="tasks", option="array")=>{
    let data 
    try{
        data = localStorage.getItem(storageKey)
        if(option!="string")data = JSON.parse(data) ||[]
        if(!Array.isArray(data) && option=="array") throw new Error("invalid")
    }
    catch(e){
        data = []
    }
    return data
}
const writeToStorage = (data, storageKey="tasks") => localStorage.setItem(storageKey, JSON.stringify(data))

if(addTask) addTask.addEventListener( "submit", addFun )
const createMyOwnElement = (el, parent, classes, txt = null) =>{
    const myEle = document.createElement(el)
    parent.appendChild(myEle)
    myEle.classList = classes
    if(txt) myEle.textContent=txt
    return myEle
}
const deleteTask = (i, allTasks)=>{
    allTasks.splice(i,1)
    writeToStorage(allTasks)
    drawData(allTasks)
}
const changeStatus = (i, allTasks) =>{
    allTasks[i].status = !allTasks[i].status
    writeToStorage(allTasks)
    drawData(allTasks)
}
const singleTask = (i, allTasks)=>{
    writeToStorage(allTasks[i], "singleTask")
    writeToStorage(i, "singleIndex")
    window.location.href="single.html"
}
const editTask = (i, allTasks) =>{
    writeToStorage(allTasks[i], "editTask")
    writeToStorage(i, "editIndex")
    window.location.href="edit.html"
    
}

const drawSingleTask = (container , task, i, allTasks) =>{
    const d1 = createMyOwnElement("div", container,"col-4")
    let c
    if(task.status) c="p-2 border border-primary m-2 bg-primary"
    else c = "p-2 border border-primary m-2 bg-danger"
    const d2 = createMyOwnElement("div", d1, c)
    taskHeads.forEach(head=> createMyOwnElement("h3", d2, "", task[head.key]))
    const delBtn = createMyOwnElement("button", d2, "btn btn-danger m-2", "delete")
    const editBtn = createMyOwnElement("button", d2, "btn btn-warning m-2", "Edit")
    const showBtn = createMyOwnElement("button", d2, "btn btn-success m-2", "show")
    const statusBtn = createMyOwnElement("button", d2, "btn btn-primary m-2", "change status")
    delBtn.addEventListener("click", ()=>deleteTask(i, allTasks))
    editBtn.addEventListener("click", ()=> editTask(i,allTasks))
    statusBtn.addEventListener("click", ()=>changeStatus(i, allTasks))
    showBtn.addEventListener("click", ()=>singleTask(i, allTasks))
}
const drawData = (allTasks)=>{
    taskWrap.innerHTML=""
    allTasks.forEach((task, i)=> drawSingleTask(taskWrap,task, i, allTasks))
}
if(taskWrap){
    const allTasks = readFromStorage()
    drawData(allTasks)
}

if(singleWrap){
    const allTasks= readFromStorage()
    const singleTask=readFromStorage("singleTask", "object")
    const i = readFromStorage("singleIndex", "string")
    drawSingleTask(singleWrap,singleTask, i , allTasks)
}
if(editForm){
    const allTasks= readFromStorage()
    const editTask=readFromStorage("editTask", "object")
    const i = readFromStorage("editIndex", "string")
    taskTitleInput.value = allTasks[i].taskTitle;
    taskContentInput.value = allTasks[i].taskContent;
    descriptionInput.value = allTasks[i].description;
    editForm.addEventListener( "submit", editFun )
}
