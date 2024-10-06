const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const departments = ['HR', 'Engineering', 'Sales', 'Marketing'];
const employees = ['John Doe - 1001', 'Jane Smith - 1002', 'Alice Johnson - 1003', 'Bob Brown - 1003'];

app.get('/departments', (req, res) => {
  res.json(departments);
});

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});