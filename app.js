// Listen For Submit
document.getElementById('loan-form').addEventListener('submit', function(event) {
  // Hide Results
  document.getElementById('results').style.display = 'none';
  // Show Loader
  document.querySelector('.loading').style.display = 'block';
  setTimeout(calculateResults, 1000);

  event.preventDefault();
});

// Calculate Results
function calculateResults() {
  console.log('Calculating..');

  //#region User Interface Variables
  const amount   = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years    = document.getElementById('years');

  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment   = document.getElementById('total-payment');
  const totalInterest  = document.getElementById('total-interest');
  //#endregion
  //#region Data Variables
  const principal          = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  //#endregion
  //#region Calculated Variables
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  //#endregion

  // Hide Spinner
  document.querySelector('.loading').style.display = 'none';

  // Calculations
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show Results
    document.getElementById('results').style.display = 'block';
  }
  else {
    showError('Invalid Input.. Please Try Again');
  }
}
// Show Error Function
function showError(error) {
  // Create A Div
  const errorDiv = document.createElement('div');
  // Get Elements
  const card    = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  const result  = document.getElementById('results')

  // Add Error Class
  errorDiv.className = 'alert alert-danger text-center';
  // Create Text Node And Append To Div
  errorDiv.appendChild(document.createTextNode(error));
  // Inserting Error Above Heading
  card.insertBefore(errorDiv, result);
  // Clear Error
  setTimeout(function() { document.querySelector('.alert').remove(); }, 2000);
}