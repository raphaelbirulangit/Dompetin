data = {
  name: 'Deris',
  salary: 10000000,
  categories: [
    {
      id: 1,
      name: 'Food & Drink',
      budget: 3000000,
    },
    {
      id: 2,
      name: 'Shopping',
      budget: 1000000,
    },
  ],
  expenses: [
    {
      id: 1,
      name: 'Makan Siang',
      amount: 20000,
      categoryId: 1,
      note: 'Makan Siang di cafe',
      createdAt: '17/4/2021',
    },
    {
      id: 2,
      name: 'Makan Malam',
      amount: 20000,
      categoryId: 1,
      note: 'Makan Malam di rumah',
      createdAt: '17/4/2021',
    }
  ]
}

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
        budget: 100000
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

  data.expenses.push({
    id,
    amount: Number(document.getElementById("amount").value),
    categoryId: Number(document.getElementById("category").value),
    note: document.getElementById("notes").value,
    date: document.getElementById("date").value
  })

  return saveData(data)
}

function editExpense(){

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
    <button type="button" class="btn btn-outline-dark float-end" onclick="closeCreateExpenseForm()">Close</button>
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

function closeCreateExpenseForm(){
  const dataUser = loadData()

  let mainContent = document.createElement("div")
  mainContent.id = 'main-content'
  mainContent.className = 'container flex-grow-1 overflow-auto'

  document.querySelector('#content').innerHTML = ''
  document.querySelector('#content').appendChild(mainContent)

  displayHomeContent(dataUser)
}

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
    const filteredExpensesByCategory = filterExpensesByCategory(dataUser.expenses, dataUser.categories)
    
    if (filteredExpensesByCategory.length) {
      for (let i = 0; i < filteredExpensesByCategory.length; i++) {
        let exceed = false, percentage = 0

        if(filteredExpensesByCategory[i].budget > 0 && filteredExpensesByCategory[i].budget < filteredExpensesByCategory[i].amount){
          percentage = 100
          exceed = true
        } else {
          percentage = filteredExpensesByCategory[i].budget / filteredExpensesByCategory[i].amount
        }

        homeCategoriesContent.innerHTML += `
        <div class="card shadow-sm m-2 my-4">
          <div class="card-body d-flex p-4">
            <div> 
              <h6 class="card-subtitle">${filteredExpensesByCategory[i].name}</h6>
              <p class="card-text text-muted">${filteredExpensesByCategory[i].totalTransaksi} Transaksi</p>
            </div>
            <div class="flex-grow-1 text-end my-auto">
              ${exceed ? `<small class="text-danger">exceed</small>` : `` }
              <h5 class="card-title ${exceed ? `text-danger ` : `` }">Rp. ${Intl.NumberFormat('id-ID').format(filteredExpensesByCategory[i].amount)}</h5>
            </div>
        </div>
        <div class="progress" style="height: 2px;">
          <div class="progress-bar" role="progressbar" style="width: ${Intl.NumberFormat('id-ID').format(percentage)}%;" aria-valuenow="${Intl.NumberFormat('id-ID').format(percentage)}" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
       </div>
       `
     }
    }

    /**
     * Add main menu
     */
    let mainMenu = document.createElement("div")
    mainMenu.id = 'menu'
    mainMenu.className = 'border-top'

    mainMenu.innerHTML = `
      <ul class="list-group list-group-flush flex-row justify-content-around py-3 px-2">
        <li class="list-group-item border rounded-2 p-3">Home</li>
        <li class="list-group-item border rounded-2 p-3" onclick="loadCreateExpenseForm()">Tambah Pengeluaran</li>
        <li class="list-group-item border rounded-2 p-3">Kategori</li>
      </ul>`

    document.querySelector('#main-content').appendChild(homeContent)
    document.querySelector('#main-content').appendChild(homeCategoriesContent)
    document.querySelector('#main-content').after(mainMenu)
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