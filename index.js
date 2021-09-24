function loadData(){
  return JSON.parse(localStorage.getItem('dataUser'));
}

function saveData(data){
  return localStorage.setItem('dataUser', JSON.stringify(data))
}

function initialize(){
  const data = {
    name : document.getElementById("name").value,
    salary : document.getElementById("salary").value,
    categories : [
      { 
        id: 1,
        name: 'Makanan dan minuman',
        amount: 0,
        budget: 0
      }
      ,{ 
        id: 2,
        name: 'Belanja',
        amount: 0,
        budget: 0
      }
      ,{ 
        id: 3,
        name: 'Kebutuhan rumah tangga',
        amount: 0,
        budget: 0
      }
      ,{ 
        id: 4,
        name: 'Hiburan',
        amount: 0,
        budget: 0
      }
      ,{ 
        id: 5,
        name: 'Transportasi',
        amount: 0,
        budget: 0
      }
      ,{ 
        id: 6,
        name: 'Tagihan bulanan',
        amount: 0,
        budget: 0
      }
      ,{ 
        id: 7,
        name: 'Lainnya, bikin kategori baru',
        amount: 0,
        budget: 0
      }
    ],
    expenses: []
  }

  return saveData(data)
}

/**
 * EXPENSES OPERATIONS
 * @returns 
 */
function createExpense(){
  const data = loadData()
  let id = 1

  if (data.expenses.slice(-1)[0]) id = data.expenses.slice(-1)[0].id + 1

  if (document.getElementById("amount").value && document.getElementById("category").value && document.getElementById("date").value) {
    data.expenses.push({
      id,
      amount: Number(document.getElementById("amount").value),
      categoryId: Number(document.getElementById("category").value),
      note: document.getElementById("notes").value,
      date: document.getElementById("date").value
    })
  }

  return saveData(data)
}

function editExpense(id){
  const dataUser = loadData()
  let expense = ''
  
  for (let i = 0; i < dataUser.expenses.length; i++) {
    if (dataUser.expenses[i].id === id) {
      expense = dataUser.expenses[i]
    }   
  }

  document.querySelector('#main-content').remove()
  document.querySelector('#menu').remove()

  let homeContent = document.createElement("div");
  homeContent.className = 'pt-5 px-5'

    // <button type="button" class="btn btn-outline-dark float-end" onclick="listCategories()">Close</button>
  let expenseForm = `
    <form class="m-auto mt-5">
      <div class="mb-3">
        <label for="amount" class="form-label">Amount :</label>
        <input type="number" class="form-control" id="amount" placeholder="100000" value="${expense.amount}">
      </div>
      <button type="submit" class="btn btn-primary" onclick="saveEditCategori(${expense.id})">Submit</button>
      <button type="submit" class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
    </form>
    `
  homeContent.innerHTML = expenseForm

  document.querySelector('#content').appendChild(homeContent)
}

function deleteExpense(id){
  const data = loadData()
  
  removedId = data.expenses.filter(function(value){ 
    return value.id !== id
  });

  data.expenses = removedId

  return saveData(data)
}

function loadCreateExpenseForm(){
  const data = loadData()

  document.querySelector('#main-content').remove()
  document.querySelector('#menu').remove()

  let homeContent = document.createElement("div");
  homeContent.className = 'pt-5 px-5'

  let expenseForm = `

    <a href="/Dompetin" class="text-decoration-none">
      <button type="button" class="btn btn-outline-dark float-end">Close</button>
    </a>
    <form class="m-auto mt-5">
      <div class="mb-3">
        <label for="amount" class="form-label">Amount :</label>
        <input type="number" class="form-control" id="amount" placeholder="100000">
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category :</label>
        <select name="category" id="category" class="form-select" >`
        for (let i = 0; i < data.categories.length; i++) {
          expenseForm += `<option value="${data.categories[i].id}">${data.categories[i].name}</option>`
        }
        expenseForm +=`</select>
      </div>
      <div class="mb-3">
        <label for="notes" class="form-label">Notes :</label>
        <input type="text" class="form-control" id="notes">
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Date :</label>
        <input type="date" class="form-control" id="date">
      </div>
      <button type="submit" class="btn btn-primary" onclick="createExpense()">Submit</button>
    </form>
    `

  homeContent.innerHTML = expenseForm

  document.querySelector('#content').appendChild(homeContent);
}

function listExpensesByCategory(categoryId) {
  const dataUser = loadData()

  document.querySelector('#main-content').innerHTML = ''

  for (let i = 0; i < dataUser.expenses.length; i++) {
    if (dataUser.expenses[i].categoryId === categoryId) {
     let homeContent = document.createElement("div")
     homeContent.innerHTML = `
     <div class="card shadow-sm m-2 my-3" onclick="editExpense(${dataUser.expenses[i].id})">
      <div class="card-body d-flex justify-content-between p-4">
        <div> 
          <h6 class="card-subtitle">${dataUser.expenses[i].note}</h6>
          <p class="card-text">Rp. ${Intl.NumberFormat('id-ID').format(dataUser.expenses[i].amount)}</p>
        </div>
        <p class="card-text">${dataUser.expenses[i].date}</p>
      </div>
       `
    document.querySelector('#main-content').appendChild(homeContent)
    }
  }
}

function listCategories() {
  const dataUser = loadData()

  if (!document.querySelector('#main-content')) {
    let homeContent = document.createElement("div")
    homeContent.id = 'main-content'
    homeContent.className = 'container flex-grow-1 overflow-auto'

    document.querySelector('#content').innerHTML = ''
    document.querySelector('#content').appendChild(homeContent);
    document.querySelector('#main-content').after(displayMainMenuCOnten())

  }

  document.querySelector('#main-content').innerHTML = '<h4 class="p-4 text-center">Daftar Kategori</h4>'

  for (let i = 0; i < dataUser.categories.length; i++) {
    let homeContent = document.createElement("div")
    homeContent.innerHTML = `
    <div class="card shadow-sm m-2 my-3" onclick="editCategoriForm(${dataUser.categories[i].id})">
      <div class="card-body d-flex justify-content-between p-4">
        <div> 
          <h6 class="card-subtitle">${dataUser.categories[i].name}</h6>
          </div>
        <p class="card-text">Rp. ${Intl.NumberFormat('id-ID').format(dataUser.categories[i].budget)}</p>
      </div>
       `

    document.querySelector('#main-content').appendChild(homeContent)
  }
}

function editCategoriForm(id) {
  const dataUser = loadData()
  let category = ''
  
  for (let i = 0; i < dataUser.categories.length; i++) {
    if (dataUser.categories[i].id === id) {
      category = dataUser.categories[i]
    }   
  }

  document.querySelector('#main-content').remove()
  document.querySelector('#menu').remove()

  let homeContent = document.createElement("div");
  homeContent.className = 'pt-5 px-5'

  let expenseForm = `
    <button type="button" class="btn btn-outline-dark float-end" onclick="listCategories()">Close</button>
    <form class="m-auto mt-5">
      <div class="mb-3">
        <label for="amount" class="form-label">Amount :</label>
        <input type="number" class="form-control" id="amount" placeholder="100000" value="${category.budget}">
      </div>
      <button type="submit" class="btn btn-primary" onclick="saveEditCategori(${category.id})">Submit</button>
    </form>
    `
  homeContent.innerHTML = expenseForm

  document.querySelector('#content').appendChild(homeContent)
}

function saveEditCategori(id) {
  const dataUser = loadData()
  let categories = dataUser.categories

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].id === id) {
      categories[i].budget = Number(document.getElementById("amount").value) 
    }
  }

  return saveData(dataUser)
}

function displayMainMenuCOnten() {
  
    /**
     * Add main menu
     */
     let mainMenu = document.createElement("div")
     mainMenu.id = 'menu'
     mainMenu.className = 'border-top'
 
     mainMenu.innerHTML = `
       <ul class="list-group list-group-flush flex-row justify-content-around py-3 px-2">
         <a href="/Dompetin" class="text-decoration-none">
           <li class="list-group-item border rounded-2 p-3">Home</li>
         </a>
         <li class="list-group-item border rounded-2 p-3" onclick="loadCreateExpenseForm()">Tambah Pengeluaran</li>
         <li class="list-group-item border rounded-2 p-3" onclick="listCategories()">Kategori</li>
       </ul>`

    return mainMenu
 
}


/** END EXPENSES */

function displayHomeContent(dataUser){

    /**
     * PROFIL CARD
     */
     let homeContent = document.createElement("div")
     homeContent.id = 'profil-card'
     homeContent.innerHTML = `
      <div class="card card m-2 mb-5 my-4 shadow-lg" style="border-radius:14px;">
        <div class="card-body">
          <h1>nama ${dataUser.name}</h1>
          <h1>nama ${dataUser.salary}</h1>
        </div>
      </div>
       `
     
    /**
     * CATEGORY CARD
     */
    let homeCategoriesContent = document.createElement("div")
    homeCategoriesContent.id = 'category-card'
    homeCategoriesContent.innerHTML += `<h5 class="mb-0 mx-2">Daftar Pengeluaran</h5>`
    
    const filteredExpensesByCategory = filterExpensesByCategory(dataUser.expenses, dataUser.categories)
    
    if (filteredExpensesByCategory.length) {
      for (let i = 0; i < filteredExpensesByCategory.length; i++) {
        let exceed = false, percentage = 0


        if(filteredExpensesByCategory[i].budget > 0 && filteredExpensesByCategory[i].budget < filteredExpensesByCategory[i].amount){
          percentage = 100
          exceed = true
        } else {
          percentage = Math.floor((filteredExpensesByCategory[i].amount / filteredExpensesByCategory[i].budget) * 100)
        }

        homeCategoriesContent.innerHTML += `
        <div class="card shadow-sm m-2 my-4" onclick="listExpensesByCategory(${filteredExpensesByCategory[i].id})">
          <div class="card-body d-flex p-4">
            <div> 
              <h6 class="card-subtitle">${filteredExpensesByCategory[i].name}</h6>
              <p class="card-text text-muted">${filteredExpensesByCategory[i].totalTransaksi} Transaksi</p>
            </div>
            <div class="flex-grow-1 text-end my-auto">
              ${exceed ? `<small class="text-danger">exceed</small>` : `` }
              <h5 class="card-subtitle ${exceed ? `text-danger ` : `` }">Rp. ${Intl.NumberFormat('id-ID').format(filteredExpensesByCategory[i].amount)}</h5>
              <small class="text-muted ${exceed ? `text-danger ` : `` }">dari Rp. ${Intl.NumberFormat('id-ID').format(filteredExpensesByCategory[i].budget)}</small>
            </div>
        </div>
        <div class="progress" style="height: 2px;">
          <div class="progress-bar" role="progressbar" style="width: ${Intl.NumberFormat('id-ID').format(percentage)}%;" aria-valuenow="${Intl.NumberFormat('id-ID').format(percentage)}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
       </div>
       `
     }
    }

    document.querySelector('#main-content').appendChild(homeContent)
    document.querySelector('#main-content').appendChild(homeCategoriesContent)
    document.querySelector('#main-content').after(displayMainMenuCOnten())
}


function homeButton() {
  document.querySelector('#main-content').innerHTML = ''
  displayHomeContent()
}


/**
 * END EXPENSES OPERATIONS
 */

function filterExpensesByCategory(expenses, categories){
  for (let i = 0; i < categories.length; i++) {
    let counter = 0
    for (let j = 0; j < expenses.length; j++) {
      if(categories[i].id === expenses[j].categoryId){
        categories[i].amount += expenses[j].amount
        counter++
      }
    }
    categories[i].totalTransaksi = counter
  }
  return categories.filter(function(value){ 
    return value.amount > 0
  });
}



function render(){
  // Ambil data User dari local storage
  const dataUser = loadData()

  // Jika Ada
  if (dataUser) {
    /**
     * Delete semua konten HTML di dalam <body>
     * Replace dengan konten HOME.
     */
    document.querySelector('#login').remove()
    displayHomeContent(dataUser)

  } 
}

render()