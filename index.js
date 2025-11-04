

let users =JSON.parse(localStorage.getItem('users')) || []

let nameInput = document.getElementById('nameInput')
let emailInput = document.getElementById('emailInput')
let addTask = document.getElementById('submitBtn')
let tableBody = document.getElementById('tableBody')

let editIndex = null
let isEditing =false
addTask.addEventListener('click',()=>{
    if(isEditing && editIndex !== null){
        users[editIndex].name = nameInput.value;
        users[editIndex].email = emailInput.value;
         isEditing = false;
         editIndex = null;
    addTask.textContent = "Add Task";
    }
    else{
        let newId =users.length > 0 ? users[users.length - 1].id +1 :1
    let task ={
            id:newId,
            name:nameInput.value,
            email:emailInput.value
        }
       users.push(task)

       localStorage.setItem('users',JSON.stringify(users))
    }
   
    nameInput.value =""
    emailInput.value =""
    tableBody.innerHTML =""
    console.log(users)
    renderUsers()
})

function renderUsers(){
    tableBody.innerHTML=""
    users.forEach((user,index)=>{
       let line = document.createElement('tr')
       line.innerHTML =`
       <td>${user.id}</td>
       <td>${user.name}</td>
       <td>${user.email}</td>
       <td>
          <button id="edit" data-id=${index} style="background-color: blue; color: white; padding: 8px 10px; border-radius: 5px;">Edit</button>
          <button id="delete" data-id=${index} style="background-color: red; color: white; padding: 5-8px 10px; border-radius: 5px;">Delete</button>
       </td>`
       tableBody.appendChild(line)
    })

    let editBtn = document.querySelectorAll('#edit')
    let deleteBtn = document.querySelectorAll('#delete')
    
    deleteBtn.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
             let index = e.currentTarget.getAttribute('data-id')
             users.splice(index,1)
       localStorage.setItem('users',JSON.stringify(users))

             console.log(users)
             renderUsers()
        })
    })

   editBtn.forEach((btn)=>{
       btn.addEventListener('click',(e)=>{
             let index = e.currentTarget.getAttribute('data-id')
             let user = users[index]
             if(user){
                 nameInput.value = user.name
                  emailInput.value = user.email
                isEditing =true
                editIndex=index
                addTask.textContent = 'Update Task'
       localStorage.setItem('users',JSON.stringify(users))

                renderUsers()
             }
       })
   })
}
renderUsers()
