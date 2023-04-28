

//------------ HEADER HIDE AND SHOW ------------------
/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
let prevScrollpos = window.pageYOffset;
const header = document.querySelector('header');

window.addEventListener('scroll', function(){
  const currentScrollPos = window.pageYOffset;
  if(currentScrollPos > 150){
    header.classList.remove('top');
    if(prevScrollpos > currentScrollPos){
      //헤더 나타남
      header.style.top = 0
     
    }else{
      //헤더 사라짐
      header.style.top = -100 + '%';
    }
    prevScrollpos = currentScrollPos; //마우스 이동 후 스크롤 위치값 재할당
  }else{
    header.classList.add('top');
  }
});

//------------ MOBILE MENU HIDE AND SHOW------------------
const mobileMenuIcon = document.querySelector('.menu-icon');
const mobileOverlay = document.querySelector('.moblie-overlay');
const mobileCloseIcon = document.querySelector('.close-icon');
mobileMenuIcon.addEventListener('click', function(e){
  e.preventDefault(); // default original effect prevented
  mobileOverlay.classList.add('on');
  document.body.style.overflow= 'hidden'; //when menu activated, all scroll prevented
});
mobileCloseIcon.addEventListener('click', function(e){
  e.preventDefault();
  mobileOverlay.classList.remove('on');
  document.body.style.overflow= 'auto';
});

//target, currenttTarge
mobileOverlay.addEventListener('click', function(e){
//  console.log(e.target); point to clicked element
//  console.log(e.currentTarget); point to uppest element(최상위)
if(
    e.target.getAttribute('class') !== 'mobile-menus' &&
    e.target.nodeName !== 'LI' &&
    e.target.nodeName !== 'A' &&
    e.target.nodeName !== 'IMG'

  ){
    mobileOverlay.classList.remove('on');
    document.body.style.overflow= 'auto';
  }
});


//------------ BEST ITEMS SLIDE------------------
const bestArtSwiper = new Swiper('.best-image-wrapper .swiper', {
slidesPerView : 4,
spaceBetween: 15,

 // If we need pagination
 pagination: {
   el: '.swiper-pagination',
   clickable: true,
 },
 breakpoints: {
        
  480: { //480이하
    slidesPerView: 1,  //보이는 슬라이드 갯수
    slidesPerGroup: 1, //하나의 페이지네이션에 묶이는 슬라이드 갯수
  },
  786: {//768이하
    slidesPerView: 2,  //브라우저가 1024보다 클 때
    slidesPerGroup: 2,
  },
  1400: { //1400이하
    slidesPerView: 3,  //브라우저가 1024보다 클 때
    slidesPerGroup: 3,
  },
},

});


//------------ NEW ART SLIDE------------------
const newArtSwiper = new Swiper('.new-art-slider-wrapper .swiper', {
  slidesPerView : 3,
  spaceBetween: 15,
  

  //  breakpoints: {
          
  //   480: { //480이하
  //     slidesPerView: 1,  //보이는 슬라이드 갯수
  //     slidesPerGroup: 1, //하나의 페이지네이션에 묶이는 슬라이드 갯수
  //   },
  //   786: {//768이하
  //     slidesPerView: 2,  //브라우저가 1024보다 클 때
  //     slidesPerGroup: 2,
  //   },
  //   1400: { //1400이하
  //     slidesPerView: 3,  //브라우저가 1024보다 클 때
  //     slidesPerGroup: 3,
  //   },
  // },
  
  });

//---------------- MD PICK TABS ---------------------
const pickBtns = document.querySelectorAll('.pick-tab-btn');
const pickPanels = document.querySelectorAll('.pick-tab-panel');

function onTabs(i){

  pickBtns.forEach((btn) => {
   btn.classList.remove('on');

  });
  pickPanels.forEach((panel) => {
   panel.classList.remove('on');
  });
  pickBtns[i].classList.add('on');
  pickPanels[i].classList.add('on');
  
 }

 pickBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
   onTabs(idx)
  });   
 });
