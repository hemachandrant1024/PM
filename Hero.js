var Interest = document.getElementById('Interest');
Interest.addEventListener('click',()=>{

    window.location.href = '/Explore/DataB.html';
    console.log('hi');
})

var AboutusPage = document.querySelector('.aboutUs');
AboutusPage.addEventListener('click',()=>{

    window.location.href = '/About Us/AboutUs.html';
    console.log('hi');
})

var QuizPage = document.querySelector('.Quiz');
QuizPage.addEventListener('click',()=>{

    window.location.href = '/Quiz.html';
    console.log('hi');
})

var DonatePage = document.querySelector('.donate');
DonatePage.addEventListener('click',()=>{

    window.location.href = '/Donate/Donate.html';
    console.log('hi');
})

let contactUsbtn = document.querySelector('.contact-Us');
contactUsbtn.addEventListener('click',()=>{
    window.location.href = '/ContactUs/contactUs.html';
})




var Dogbutton = document.getElementById('Dogbtn');
Dogbutton.addEventListener('click',()=>{

    window.location.href = '/Explore/ExploreDog/ExploreDog.html';
    console.log('hi');
})

var Catbutton = document.getElementById('Catbtn');
Catbutton.addEventListener('click',()=>{

    window.location.href = '/Explore/ExploreCat/ExploreCat.html';
    console.log('hi');
})



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
