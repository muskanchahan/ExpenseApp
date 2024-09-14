
const express = require('express');
const path = require('path');
const cors = require('cors');
const { Appointment } = require('./models/index');
const { Expenses } = require('./models');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());//cors are use the 
app.use(express.json());



app.get('/ExpenseTracker', async (req, res) => {
    try {
      const  expenses= await Expenses.findAll();
      console.log(expenses);
      res.status(200).json(expenses);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  });
// POST request to add a new appointment
app.post('/ExpenseTracker', async (req, res) => {
  try {
    const newexpenses = await Expenses.create(req.body);
    res.status(201).json (newexpenses); // Respond with the created appointment
    console.log(newexpenses);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});



// DELETE request to remove an appointment
app.delete('/ExpenseTracker/:id', async (req, res) => {
  try {
    const  expensesId = req.params.id;
    const  Expense = await  Expenses.findByPk(expensesId);

    if (!Expense) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    await  Expense.destroy();
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
});


app.put('/ExpenseTracker/:id', async (req, res) => {
    try {
        const  expensesId = req.params.id;
        const {name, date, amount, type} = req.body;

        // Log the ID and the incoming update data
        console.log('Updating Appointment ID:',  expensesId);
        console.log('Update Data:', req.body);

        // Find the appointment by ID
        const  Expense = await Expenses.findByPk( expensesId);
        if ( Expense) {
             Expense.name = name;
             Expense.date =  date;
             Expense.amount = amount;
             Expense.type=type;

            await  Expense.save();
            console.log('Appointment Updated:',  Expense);
            res.status(200).json(Expense);
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
  console.log(`the server is listening on the ${port}`);
});
