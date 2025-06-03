const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const total = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateExpenses() {
  list.innerHTML = '';
  let totalAmount = 0;
  expenses.forEach((exp, index) => {
    totalAmount += parseFloat(exp.amount);
    const li = document.createElement('li');
    li.innerHTML = `${exp.date} - ${exp.desc} [$${exp.amount}] - ${exp.category}
      <button onclick="deleteExpense(${index})">x</button>`;
    list.appendChild(li);
  });
  total.innerText = totalAmount.toFixed(2);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  expenses.push({ desc, amount, date, category });
  updateExpenses();
  form.reset();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateExpenses();
}

updateExpenses();
