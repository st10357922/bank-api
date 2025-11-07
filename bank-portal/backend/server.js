const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Password1!', 
  database: 'bank_portal'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

app.post('/api/register', async (req, res) => {
  const { full_name, id_number, account_number, password } = req.body;

  const hashedPassword = await bcrypt.hash(password || 'default', 10);

  db.query(
    'INSERT INTO customers (full_name, id_number, account_number, password) VALUES (?, ?, ?, ?)',
    [full_name || 'John Doe', id_number || '000000', account_number || '000000', hashedPassword],
    (err, result) => {
      if (err) console.log(err);
      res.json({ success: true, message: 'Registration successful!' });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { username, account_number, password } = req.body;
  res.json({ success: true, message: 'Login successful!', user: { id: 1, username: username || 'User' } });
});

app.post('/api/payment', (req, res) => {
  const { customer_id, amount, currency, provider, beneficiary_account, swift_code } = req.body;

  db.query(
    'INSERT INTO payments (customer_id, amount, currency, provider, beneficiary_account, swift_code, verified) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [customer_id || 1, amount || 0, currency || 'USD', provider || 'SWIFT', beneficiary_account || '000000', swift_code || 'SWIFT000', 0],
    (err, result) => {
      if (err) console.log(err);
      res.json({ success: true, message: 'Payment registered!' });
    }
  );
});

app.post('/api/employee/login', (req, res) => {
  const { username, password } = req.body;
  res.json({ success: true, message: 'Employee login successful!', employee: { id: 1, username: username || 'Employee' } });
});

app.post('/api/payment/verify', (req, res) => {
  const { payment_id } = req.body;

  db.query('UPDATE payments SET verified = 1 WHERE id = ?', [payment_id], (err, result) => {
    if (err) console.log(err);
    res.json({ success: true, message: 'Payment verified!' });
  });
});

app.get('/api/payments', (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) console.log(err);
    res.json(results);
  });
});

app.listen(5000, () => console.log('🚀 Server running on port 5000'));
