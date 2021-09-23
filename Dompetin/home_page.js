// objek akun 

let dompetinAcc = [ //halaman utama
    {   nama: '',//nama pemegang akun
        saldoBudget:  0,
        saving: 0,
        debit: 0,
        kredit: 0,
    }
]

// objek tracker


let expense = [
    {
        // count: 0,   //jumlah transaksi hari ini
        jumlah: 0,
        id: 0,
        kategori: '',
        note: '',
    }
];

let income = [
    {
        // count: 0,   
        jumlah: 0,
        id: 0,
        kategori: '',
        note: '',
    }
];

let expenseTracker = expense.count;
let incomeTracker = income.count;

let totalExpense = expense.jumlah;              //akumulasi expense.jumlah[i]
let totalIncome = income.jumlah;               //akumulasi income

