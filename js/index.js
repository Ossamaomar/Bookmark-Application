var bookmarkName = document.getElementById("bookmarkName");
var siteUrl = document.getElementById("siteUrl");
var subBtn = document.getElementById("subBtn");
var bookmarksSection = document.getElementById("bookmarksSection");
var errorScreen = document.getElementById("errorScreen");
var errorContainer = document.querySelector(".error-container");
var closeBtn = document.querySelector("#closeBtn");
var bookmarksContainer = [];


// This function is reponsible for creating an object for the bookamrk inputs and checks for their validation and then displays the bookmark
function addBookMark(){  
    // Check for validation
    if (siteNameValidation(bookmarkName.value) & urlValidation(siteUrl.value)) {
        var bookMarkObj = {
            name: bookmarkName.value,
            url : siteUrl.value
        };
    
        bookmarksContainer.push(bookMarkObj); //add the bookmark after validation
        localStorage.setItem("bookmarkElements", JSON.stringify(bookmarksContainer)); //Save to the local storage
        displayBookMark(); // Display bookmarks
        clearInputs(); //Clear input fields
    }
    else
    {
        // Display for the validation Error screen for validation errors
        displayErrorScreen();      
    }
    
    
}

// This function displays the bookmarks stored in the bookmarks container by adding them in the bookmarks section in the HTML 
function displayBookMark(){
    var container = `
        <div class="container bg-white">
            <div class="row py-2">
                <div class="col-md-3 d-flex justify-content-center">
                    <h5>Index</h5>
                </div>

                <div class="col-md-3 d-flex justify-content-center">
                    <h5>Website Name</h5>
                </div>

                <div class="col-md-3 d-flex justify-content-center">
                    <h5>Visit</h5>
                </div>

                <div class="col-md-3 d-flex justify-content-center">
                    <h5>Delete</h5>
                </div>
            </div>
            <div class="straight-line">
        </div>`;

    for (var i = 0; i < bookmarksContainer.length; i++) {
        container += `
            <div class="row bookmark-row d-flex align-items-center">  
                <div class="col-md-3 d-flex justify-content-center">
                    <p>${i+1}</p>
                </div>

                <div class="col-md-3 d-flex justify-content-center">
                    <p>${bookmarksContainer[i].name}</p>
                </div>

                <div class="col-md-3 d-flex justify-content-center">
                    <a href="${bookmarksContainer[i].url}">
                        <button class="btn visit-btn"><i class="fa-solid fa-eye"></i> Visit</button>
                    </a>
                </div>

                <div class="col-md-3 d-flex justify-content-center">
                    <button class="btn delete-btn"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </div>
            </div>
            <div class="straight-line"></div>
        
        `
    }
    bookmarksSection.innerHTML = container;
}

// Handles website name input validation 
function siteNameValidation(bookName) {
    var regex = /^[a-zA-Z0-9]{4,30}$/;
    var retState = false;

    if (regex.test(bookName)) {
        retState = true
    }

    return retState
}

// Handles website url input validation 
function urlValidation(urlLink) {
    var regex = /^(https:\/\/)?[a-zA-Z0-9]{3,30}\.com$/;
    var retState = false;

    if (regex.test(urlLink)) {
        retState = true
    }

    return retState
}

// Responsible for displaying the validation error screen
function displayErrorScreen() {
    errorScreen.classList.remove("d-none")
}

// Responsible for clearing the input fields after a successful bookmark addition
function clearInputs() {
    bookmarkName.value = null;
    siteUrl.value = null;
}



///////////////////////////// Start of Events Section /////////////////////////////

// This event listener for validating the bookmark name input field while writing on it
bookmarkName.addEventListener("input", function () {
    if (siteNameValidation(bookmarkName.value))
    {
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
    }
    else
    {
        bookmarkName.classList.remove("is-valid");
        bookmarkName.classList.add("is-invalid");
    }
});

// This event listener for validating the website url input field while writing on it
siteUrl.addEventListener("input", function () {
    if (urlValidation(siteUrl.value))
    {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    }
    else
    {
        siteUrl.classList.remove("is-valid");
        siteUrl.classList.add("is-invalid");
    }
});

// This event listener handles closing the validation error screen using the X button
closeBtn.addEventListener("click", function (){
    errorScreen.classList.add("d-none");
});

// This event listener handles closing the validation error screen when clicking outdide the error container
errorScreen.addEventListener("click", function (){
    errorScreen.classList.add("d-none");
});

// This event listener handles the propagation of closing the validation error screen when clicking on the error container
errorContainer.addEventListener("click", function (e){
    e.stopPropagation();
});

// This event listener is reponsible to close the validation error screen using the esc key and also submits the inputs by pressing the enter key
document.addEventListener("keydown", function (e){
    
    if (e.key === "Escape"){
        errorScreen.classList.add("d-none");
    }

    if (e.key === "Enter") {
        addBookMark();
    }
});

///////////////////////////// End of Events Section /////////////////////////////


// Checks whether there is an available data stored in the local storage and displays them if available
if (localStorage.getItem("bookmarkElements") !== null) {
    bookmarksContainer = JSON.parse(localStorage.getItem("bookmarkElements"));
    displayBookMark();
}