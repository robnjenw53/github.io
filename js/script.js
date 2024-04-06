// created by: Robert Wright, Wilmington University, CSC 489, 26 Feb 2024

function calculateAmortization() {
	const loanAmount = parseFloat(document.getElementById('loanAmount').value); // Loan Amount needed for calculations
	const interestRate = parseFloat(document.getElementById('interestRate').value); // Annual Interest Rate needed for calculations
	const loanTerm = parseFloat(document.getElementById('loanTerm').value); // Number of years the loan if for, needed for calculations
						
	// Determine monthly rate by dividing %rate by 100 to get a decimal then by 12 to get the monthly rate
	const monthlyInterestRate = (interestRate / 100) / 12;
			
	//total number of payments is loan term (years) x 12
	const numberOfPayments = loanTerm * 12;
			
	// Determine monthly payment
	const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - (1 + monthlyInterestRate) ** -numberOfPayments);
	
	let remainingBalance = loanAmount;
	//Assign amortizationTableBody from HTML table
	const amortizationTableBody = document.getElementById('amortizationTableBody');
	//Clear table
	amortizationTableBody.innerHTML = '';
			
	//Set i as number of payments to loop through each payment and assign value
	for (let i = 1; i <= numberOfPayments; i++) {
		
	const interestPayment = remainingBalance * monthlyInterestRate;
	const principalPayment = monthlyPayment - interestPayment;
	remainingBalance -= principalPayment;
				
	//Format previously declared variables to show in US dollars
	const formatInterestPayment = interestPayment.toLocaleString("en-US", {style:"currency", currency:"USD"});
	const formatPrincipalPayment = principalPayment.toLocaleString("en-US", {style:"currency", currency:"USD"});
	const formatRemainingBalance = remainingBalance.toLocaleString("en-US", {style:"currency", currency:"USD"});

	//create new table row for each payment
	const tableRow = document.createElement('tr');
	//Populate new row with data from loop
	tableRow.innerHTML =
		'<td>' + i + '</td>' +
		'<td>' + formatPrincipalPayment + '</td>' +
		'<td>' + formatInterestPayment + '</td>' +
		'<td>' + formatRemainingBalance + '</td>';
			amortizationTableBody.appendChild(tableRow);				
            }			
}


// calculate monthly mortgage payment on monthly mortgage page
function calculateMortgage() {
	
	//Get loan amount, interest rate and loan term from monthly mortgage page and assign value
    const loanAmount = document.getElementById('loanAmount').value; // Loan Amount needed for calculations
    const interestRate = document.getElementById('interestRate').value; // Annual Interest Rate needed for calculations
    const loanTerm = document.getElementById('loanTerm').value;
	
	// Determine monthly rate by dividing %rate by 100 to get a decimal then by 12 to get the monthly rate
	const monthlyInterestRate = (interestRate / 100) / 12;
	
	 //total number of payments is loan term (years) x 12
	const numberOfPayments = loanTerm * 12;

	// Determine monthly payment
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - (1 + monthlyInterestRate) ** -numberOfPayments);
	const adjustMonthlyPayment = monthlyPayment.toLocaleString("en-US", {style:"currency", currency:"USD"});
	
	// displayMonthlyPayment points JavaScipt to div ID on HTML page to display reults
    document.getElementById('displayMonthlyPayment').textContent = "The monthly payment on this loan would be " + adjustMonthlyPayment;
}

//calculate Refinancing
function calculateBreakEven() {
	
	  //Get current loan amount
      const currentLoanAmount = document.getElementById("currentLoanAmount").value;
	  
	  //Get current interest rate
      const currentInterestRate = document.getElementById("currentInterestRate").value;
	  
	  //Get new interest rate
      const newInterestRate = document.getElementById("newInterestRate").value;
	  
	  //Get upfront costs of refinacing
      const refinanceCost = document.getElementById("refinanceCost").value;

	  // Monthly savings subtract  new interst rate from current and multiply by 100 to get decimal and 12 to get monthly savings
      const monthlySavings = ((currentLoanAmount * (currentInterestRate - newInterestRate)) / 100) / 12;
	  
	  //months to break even is upfront costs divided by monthly savings
      const monthsToBreakEven = refinanceCost / monthlySavings;
	  
	  //displayBreakEvenResult points JavaScript to div ID on HTML page to display reults		
      document.getElementById("displayBreakEvenResult").innerHTML = "It will take approximately " + Math.round(monthsToBreakEven) + " months to break even and begin saving money.";
    }
	
	
	//Rent or Buy
function calculateRentOrBuy() {
	
	//Get loan amount, interest rate and loan term from monthly mortgage page and assign value
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);
	const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value;
    const loanTerm = document.getElementById('loanTerm').value;
	
	// Determine monthly rate by dividing %rate by 100 to get a decimal then by 12 to get the monthly rate
	const monthlyInterestRate = (interestRate / 100) / 12;
	
	 //total number of payments is loan term (years) x 12
	const numberOfPayments = loanTerm * 12;

	// Determine monthly payment
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - (1 + monthlyInterestRate) ** -numberOfPayments);
	
	//Determine total rent cost
	// using .toLocaleString('en-US') drops the two decimal places
	const totalRentCost = monthlyRent * numberOfPayments;
	
	// displayCostOfRenting points JavaScript to div ID on HTML page to display reults
	document.getElementById('displayCostOfRenting').textContent = "The total cost of renting would be " + totalRentCost.toLocaleString("en-US", {style:"currency", currency:"USD"});
	
    const totalCostOfBuying = monthlyPayment * numberOfPayments;
	// displayCostOfBuying points JavaScript to div ID on HTML page to display reults
	document.getElementById('displayCostOfBuying').textContent = "The total cost of buying would be " + totalCostOfBuying.toLocaleString("en-US", {style:"currency", currency:"USD"});
	
	// Compare rent cost to buy cost to determine which is cheaper
	if (totalRentCost < totalCostOfBuying) {
		// displayWhichIsCheaper points JavaScript to div ID on HTML page to display reults
        document.getElementById('displayWhichIsCheaper').textContent = 'Renting is cheaper';
      } else {  
        document.getElementById('displayWhichIsCheaper').textContent = 'Buying is cheaper';
      }	
}

	
	//Calculate Early Payoff
	function calculateEarlyPayoff() {
            // Get input values for loan amount, interest rate, monthly payment and extra payment
            var loanAmount = parseFloat(document.getElementById('loanAmount').value);
            var interestRate = parseFloat(document.getElementById('interestRate').value);
            var monthlyPayment = parseFloat(document.getElementById('monthlyPayment').value);
            var additionalPayment = parseFloat(document.getElementById('additionalPayment').value);

            // Convert annual interest rate to a decimal by dividing by 100 then divide by 12 to get monthly interest rate
            var monthlyInterestRate = (interestRate / 100) / 12;

            // Initialize variables
            var remainingBalance = loanAmount;
            var months = 0;

            // Loop until the remaining balance is zero
            while (remainingBalance > 0) {
				
                // Calculate interest for the current loop counter month
                var interest = remainingBalance * monthlyInterestRate;
                
                // Apply additional payment to monthly payment to get total payment
                var totalPayment = monthlyPayment + additionalPayment - interest;
                
                // Calculate the new balance, subtract interest from total payment to determine how much goes towards loan amount
                remainingBalance -= totalPayment;

                // Increment the month counter
                months ++;
			}

            // displayEarlyPayOff points JavaScript to div ID on HTML page to display reults
            document.getElementById('displayEarlyPayOff').innerHTML = "With an additional payment of $" + additionalPayment.toFixed(2) +
                " per month, the mortgage will be paid off in " + (months / 12).toFixed(2) + " years";
}
	

var today = new Date();

// Format Date
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var formattedDate = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();

// displayDate points Javascript to ID on footer page to display result
    document.getElementById('displayDate').textContent = formattedDate;
	
// If user clicks on header image, page will scroll to calculator if it is not already visible
function scrollToCalculator() {
            var calc = document.getElementById('calculatorArea');
            calc.scrollIntoView({ behavior: 'instant' });
        }
