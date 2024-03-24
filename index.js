// Define variables for signup, login, slider, and formSection
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let successMessage = document.querySelector(".success-message");
let signupButton = document.querySelector(".signup-box .clkbtn");
let requiredInputs = document.querySelectorAll(".signup-box input[required]");

// Function to move slider and form section when signup button is clicked
signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

// Function to move slider and form section when login button is clicked
login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
    // Display previously entered login details
    displayPreviousLoginDetails();
});

// Function to check if all required fields are filled
function checkRequiredFields() {
    for (let input of requiredInputs) {
        if (!input.value) {
            return false;
        }
    }
    return true;
}

// Function to toggle signup button state
function toggleSignupButtonState() {
    if (checkRequiredFields()) {
        signupButton.disabled = false;
    } else {
        signupButton.disabled = true;
    }
}

// Event listener for input fields to check their state
for (let input of requiredInputs) {
    input.addEventListener("input", toggleSignupButtonState);
}

// Function to retrieve previously entered data and populate the fields
document.addEventListener('DOMContentLoaded', function () {
    // Retrieve data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
        // Populate the input fields with the retrieved data
        document.querySelector('.name').value = userData.name || '';
        document.querySelectorAll('.email')[1].value = userData.email || '';
    }
    
    // Event listener for signup button within the signup form
    signupButton.addEventListener("click", function() {
        // Store registration data in local storage
        const name = document.querySelector(".name").value;
        const email = document.querySelectorAll(".email")[1].value;
        const userData = { name: name, email: email };
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("Data stored:", userData); // Debugging
        // Display success message
        successMessage.style.display = "block";
    });
    
    // Initially disable signup button
    toggleSignupButtonState();
});

// Function to retrieve previously entered login details and populate the fields
function displayPreviousLoginDetails() {
    // Retrieve data from localStorage
    const loginData = JSON.parse(localStorage.getItem('loginData'));

    if (loginData) {
        // Populate the input fields with the retrieved data
        emailInput.value = loginData.email || '';
        passwordInput.value = loginData.password || '';
    }
}

// Function to store login details in local storage
function storeLoginDetails(email, password) {
    const loginData = { email: email, password: password };
    localStorage.setItem("loginData", JSON.stringify(loginData));
}

// Event listener for login button within the login form
loginButton.addEventListener("click", function() {
    // Retrieve login details from input fields
    const email = emailInput.value;
    const password = passwordInput.value;
    // Store login details in local storage
    storeLoginDetails(email, password);
    // You can also perform login actions here
    // For example, validate the login credentials
});

// Initially display login form and hide signup form
slider.classList.remove("moveslider");
formSection.classList.remove("form-section-move");

// Display previously entered login details when the page loads
displayPreviousLoginDetails();
