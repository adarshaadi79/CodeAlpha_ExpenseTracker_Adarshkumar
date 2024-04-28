let expenses = []; // Expense array to store expenses

// Function to render expenses and total amount
function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    const totalExpenseElement = document.getElementById('totalExpense');
    expenseList.innerHTML = '';
    let totalAmount = 0;
    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            ${expense.name}: Rs.${expense.amount}
            <button type="button" class="btn btn-danger btn-sm float-right delete" data-index="${index}">Delete</button>
            <button type="button" class="btn btn-primary btn-sm float-right edit" data-index="${index}">Edit</button>
        `;
        expenseList.appendChild(li);
    });
    totalExpenseElement.textContent = `Total Expense: Rs.${totalAmount}`;
}

// Function to add expense
function addExpense(name, amount) {
    expenses.push({ name, amount });
    renderExpenses();
}

// Function to delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

// Function to edit expense
function editExpense(index, newName, newAmount) {
    expenses[index].name = newName;
    expenses[index].amount = newAmount;
    renderExpenses();
}

// Event listener for form submission
document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    addExpense(name, amount);
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
});

// Event listener for delete and edit buttons
document.getElementById('expenseList').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const index = e.target.getAttribute('data-index');
        deleteExpense(index);
    }
    if (e.target.classList.contains('edit')) {
        const index = e.target.getAttribute('data-index');
        const newName = prompt('Enter new expense name:');
        const newAmount = parseFloat(prompt('Enter new expense amount:'));
        if (newName && !isNaN(newAmount)) {
            editExpense(index, newName, newAmount);
        } else {
            alert('Invalid input!');
        }
    }
});

// Initial rendering of expenses
renderExpenses();
