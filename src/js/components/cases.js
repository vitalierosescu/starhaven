import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function cases() {
  // Variables
  let totalSlides = $('.slider_item').length;
  let moveDistance = (totalSlides - 1) * -100;

  // number slider
  let tl = gsap.timeline({
    paused: true,
    onUpdate: () => {
      let progressNumber = tl.progress().toFixed(1) * moveDistance;
      let toWhole = Math.round(progressNumber / 100) * 100;
      $('.numbers_list').css('transform', `translateY(${toWhole}%)`);

      currSlide = Math.round(-toWhole / 100);
    },
  });
  // if ($('.slider_list')) {
  //   console.log('sliderlist is here');
  //   tl.to('.slider_list', {
  //     xPercent: moveDistance,
  //     ease: 'none',
  //   });
  // }

  // cases
  gsap.set('.overview_content-item', { opacity: '0' });
  gsap.set('.overview_img-item', { opacity: '0' });
  // services
  gsap.set('.services_content-item', { opacity: '0' });

  $("[tr-scroll-toggle='component']").each(function (index) {
    // get elements
    let component = $(this);
    let lists = component.find("[tr-scroll-toggle='list']");
    // set item total
    let itemTotal = lists.first().children().length;
    if (document.querySelector('[tr-scroll-toggle="number-total"]')) {
      component.find("[tr-scroll-toggle='number-total']").text(itemTotal);
    }
    // create trigger divs & spacer
    let firstTrigger = component.find("[tr-scroll-toggle='trigger']").first();
    for (let i = 1; i < itemTotal; i++) {
      firstTrigger.clone().appendTo(component);
    }
    let triggers = component.find("[tr-scroll-toggle='trigger']");
    firstTrigger.css('margin-top', '-100vh');
    let trSpacer = $(
      "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>"
    )
      .hide()
      .appendTo(component);
    // check for min width
    let minWidth = 0;
    let trMinWidth = component.attr('tr-min-width');
    if (trMinWidth !== undefined && trMinWidth !== false) {
      minWidth = +trMinWidth;
    }

    gsap.defaults({
      ease: 'Quart.easeInOut',
    });
    // main breakpoint
    gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
      // show spacer
      trSpacer.show();
      // switch which item is active
      function makeItemActive(activeIndex) {
        component
          .find("[tr-scroll-toggle='transform-y']")
          .css('transform', `translateY(${activeIndex * -100}%)`);
        component
          .find("[tr-scroll-toggle='transform-x']")
          .css('transform', `translateX(${activeIndex * -100}%)`);
        component
          .find("[tr-scroll-toggle='number-current']")
          .text(activeIndex + 1);
        lists.each(function (index) {
          $(this).children().removeClass('is-active');
          $(this).children().eq(activeIndex).addClass('is-active');
        });
      }
      makeItemActive(0);
      // scroll to trigger div on click of anchor
      let anchorLinks = component.find('[tr-anchors]').children();
      anchorLinks.on('click', function () {
        let myIndex = $(this).index();
        let scrollDistance =
          triggers.eq(myIndex).offset().top + triggers.eq(myIndex).height() - 1;
        $('html, body').animate({ scrollTop: scrollDistance });
      });
      // triggers timeline
      triggers.each(function (index) {
        let triggerIndex = index;
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onToggle: ({ self, isActive }) => {
              if (isActive) {
                makeItemActive(triggerIndex);
              }
            },
          },
          defaults: {
            ease: 'none',
          },
        });
        lists.each(function () {
          let childItem = $(this).children().eq(triggerIndex);
          // tl.to(
          //   childItem.find("[tr-item-animation='scale-to-1']"),
          //   { scale: 1 },
          //   0
          // );
          // tl.from(
          //   childItem.find("[tr-item-animation='scale-from-1']"),
          //   { scale: 1 },
          //   0
          // );
          // tl.to(
          //   childItem.find("[tr-item-animation='progress-horizontal']"),
          //   { width: '100%' },
          //   0
          // );
          // tl.to(
          //   childItem.find("[tr-item-animation='progress-vertical']"),
          //   { height: '100%' },
          //   0
          // );
        });
      });
      // component timeline
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        defaults: {
          ease: 'none',
        },
      });
      tl.to(
        component.find("[tr-section-animation='scale-to-1']"),
        { scale: 1 },
        0
      );
      tl.from(
        component.find("[tr-section-animation='scale-from-1']"),
        { scale: 1 },
        0
      );
      tl.to(
        component.find("[tr-section-animation='progress-horizontal']"),
        { width: '100%' },
        0
      );
      tl.to(
        component.find("[tr-section-animation='progress-vertical']"),
        { height: '100%' },
        0
      );

      // smaller screen sizes
      return () => {
        trSpacer.hide();
        component
          .find("[tr-scroll-toggle='transform-y']")
          .css('transform', 'translateY(0%)');
        component
          .find("[tr-scroll-toggle='transform-x']")
          .css('transform', 'translateX(0%)');
        lists.each(function (index) {
          $(this).children().removeClass('is-active');
        });
      };
    });
  });
}

/**
 * CASES TEXT SWITCH
 */

// Splitting.js
// Calling the Splitting function to split the text into individual words/characters,
// const splittingOutput = Splitting();

// // .content__text elements
// const texts = [...document.querySelectorAll('.content__text')];

// // Cache all .char elements at the beginning. Each text contains multiple words, each word contains multiple chars.
// const chars = texts.map((text) => {
//   // Get the words for each text
//   const words = text.querySelectorAll('.word');
//   // For each word, get the chars
//   return [...words].map((word) => word.querySelectorAll('.char'));
// });

// // Let's define the position of the current text
// let currentTextPos = 0;

// // Check if there's an animation in progress
// let isAnimating = false;

// // Add class current to the "current" one
// texts[currentTextPos].classList.add('content__text--current');

// // switch between texts
// const switchTexts = () => {
//   if (isAnimating) return false;
//   isAnimating = true;

//   const upcomingTextPos = currentTextPos ? 0 : 1;

//   // All current text words
//   const currentWords = splittingOutput[currentTextPos].words;

//   // All upcoming text words
//   const upcomingtWords = splittingOutput[upcomingTextPos].words;

//   const tl = gsap.timeline({
//     onComplete: () => {
//       // Update currentTextPos
//       currentTextPos = upcomingTextPos;
//       isAnimating = false;
//     },
//   });
//   currentWords.forEach((_, wordIndex) => {
//     const wordTimeline = gsap.timeline().fromTo(
//       chars[currentTextPos][wordIndex],
//       {
//         willChange: 'transform',
//         transformOrigin: '50% 0%',
//         scaleY: 1,
//       },
//       {
//         duration: 0.3,
//         ease: 'sine.in',
//         scaleY: 0,
//         stagger: {
//           each: 0.02,
//           from: 'start',
//         },
//       }
//     );
//     tl.add(wordTimeline, wordIndex * 0.015);
//   });

//   tl.add(() => {
//     texts[currentTextPos].classList.remove('content__text--current');
//   });
//   tl.add(() => {
//     texts[upcomingTextPos].classList.add('content__text--current');
//   }, '>-=0.6').addLabel('previous', '>');

//   upcomingtWords.forEach((_, wordIndex) => {
//     const wordTimeline = gsap.timeline().fromTo(
//       chars[upcomingTextPos][wordIndex],
//       {
//         willChange: 'transform',
//         transformOrigin: '50% 100%',
//         scaleY: 0,
//       },
//       {
//         duration: 0.3,
//         ease: 'power4',
//         scaleY: 1,
//         stagger: {
//           each: 0.015,
//           from: 'start',
//         },
//       }
//     );
//     tl.add(wordTimeline, `previous+=${wordIndex * 0.015}`);
//   });
// };

// document.querySelector('.trigger').addEventListener('click', switchTexts);

// // Start preloading fonts
// preloadFonts('wah6sge').then(() => {
//   // Once fonts are loaded, remove the 'loading' class from the body, ending the loading state
//   document.body.classList.remove('loading');
// });
