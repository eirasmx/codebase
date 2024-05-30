function validate_payment(card_number, expiry_date, credit_cvv) {
  var cardNumber = document.getElementById(card_number).value;
  var expiryDate = document.getElementById(expiry_date).value;
  var cvv = document.getElementById(credit_cvv).value;
  
  const errors = [];

  // Validate credit card number (Luhn algorithm)
  if (!validateCreditCard(cardNumber)) {
    errors.push('Invalid credit card number');
    console.log('card number')
  }

  // Validate expiry date (MM/YY format)
  if (!validateExpiryDate(expiryDate)) {
    errors.push('Invalid expiration date');
    console.log('date')
  }

  // Validate CVV (3 or 4 digits)
  if (!validateCVV(cvv)) {
    errors.push('Invalid CVV');
    console.log('cvv')
  }

  return errors
};

// Function to validate credit card number using Luhn algorithm
function validateCreditCard(cardNumber) {
  // Check if card number is numeric and has 16 digits
  var card_number = cardNumber.replace(/\s/g, "")

  if (!/^\d{16}$/.test(card_number)) return false;

  // Luhn algorithm
  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let digit = parseInt(card_number[i]);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

// Function to validate expiration date (MM/YY format)
function validateExpiryDate(expiryDate) {
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last two digits of current year
  const currentMonth = currentDate.getMonth() + 1; // Get current month (0-indexed)
  return /^\d{2}\/\d{2}$/.test(expiryDate) && // Check format
         parseInt(month) >= 1 && parseInt(month) <= 12 && // Check month range
         (parseInt(year) > currentYear || // Check year range
         (parseInt(year) === currentYear && parseInt(month) >= currentMonth));
}

// Function to validate CVV (3 or 4 digits)
function validateCVV(cvv) {
  return /^\d{3,4}$/.test(cvv);
}
