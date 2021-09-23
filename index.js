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

function initialize(){
  const data = {
    name : document.getElementById("name").value,
    salary : document.getElementById("salary").value
  }

  return localStorage.setItem('dataUser', JSON.stringify(data));
}

function render(){
  // Ambil data User dari local storage
  const dataUser = JSON.parse(localStorage.getItem('dataUser'));

  // Jika Ada
  if (dataUser) {
    /**
     * Delete semua konten HTML di dalam <body>
     * Replace dengan konten HOME.
     */
    document.querySelector('#login').remove()

    let homeContent = document.createElement("div");
    homeContent.innerHTML = `
    <div>
      <h1>nama ${dataUser.name}</h1>
      <h1>nama ${dataUser.salary}</h1>
    </div>
    `

    document.querySelector('#main-content').appendChild(homeContent);
    
  } else { // Jika tidak ada data
    // lempar ke halaman awal ( input nama & gaji )
  }
}

render()










function createObj(data, key){

  const lastExpense = data[key].slice(-1)[0];

  data[key].push({
    id: data[key].length + 1,
    name: 'Makan Malam',
    amount: 20.000,
    categoryId: 1,
    note: 'Makan Malam di cafe',
    createdAt: '17/4/2021'
  })

}

createObj(data)