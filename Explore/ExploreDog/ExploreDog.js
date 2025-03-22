var backbtn = document.querySelector('.backToHomeBtn');
backbtn.addEventListener('click', () => {
    document.location.href = '/Hero.html';
});

var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addpopupbtn = document.getElementById("add-popup-button");
var cancelpopup = document.getElementById("cancel-popup");

let dogs = JSON.parse(localStorage.getItem("dogs")) || [];
let interestedUsers = JSON.parse(localStorage.getItem("interested")) || [];
 
function def(event) {
    event.preventDefault();
} 

addpopupbtn.addEventListener("click", function () {
    popupoverlay.style.display = "block";
    popupbox.style.display = "block";
});

cancelpopup.addEventListener("click", function () {
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";
});

var container = document.querySelector(".container");
var addDog = document.getElementById("add-dog");

// Info Overlay elements
var infoOverlay = document.createElement("div");
infoOverlay.setAttribute("class", "InfoOverlay");
document.body.appendChild(infoOverlay);
infoOverlay.style.display = "none";
infoOverlay.innerHTML = `<div class="InfoContent">
    <h2 id="info-name"></h2>
    <img id="info-img" src="" alt="Dog Image">
    <p id="info-gender"></p>
    <p id="info-friendof"></p>
    <p id="info-description"></p>
    <div id="friend-info" style="display: none;"><h3>Friend Info</h3>
        <h2 id="friend-name"></h2>
        <img id="friend-img" src="" alt="Friend Image">
        <p id="friend-gender"></p>
        <p id="friend-description"></p>
    </div>
    <button id="close-info">Close</button>
    <button id="delete-info">Delete</button>
    <button id="interested-btn">Interested?</button>
</div>`;

document.getElementById("close-info").addEventListener("click", function () {
    infoOverlay.style.display = "none";
});

document.getElementById("delete-info").addEventListener("click", function () {
    let dogName = document.getElementById("info-name").innerText;
    let dogIndex = dogs.findIndex(dog => dog.name === dogName);
    if (dogIndex !== -1) {
        dogs.splice(dogIndex, 1);
        saveToLocalStorage();
        document.getElementById(dogName).remove();
        infoOverlay.style.display = "none";
    }
});


// Function to save interest data
function saveInterest(dogName, name, email, mobile) {
    let interestData = {
        type: "Dog",
        dogName: dogName,
        name: name,
        email: email,
        mobile: mobile,
        date: new Date().toLocaleString()
    };

    interestedUsers.push(interestData);
    localStorage.setItem("interested", JSON.stringify(interestedUsers));

    // Send email notification
    emailjs.send("service_1a7iw4i", "template_kv6ab9t", {
        message: `${name} (${email}, ${mobile}) has shown interest in ${dogName}`
    }).then(function(response) {
        console.log("✅ Email sent!", response.status, response.text);
    }, function(error) {
        console.error("❌ Failed to send email", error);
    });
}



// Function to handle interest button click
document.getElementById("interested-btn").addEventListener("click", function () {
    let dogName = document.getElementById("info-name").innerText;
    let email = prompt(`Enter your email to show interest in ${dogName}:`);
    let name = prompt(`Enter your Name to show interest in ${dogName}:`);
    let mobile = prompt(`Enter your Phone Number to show interest in ${dogName}:`);
    
    if (email && email.includes("@")) {
        saveInterest(dogName, name,email,mobile);
        alert(`You have shown interest in ${dogName}.`);
    } else {
        alert("Please enter a valid email.");
    }
});

function saveToLocalStorage() {
    localStorage.setItem("dogs", JSON.stringify(dogs));
}

addDog.addEventListener("click", function (event) {
    event.preventDefault();

    let dogObj = {
        name: document.getElementById("Profile-name").value,
        imgsrc: document.getElementById("Profile-pic").value,
        gender: document.getElementById("Profile-gender").value,
        friendof: document.getElementById("FriendOf").value,
        description: document.getElementById("Profile-desc-input").value
    };

    dogs.push(dogObj);
    saveToLocalStorage();
    renderDog(dogObj);
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";
});

function renderDog(dogObj) {
    var div = document.createElement("div");
    div.setAttribute("class", "Infobox");
    div.setAttribute("id", dogObj.name);
    div.innerHTML = `<div class="Infobox abc" id="${dogObj.name}">
        <div class="img" style="background-image: url('${dogObj.imgsrc}');"></div>
        <div class="Infoboxdesc">
            <p>Name: ${dogObj.name}<br>Gender: ${dogObj.gender}</p>
        </div>
        <button onclick="showDogInfo('${dogObj.name}')">Know more</button>
        <button class="cl" onclick="handleInterestClick('${dogObj.name}')">Interested?</button>
    </div>`;

    container.append(div);
}

// Load dogs from localStorage on page load
dogs.forEach(renderDog);

// Function to handle interest button click
function handleInterestClick(dogName) {
    let email = prompt(`Enter your email to show interest in ${dogName}:`);
    if (email && email.includes("@")) {
        saveInterest(dogName, email);
        alert(`You have shown interest in ${dogName}.`);
    } else {
        alert("Please enter a valid email.");
    }
}

// Function to display dog info
window.showDogInfo = function (dogName) {
    let dogObj = dogs.find(dog => dog.name === dogName);
    if (dogObj) {
        document.getElementById("info-name").innerText = dogObj.name;
        document.getElementById("info-img").src = dogObj.imgsrc;
        document.getElementById("info-gender").innerText = `Gender: ${dogObj.gender}`;
        document.getElementById("info-friendof").innerText = `Friend of: ${dogObj.friendof}`;
        document.getElementById("info-description").innerText = dogObj.description;

        let friendObj = dogs.find(dog => dog.name === dogObj.friendof);
        if (friendObj) {
            document.getElementById("friend-info").style.display = "block";
            document.getElementById("friend-name").innerText = friendObj.name;
            document.getElementById("friend-img").src = friendObj.imgsrc;
            document.getElementById("friend-gender").innerText = `Gender: ${friendObj.gender}`;
            document.getElementById("friend-description").innerText = friendObj.description;
        } else {
            document.getElementById("friend-info").style.display = "none";
        }

        infoOverlay.style.display = "block";
    }
};

// Pass data to DataB.js
window.addEventListener("beforeunload", () => {
    localStorage.setItem("interested", JSON.stringify(interestedUsers));
});



// Displat admin controls

document.addEventListener("DOMContentLoaded", function () {
    // Get the stored role from localStorage
    const userRole = localStorage.getItem("role");

    // Select all elements with the .admin class
    const adminElements = document.querySelectorAll(".admin");

    if (userRole === "admin") {
        // Show admin elements
        adminElements.forEach(element => {
            element.style.display = "block";
        });
    } else {
        // Hide admin elements
        adminElements.forEach(element => {
            element.style.display = "none";
        });
    }
});