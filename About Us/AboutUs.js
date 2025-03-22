
var homebtn = document.querySelector('.home');
homebtn.addEventListener('click',()=>{

    document.location.href = '/Hero.html';
    console.log('hi');
})

var donatepage = document.querySelector('.donate');
donatepage.addEventListener('click',()=>{

    document.location.href = '/Donate/Donate.html';
    console.log('hi');
})

var QuizPage = document.querySelector('.Quiz');
QuizPage.addEventListener('click',()=>{

    document.location.href = '/Quiz.html';
    console.log('hi');
})

let contactUsbtn = document.querySelector('.contact-Us');
contactUsbtn.addEventListener('click',()=>{
    document.location.href = '/ContactUs/contactUs.html';
})
