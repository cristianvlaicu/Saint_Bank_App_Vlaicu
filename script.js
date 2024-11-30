'use strict';

/* ******************************************************************************** */

/* SAINT BANK APP */

// Data
const account1 = {
  owner: 'Javier Buendía López',
  movements: [
    200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300, 1190.95, 800,
  ],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-11-18T21:31:17.178Z',
    '2023-12-23T07:42:02.383Z',
    '2024-01-28T09:15:04.904Z',
    '2024-04-01T10:17:24.185Z',
    '2024-05-08T14:11:59.604Z',
    '2024-05-27T17:01:17.194Z',
    '2024-07-11T23:36:17.929Z',
    '2024-07-12T10:51:36.790Z',
    '2024-09-12T15:51:36.790Z',
    '2024-11-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'es-ES',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30, 1500, 8000],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2023-09-01T13:15:33.035Z',
    '2023-11-30T09:48:16.867Z',
    '2023-12-25T06:04:23.907Z',
    '2024-01-25T14:18:46.235Z',
    '2024-02-05T16:33:06.386Z',
    '2024-04-10T14:43:26.374Z',
    '2024-06-25T18:49:59.371Z',
    '2024-07-26T12:01:20.894Z',
    '2024-09-20T12:01:20.894Z',
    '2024-11-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Haruto Sato',
  movements: [
    300000, 440000, -55000, -49000, -221000, -150000, 950000, -5000, 130000,
    700000,
  ],
  interestRate: 0.9,
  pin: 3333,

  movementsDates: [
    '2023-08-05T13:15:33.035Z',
    '2023-10-25T09:48:16.867Z',
    '2023-12-27T06:04:23.907Z',
    '2024-01-21T14:18:46.235Z',
    '2024-02-08T16:33:06.386Z',
    '2024-03-11T14:43:26.374Z',
    '2024-05-15T18:49:59.371Z',
    '2024-07-25T12:01:20.894Z',
    '2024-09-22T12:01:20.894Z',
    '2024-11-27T12:01:20.894Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP',
};

const accounts = [account1, account2, account3];

/* ******************************************************************************** */

// Elements

// Selecting DOM elements to manipulate or retrieve information
const labelWelcome = document.querySelector('.welcome'); // Welcome message element
const labelDate = document.querySelector('.date'); // Element to display the current date
const labelBalance = document.querySelector('.balance__value'); // Element to display account balance
const labelSumIn = document.querySelector('.summary__value--in'); // Element to display total deposits
const labelSumOut = document.querySelector('.summary__value--out'); // Element to display total withdrawals
const labelSumInterest = document.querySelector('.summary__value--interest'); // Element to display interest summary
const labelTimer = document.querySelector('.timer'); // Timer display element

// Selecting container elements
const containerApp = document.querySelector('.app'); // Main application container
const containerMovements = document.querySelector('.movements'); // Container for transaction movements

// Selecting buttons for user interactions
const btnLogin = document.querySelector('.login__btn'); // Login button
const btnTransfer = document.querySelector('.form__btn--transfer'); // Transfer button
const btnLoan = document.querySelector('.form__btn--loan'); // Loan request button
const btnClose = document.querySelector('.form__btn--close'); // Close account button
const btnSort = document.querySelector('.btn--sort'); // Sort transactions button

// Selecting input fields for user inputs
const inputLoginUsername = document.querySelector('.login__input--user'); // Login username input
const inputLoginPin = document.querySelector('.login__input--pin'); // Login PIN input
const inputTransferTo = document.querySelector('.form__input--to'); // Transfer recipient input
const inputTransferAmount = document.querySelector('.form__input--amount'); // Transfer amount input
const inputLoanAmount = document.querySelector('.form__input--loan-amount'); // Loan amount input
const inputCloseUsername = document.querySelector('.form__input--user'); // Account closure username input
const inputClosePin = document.querySelector('.form__input--pin'); // Account closure PIN input

/* ******************************************************************************** */

// Functions:

// Function to format dates for transactions
const formatMovementDate = function (date, locale) {
  // Helper function to calculate the number of days between two dates
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)); // Convert time difference to days

  const daysPassed = calcDaysPassed(new Date(), date); // Days passed since transaction date

  if (daysPassed === 0) return 'Today.'; // If transaction is today
  if (daysPassed === 1) return 'Yesterday.'; // If transaction was yesterday
  if (daysPassed <= 7) return `${daysPassed} Days ago.`; // If transaction is within the last 7 days

  return new Intl.DateTimeFormat(locale).format(date); // Format date according to locale
};

// Function to format currency values
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency', // Use currency formatting
    currency: currency, // Set currency type
  }).format(value);
};

// Function to display transaction movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // Clear the container before adding movements

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b) // Sort transactions if requested
    : acc.movements; // Otherwise, use the original order

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'; // Determine type of transaction

    const date = new Date(acc.movementsDates[i]); // Retrieve transaction date
    const displayDate = formatMovementDate(date, acc.locale); // Format transaction date

    const formattedMov = formatCur(mov, acc.locale, acc.currency); // Format transaction amount

    // Generate HTML for each transaction row
    const html = `
       <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html); // Add transaction to the container
  });
};

// Function to calculate and display account balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); // Sum up all transactions
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency); // Display formatted balance
};

// Function to calculate and display summary (incomes, expenses, and interest)
const calcDisplaySummary = function (acc) {
  // Calculate total incomes
  const incomes = acc.movements
    .filter(mov => mov > 0) // Filter only deposits
    .reduce((acc, mov) => acc + mov, 0); // Sum up deposits
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency); // Display total deposits

  // Calculate total expenses
  const out = acc.movements
    .filter(mov => mov < 0) // Filter only withdrawals
    .reduce((acc, mov) => acc + mov, 0); // Sum up withdrawals
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency); // Display total withdrawals

  // Calculate total interest
  const interest = acc.movements
    .filter(mov => mov > 0) // Filter only deposits
    .map(deposit => (deposit * acc.interestRate) / 100) // Calculate interest per deposit
    .filter(int => int >= 1) // Filter only significant interest amounts
    .reduce((acc, int) => acc + int, 0); // Sum up interests
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency); // Display total interest
};

// Function to create usernames based on account owner's name
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase() // Convert name to lowercase
      .split(' ') // Split full name into parts
      .map(name => name[0]) // Take the first letter of each part
      .join(''); // Combine into a single string
  });
};
createUsernames(accounts); // Generate usernames for all accounts

// Function to update the UI based on the current account
const updateUI = function (acc) {
  displayMovements(acc); // Display transactions
  calcDisplayBalance(acc); // Display balance
  calcDisplaySummary(acc); // Display summary
  errorMessage.style.display = 'none'; // Hide error messages
  errorMessage2.style.display = 'none';
  wrongAmount.style.display = 'none';
  wrongAmount2.style.display = 'none';
};

// Function to start a logout timer
const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0); // Calculate minutes
    const sec = String(time % 60).padStart(2, 0); // Calculate seconds

    labelTimer.textContent = `${min}:${sec}`; // Display remaining time

    if (time === 0) {
      // When time runs out
      clearInterval(timer); // Stop the timer
      labelWelcome.textContent = 'Log in to get started'; // Reset welcome message
      containerApp.style.opacity = 0; // Hide the application
    }

    time--; // Decrease time by 1 second
  };

  let time = 600; // Set initial time to 10 minutes

  tick(); // Run the timer immediately
  const timer = setInterval(tick, 1000); // Call the timer every second

  return timer; // Return the timer reference
};

/* ******************************************************************************** */

// Event handlers

let currentAccount, timer; // Declare variables for the current account and logout timer

// Event listener for the login button
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission

  const errorMessage = document.getElementById('errorMessage'); // Get the error message element

  // Find the account that matches the username input
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  // Check if the account exists and if the PIN is correct
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display the UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}!`;
    containerApp.style.opacity = 1; // Make the app visible

    // Function to update the current time and date in real time
    function updateClock() {
      const now = new Date(); // Get the current date and time
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
      };
      // Format and display the date and time
      labelDate.textContent = new Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(now);
    }

    updateClock(); // Initialize the clock
    setInterval(updateClock, 1000); // Update the clock every second

    // Clear the login input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // Remove focus from the PIN input

    // Reset the timer if it exists, and start a new logout timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    updateUI(currentAccount); // Update the UI with the current account's data
  } else {
    errorMessage.style.display = 'block'; // Display the error message
  }
});

// Event listener for the transfer button
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission

  const wrongAmount = document.getElementById('wrongAmount'); // Get the wrong amount message element

  const amount = +inputTransferAmount.value; // Parse the transfer amount
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  ); // Find the receiver's account

  // Clear the transfer input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // Validate the transfer conditions
  if (
    amount > 0 && // Ensure the amount is positive
    receiverAcc && // Ensure the receiver account exists
    currentAccount.balance >= amount && // Ensure the sender has enough balance
    receiverAcc?.username !== currentAccount.username // Ensure the receiver is not the sender
  ) {
    // Deduct the amount from the sender's account
    currentAccount.movements.push(-amount);
    // Add the amount to the receiver's account
    receiverAcc.movements.push(amount);

    // Add the transfer date to both accounts
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    updateUI(currentAccount); // Update the UI with the new data

    clearInterval(timer); // Reset the timer
    timer = startLogOutTimer(); // Start a new logout timer
  } else {
    wrongAmount.style.display = 'block'; // Display the wrong amount message
  }
});

// Event listener for the loan request button
btnLoan.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission

  const wrongAmount2 = document.getElementById('wrongAmount2'); // Get the wrong loan amount message element
  const amount = Math.floor(inputLoanAmount.value); // Parse and floor the loan amount

  // Validate loan conditions
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      currentAccount.movements.push(amount); // Add the loan amount to the account

      currentAccount.movementsDates.push(new Date().toISOString()); // Add the loan date

      updateUI(currentAccount); // Update the UI with the new data

      clearInterval(timer); // Reset the timer
      timer = startLogOutTimer(); // Start a new logout timer
    }, 3000); // Simulate loan processing with a 3-second delay
  } else {
    wrongAmount2.style.display = 'block'; // Display the wrong loan amount message
  }
  inputLoanAmount.value = ''; // Clear the loan input field
});

// Event listener for the account closure button
btnClose.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission

  const errorMessage2 = document.getElementById('errorMessage2'); // Get the error message element

  // Validate closure conditions
  if (
    inputCloseUsername.value === currentAccount.username && // Ensure the username matches
    +inputClosePin.value === currentAccount.pin // Ensure the PIN matches
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    ); // Find the index of the account to be deleted

    accounts.splice(index, 1); // Delete the account from the array
    labelWelcome.textContent = 'Log in to get started'; // Reset welcome message
    containerApp.style.opacity = 0; // Hide the UI
  } else {
    errorMessage2.style.display = 'block'; // Display the error message
  }

  inputCloseUsername.value = inputClosePin.value = ''; // Clear the closure input fields
});

let sorted = false; // Track the sorted state of the movements

// Event listener for the sort button
btnSort.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form submission
  displayMovements(currentAccount, !sorted); // Display movements in sorted order
  sorted = !sorted; // Toggle the sorted state
});
