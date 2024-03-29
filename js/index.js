// /* ======== Intro ========== */
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1.1");
tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".big-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=1");

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', ()=>{
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
/*Active link*/
navLink.forEach(n => n.classList.remove('active'));
this.classList.add('active');

/*Remove menu mobile*/
const navMenu = document.getElementById('nav-menu')
navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 2000,
  reset: true
});
/*Nav SCROLL*/



/*SCROLL HOME*/
sr.reveal('.home__title',{}); 
sr.reveal('.button',{interval: 40}); 
sr.reveal('.home__img',{delay: 100}); 
sr.reveal('.home__social-icon',{ interval: 200}); 

/*SCROLL ABOUT*/
sr.reveal('.about__img',{}); 
sr.reveal('.about__subtitle',{delay: 10}); 
sr.reveal('.about__text',{delay: 10}); 

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle',{}); 
sr.reveal('.skills__text',{}); 
sr.reveal('.skills__data',{interval: 10}); 
sr.reveal('.skills__img',{delay: 10});

/*SCROLL WORK*/
sr.reveal('.work__img',{delay: 50}); 

/*SCROLL CONTACT*/
sr.reveal('.contact__input',{interval: 50}); 

/*SCROLL EXPERIENCE*/
sr.reveal('.exp_content_title',{interval: 50});
sr.reveal('.exp_content',{interval: 50});
sr.reveal('.exp_icon', {interval: 50});

/* Footer*/ 
sr.reveal('.footer__title', {interval:50})



// projects 3D animatinon

// const card = document.querySelector('.work__img');
// const icon = document.querySelector('.work_social_icon');

// card.addEventListener('mouseover', (e) => {
//   console.log('Hii')
//   icon.style.transform = "rotateZ(-180deg)";
// });