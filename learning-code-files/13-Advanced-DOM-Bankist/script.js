'use strict';

// ! Modal window - saved variables of different parts of the application.
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const message = document.createElement('div'); //DOM Object
const h1 = document.querySelector('h1'); //
const tabs = document.querySelectorAll('.operations__tab'); // parent
const tabsContainer = document.querySelector('.operations__tab-container'); // child
const tabsContent = document.querySelectorAll('.operations__content'); // child1
const nav = document.querySelector('.nav');
const navHeight = nav.getBoundingClientRect().height;

const openModal = function (e) {
  e.preventDefault(); // prevention of reloading
  modal.classList.remove('hidden'); // remove the hidden class from modal
  overlay.classList.remove('hidden'); // remove the hidden class from overlay
};

const closeModal = function () {
  modal.classList.add('hidden'); // add 'hidden' class to modal
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', closeModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ! Implementing Smooth scrolling
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

buttonScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // * position of class or id using DOM
  // console.log(s1coords); // DOMRect { x: 0, y: 992, width: 1210, height: 1396.699951171875, etc }
  // console.log(e.target.getBoundingClientRect()); // DOMRect { x: 30} 30 px below

  // * calculating scroll position
  console.log(
    'Current scroll position:',
    window.pageXOffset,
    window.pageYOffset
  );

  // * calculating screen size
  console.log(
    'height/width viewport:',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  /* // Old Way
  //scroll to
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  ); // Absolute position relative to document: position + any additional scroll

  //smoothness
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  }); // * old school way, manual calculation
*/
  section1.scrollIntoView({ behavior: 'smooth' }); // * modern way, automatic calculation
});

// console.log(getComputedStyle(message).height);

// ! Page Navigation - event delgation
// * 1) add event listener to a common parent element of all the elements we're intereted in
// * 2) determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); // prevents any default events like going to anchor in this case
  // console.log(e.target); // * * we find that we don't need 'nav_links'

  // ! Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    // console.log('link clicked');
    const id = e.target.getAttribute('href'); // #section--1 to #section--3
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // scroll for each attribute.
    // above is the same as const section1 = document.querySelector('#section--1'); etc
    // node list of all elements
  }
});

// document.querySelectorAll('.nav__link').forEach(function (el) { // for each node in element
//   el.addEventListener('click', function (e) { // click event listener
//     e.preventDefault(); // prevents any default events like going to anchor in this case
//     const id = this.getAttribute('href'); // #section--1 to 3
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }) // scroll for each attribute.
//   })// above is the same as const section1 = document.querySelector('#section--1');
// }) // node list of all elements

// ! Tabbed component (in parent order)
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // closest parent to .operations__tab
  // i.e. every child of operations__tab clicked with also be handled as the parent selected.

  if (!clicked) return;
  // ^ ES6: guard clause - return early if certain condition is matched

  // Removing activated content
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

  //Active Tab movement when clicked
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); // displays grid
});

// ! Menu Fade Animation (pass arguments into event handlers)
// 'mouse over' bubbles whereas 'mouse enter 'doesn't

const handleFade = function (e) {
  // function to handle fade opacity (refactored)
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      // opacity change for Features, Operations etc.
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passing "argument" into handler
//js expects a callback function, but we use bind method creates copy of function that's passed on
nav.addEventListener('mouseover', handleFade.bind(0.5));
nav.addEventListener('mouseout', handleFade.bind(1));

// * .this (current target) is 1 or 0.5
// * if we want more than one argument we can use an array of arguments

// ! Sticky NAV -  using intersection observer API
const obsOptions = {
  root: null, // element that the target (section1) is intersecting: viewport
  threshold: 0, // Triggers when viewport is out of view (for 0)
  rootMargin: `-${navHeight}px`, // box of ?px that will be applied outside target element (header)
};

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting)
    nav.classList.add('sticky'); // when not intersecting, sticky class
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, obsOptions);
headerObserver.observe(header);

// ! Revealing sections using intersection observer API

// * 1 Selecting each section into variable
const allSections = document.querySelectorAll('section');

// * 3 Callback function when intersection occurs.
const revealSection = (entries, observer) => {
  const [entry] = entries; // destructuring all entries to each entry
  // console.log(entry); // useful for debugging

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden'); // visible when scrolled to not intersecting
  observer.unobserve(entry.target); // stops observing all entries after shown
};

// * 2 Creating intersection observer for section
const sectionObserver = new IntersectionObserver(revealSection, {
  // function above^
  root: null, //viewport
  threshold: 0.15, // threshold of 15% before the section is visible
});

// * 4 Adding forEach section the 'class' and 'observe' to each section.
allSections.forEach((section) => {
  sectionObserver.observe(section); // calls observer for each section
  section.classList.add('section--hidden'); // ? makes every section hidden to begin with
});

// ! Lazy loading images
// * Selecting every data img[data-src] (full res)
const imgTargets = document.querySelectorAll('img[data-src]'); // data that has pics we want to load
// * Callback for observer
const loadImg = function (entries, observer) {
  // observer function
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  // * Replace src with data src when reaches img
  entry.target.src = entry.target.dataset.src; // changes target pic to higher resolution pic;
  entry.target.addEventListener('load', () => {
    // blur only dissapears after higher res pic loaded, remove lazy class
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px', // loads quicker than we reach.
}); // new observer for loading +res

imgTargets.forEach((img) => imgObserver.observe(img)); // for each image - observe

// ! Slider functionality for section 3
// * important variables to use from section
const slider = () => {
  const slides = document.querySelectorAll('.slide'); // each slide in slideshow
  const slider = document.querySelector('.slider'); // slider
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0; // starting slide number
  const maxSlide = slides.length; // maximum slide number we can turn to
  const dotContainer = document.querySelector('.dots');

  // ? slider functions
  const createDots = () => {
    // creating dots shapes
    slides.forEach((_, i) => {
      // for each number of slides...
      dotContainer.insertAdjacentHTML(
        // add html for slide buttons
        'beforeend',
        `<button class ="dots__dot" data-slide="${i}"></button>`
      );
    }); //b4end = lastchild
  };

  // * Transforming every slide to be next to each slide
  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) =>
        // for each slide, index
        (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    ); // slide style transform by 100 percent * slide n - zero based
  };

  // * Showing the dot color corresponding to the active slide
  const activateDot = (slide) => {
    document
      .querySelectorAll('.dots__dot') // for the dots__dot class
      .forEach((dot) => dot.classList.remove('dots__dot--active')); // remove active dot from all
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`) // for the data-slide that's active
      .classList.add('dots__dot--active'); // make the slide dot active colour.
  };

  // * Going to next Slide
  const nextSlide = () => {
    if (curSlide === maxSlide - 1) {
      // loops back to beginning slide
      // -1 for zero based
      curSlide = 0;
    } else curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // * Going to previous Slide
  const prevSlide = () => {
    // loops back to furthest slide
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide(); // if hit arrow left key then show previous slide
    e.key === 'ArrowRight' && nextSlide(); // short circuiting version
  });

  // * click function for dots slides
  dotContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = +e.target.dataset.slide; // selecting data-slide
      goToSlide(curSlide);
      activateDot(curSlide);
      /* other method 
    const { slide } = e.target.dataset; // selecting data-slide
    goToSlide(slide); // doesn't work because type string
    */
    }
  });

  const init = () => {
    // * inital setup
    goToSlide(0); // every page reload moves us to slide 0(1)
    createDots(); // every page reload the sliding dots will show the
    activateDot(0); // every page reload the first active dot shows corresponding to active slide.
  };
  init();
};
slider(); // ? good practise to keep independent functionality in it's own function.

// ! Life Cycle DOM Event
/*
// showing when dom is ready to
document.addEventListener('DOMContentLoaded', e => {
  console.log('HTML parsed and DOM tree built!', e);
}); // * Shows when DOM is loaded successfully

window.addEventListener('load', e => {
  console.log('page fully loaded', e);
}); // * Shows when page is loaded - loadtime is shown in the network tab.

window.addEventListener('beforeunload', e => {
  e.preventDefault();
  console.log(e);
  // e.returnvalue = '';
}); // * prompts when user is about to leave the page
*/
