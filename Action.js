window.onload = function () {
    let btnAdd = document.getElementById("btnAdd")
    let btnSort = document.getElementById("btnSort")
    let btnClear = document.getElementById("btnClr")
    let taskList = document.getElementById("tasklist")
    let inpNewtask = document.getElementById("inpTask")

   let tasks = []
   if (sessionStorage.list) {
       tasks = JSON.parse(sessionStorage.list)
   } 

   function refreshList () {
       sessionStorage.list = JSON.stringify(tasks)
       taskList.innerHTML = ""
       for (let i in tasks) {
        let task = tasks[i]
        let li = document.createElement("li")
        li.className = "list-group-item"
        let div = document.createElement("div")
        div.className = task.done ? "row done":"row"
        let span = document.createElement("span")
        span.className = "col py-1"
        span.innerText = task.name
        let libtndone = document.createElement("button")
        libtndone.innerText = task.done ? "❌" : "✔️"
        libtndone.className = task.done ? "btn btn-danger mx-1" : "btn btn-success mx-1"
        let libtndel = document.createElement("button")
        libtndel.innerText = "DELETE"
        libtndel.className = "btn btn-danger mx-1"
        let libtnup = document.createElement("button")
        libtnup.innerText = "☝️"
        libtnup.className = "btn btn-warning mx-1"
        let libtndown = document.createElement("button")
        libtndown.innerText = "👇"
        libtndown.className = "btn btn-warning mx-1"

        libtndone.onclick = function() {
            task.done = !task.done
            refreshList()
        }

        libtndel.onclick = function() {
            tasks.splice(i,1)
            refreshList()
        }

        libtnup.onclick = function() {
            task.priority++
            refreshList()
        }

        libtndown.onclick = function() {
            task.priority--
            refreshList()
        }

        div.appendChild(span)
        div.appendChild(libtnup)
        div.appendChild(libtndown)
        div.appendChild(libtndone)
        div.appendChild(libtndel)

        li.appendChild(div)
        taskList.appendChild(li)
       }
   }

   refreshList()

   function sortList() {
       tasks.sort(function (a,b){
           return a.done - b.done
       })
       refreshList()
   }

   function clearList() {
       tasks = tasks.filter(function (t){
           return !t.done
       })
       refreshList()
   }

   function addTask () {
       let taskName = inpNewtask.value
       tasks.push({
               name: taskName,
               done: false,
               priority: 0
           })
       inpNewtask.value = ""
       refreshList()
    }

    btnAdd.onclick = function () {
        addTask()
    }

    inpNewtask.onkeyup = function (ev) {
        if(ev.keyCode == 13)
        {
            addTask()
        }
    }

    btnSort.onclick = function () {
        sortList()
    }

    btnClr.onclick = function () {
        clearList()
    }

}