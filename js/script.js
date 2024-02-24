// created by: Robert Wright, Wilmington University, CSC 489, 26 Feb 2024


function calculateAmortization() {
    // Get loan amount, interest rate, and term from amortization page and assign value
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);

    // Determine monthly rate by dividing %rate by 100 to get a decimal then by 12 to get the monthly rate
    const monthlyInterestRate = (interestRate / 100) / 12;

    //total number of payments is loan term (years) x 12 
    const numberOfPayments = loanTerm * 12;

    //can not get this to work with ** for exponential used math.pow in following formula const monthlyPayment = (monthlyInterestRate * loanAmount) / (1 - ((1 + monthlyInterestRate) ** -loanTerm));

    // Determine monthly payment 
    const monthlyPayment = (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

    // fetch and assign amortization schedule
    const amortizationSchedule = generateAmortizationSchedule(loanAmount, monthlyInterestRate, numberOfPayments, monthlyPayment);

    // display amortization array
    displayAmortizationResults(amortizationSchedule);
}

// build amortization schedule array
function generateAmortizationSchedule(loanAmount, monthlyInterestRate, numberOfPayments, monthlyPayment) {
    const amortizationSchedule = [];
    let remainingBalance = loanAmount;

    //Loop through each payment period to get data for array
	for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = remainingBalance * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        // Assign values to principlePayment, Interest Payment, and remainingBalance to two positions after decimal point
        amortizationSchedule.push({
            paymentNumber: i,
            principalPayment: principalPayment.toFixed(2),
            interestPayment: interestPayment.toFixed(2),
            remainingBalance: remainingBalance.toFixed(2)
        });
    }

    return amortizationSchedule;
}

function displayAmortizationResults(amortizationSchedule) {
    const amortizationTableData = document.getElementById('showAmortizationSchedule');

    // build table headers <th> and fill table rows <tr> with data (td> to display on ammortization page
    const buildAmortizationTable = `
        <br><h2>Amortization Schedule</h2><br>
        <table>
          <tr>
            <th>Payment Number</th>
            <th>Principal Payment</th>
            <th>Interest Payment</th>
            <th>Remaining Balance</th>
          </tr>
          ${amortizationSchedule.map(enterValue => `
            <tr>
              <td>${enterValue.paymentNumber}</td>
              <td>$${enterValue.principalPayment}</td>
              <td>$${enterValue.interestPayment}</td>
              <td>$${enterValue.remainingBalance}</td>
            </tr>
          `).join('')}
        </table>
      `;

    amortizationTableData.innerHTML = buildAmortizationTable;
}



// calculate monthly mortgage payment on monthly mortgage page
function calculateMortgage() {
	
	//Get loan amount, interest rate and loan term from monthly mortgage page and assign value
    const loanAmount = document.getElementById('loanAmount').value;
    const interestRate = document.getElementById('interestRate').value;
    const loanTerm = document.getElementById('loanTerm').value;
	
	// Determine monthly rate by dividing %rate by 100 to get a decimal then by 12 to get the monthly rate
	const monthlyInterestRate = (interestRate / 100) / 12;
	
	 //total number of payments is loan term (years) x 12
	const numberOfPayments = loanTerm * 12;

	// Determine monthly payment
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
	

    document.getElementById('displayMonthlyPayment').textContent = `The monthly payment on this loan would be $${monthlyPayment.toFixed(2)}`;
	// If I use this it takes the decimal out 3 places -- document.getElementById('displayMonthlyPayment').innerHTML = `Monthly Payment: $${monthlyPayment.toLocaleString('en-US')}`;
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

      document.getElementById("displayBreakEvenResult").innerHTML = `It will take approximately ${Math.round(monthsToBreakEven)} months to break even and begin saving money.`;
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
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
	
	//Determine total rent cost
	// using .toLocaleString('en-US') drops the two decimal places
	const totalRentCost = monthlyRent * numberOfPayments;
	document.getElementById('displayCostOfRenting').textContent = `The total cost of renting would be $${totalRentCost.toFixed(2)}`;

    const totalCostOfBuying = monthlyPayment * numberOfPayments;
	document.getElementById('displayCostOfBuying').textContent = `The total cost of buying would be $${totalCostOfBuying.toFixed(2)}`;
	
	
	if (totalRentCost < totalCostOfBuying) {
        document.getElementById('displayWhichIsCheaper').textContent = 'Renting is cheaper';
      } else {
        document.getElementById('displayWhichIsCheaper').textContent = 'Buying is cheaper';
      }
	
}
	
	//Calculate Early Payoff
	function calculateEarlyPayoff() {
            // Get input values
            var principal = parseFloat(document.getElementById('principal').value);
            var interestRate = parseFloat(document.getElementById('interestRate').value);
            var monthlyPayment = parseFloat(document.getElementById('monthlyPayment').value);
            var additionalPayment = parseFloat(document.getElementById('additionalPayment').value);

            // Convert annual interest rate to a decimal by dividing by 100 then divide by 12 to get monthly interest rate
            var monthlyInterestRate = (interestRate / 100) / 12;

            // Initialize variables
            var remainingBalance = principal;
            var months = 0;

            // Loop until the remaining balance is zero
            while (remainingBalance > 0) {
				
                // Calculate interest for the current loop counter month
                var interest = remainingBalance * monthlyInterestRate;
                
                // Apply additional payment to monthly payment to get total payment
                var totalPayment = monthlyPayment + additionalPayment - interest;
                
                // Calculate the new balance, subtract interest from total payment to determine how much goes towards principal
                remainingBalance = remainingBalance - totalPayment;

                // Increment the month counter
                months++;
			}

            // Display results
            document.getElementById('displayEarlyPayOff').innerHTML = "With an additional payment of $" + additionalPayment.toFixed(2) +
                " per month, the mortgage will be paid off in " + (months / 12).toFixed(2) + " years";
        }