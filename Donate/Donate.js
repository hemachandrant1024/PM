
var homebtn = document.querySelector('.home');
homebtn.addEventListener('click',()=>{

    window.location.href = '/Hero.html';
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

let contactUsbtn = document.querySelector('.contact-Us');
contactUsbtn.addEventListener('click',()=>{
    window.location.href = '/ContactUs/contactUs.html';
})
