// Helpful Javascript stuff

// Ternary Operator
   //   ?:
   // writen as: expression ? result_if_true : result_if_false
	//example
	const screenWidth = 768;
	const maxTabletWidth = 1024;
	const screenType = screenWidth > maxTabletWidth ? "Desktop!" : "Tablet!";
	
	// Switch statement
	switch(expression) {
    case Case1:
        Case1 statements
        break;
    case Case2:
        Case2 statements
        break;
    etc.
    default:
        Default statements
}

//Show current date on footer
var today = new Date();
// Format Date
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var formattedDate = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
// displayDate points Javascript to ID on footer page to display result
document.getElementById('displayDate').textContent = formattedDate;
