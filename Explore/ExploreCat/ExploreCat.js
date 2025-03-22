var backbtn = document.querySelector('.backToHomeBtn');
backbtn.addEventListener('click', () => {
    document.location.href = '/Hero.html';
});

var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addpopupbtn = document.getElementById("add-popup-button");
var cancelpopup = document.getElementById("cancel-popup");

let cats = JSON.parse(localStorage.getItem("cats")) || [];
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
var addCat = document.getElementById("add-cat");

// Info Overlay elements
var infoOverlay = document.createElement("div");
infoOverlay.setAttribute("class", "InfoOverlay");
document.body.appendChild(infoOverlay);
infoOverlay.style.display = "none";
infoOverlay.innerHTML = `<div class="InfoContent">
    <h2 id="info-name"></h2>
    <img id="info-img" src="" alt="Cat Image">
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
    let catName = document.getElementById("info-name").innerText;
    console.log(catName);
    let catIndex = cats.findIndex(cat => cat.name === catName);
    if (catIndex !== -1) {
        cats.splice(catIndex, 1);
        saveToLocalStorage();
        document.getElementById(catName).remove();
        infoOverlay.style.display = "none";
    }
});

// Function to save interest data
function saveInterest(catName, name, email, mobile) {
    let interestData = {
        type: "Cat",
        catName: catName,
        name: name,
        email: email,
        mobile: mobile,
        date: new Date().toLocaleString()
    };
    interestedUsers.push(interestData);
    localStorage.setItem("interested", JSON.stringify(interestedUsers));

     // Send email notification using EmailJS
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
    let catName = document.getElementById("info-name").innerText;
    let email = prompt(`Enter your email to show interest in ${catName}:`);
    let name = prompt(`Enter your Name to show interest in ${catName}:`);
    let mobile = prompt(`Enter your Phone Number to show interest in ${catName}:`);
    
    if (email && email.includes("@")) {
        saveInterest(catName, name,email,mobile);
        alert(`You have shown interest in ${catName}.`);
    } else {
        alert("Please enter a valid email.");
    }
});

function saveToLocalStorage() {
    localStorage.setItem("cats", JSON.stringify(cats));
}

addCat.addEventListener("click", function (event) {
    event.preventDefault();
    let catObj = {
        name: document.getElementById("Profile-name").value,
        imgsrc: document.getElementById("Profile-pic").value,
        gender: document.getElementById("Profile-gender").value,
        friendof: document.getElementById("FriendOf").value,
        description: document.getElementById("Profile-desc-input").value
    };
    cats.push(catObj);
    saveToLocalStorage();
    renderCat(catObj);
    popupoverlay.style.display = "none";
    popupbox.style.display = "none";
});

function renderCat(catObj) {
    var div = document.createElement("div");
    div.setAttribute("class", "Infobox");
    div.setAttribute("id", catObj.name);
    div.innerHTML = `<div class="Infobox abc" id="${catObj.name}">
        <div class="img" style="background-image: url('${catObj.imgsrc}');"></div>
        <div class="Infoboxdesc">
            <p>Name: ${catObj.name}<br>Gender: ${catObj.gender}</p>
        </div>
        <button onclick="showCatInfo('${catObj.name}')">Know more</button>
        <button class="cl" onclick="handleInterestClick('${catObj.name}')">Interested?</button>
    </div>`;
    container.append(div);
}

cats.forEach(renderCat);

function handleInterestClick(catName) {
    let email = prompt(`Enter your email to show interest in ${catName}:`);
    if (email && email.includes("@")) {
        saveInterest(catName, email);
        alert(`You have shown interest in ${catName}.`);
    } else {
        alert("Please enter a valid email.");
    }
}

window.showCatInfo = function (catName) {
    let catObj = cats.find(cat => cat.name === catName);
    if (catObj) {
        document.getElementById("info-name").innerText = catObj.name;
        document.getElementById("info-img").src = catObj.imgsrc;
        document.getElementById("info-gender").innerText = `Gender: ${catObj.gender}`;
        document.getElementById("info-friendof").innerText = `Friend of: ${catObj.friendof}`;
        document.getElementById("info-description").innerText = catObj.description;
        let friendObj = cats.find(cat => cat.name === catObj.friendof);
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

document.addEventListener("DOMContentLoaded", function () {
    const userRole = localStorage.getItem("role");
    const adminElements = document.querySelectorAll(".admin");
    if (userRole === "admin") {
        adminElements.forEach(element => { element.style.display = "block"; });
    } else {
        adminElements.forEach(element => { element.style.display = "none"; });
    }
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