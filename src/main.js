import './styles/style.css';
import gsap from 'gsap';
import { CustomEase, ScrollTrigger } from 'gsap/all';
import blob from './js/components/blob';
import challenges from './js/components/challenges';
import loader from './js/components/loader';
import cases from './js/components/cases';
import press from './js/components/press';
import SplitType from 'split-type';
import addLineInner from './js/utils/addlineInner';
import interlude from './js/components/interlude';
import subNav from './js/components/subNav';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create('smoothOut', '.39,0,.22,1');

const lenis = new Lenis();

setTimeout(() => {
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1200);
  });

  gsap.ticker.lagSmoothing(0);
}, 50);

// Split the element with attribute [split-type]
new SplitType('[split-type]', { types: 'lines', tagName: 'span' });

// Custom easing
// CustomEase.create('magnus-opus', '0.49, 0.03, 0.13, 0.99)');

$('[split-type]').each(function (index) {
  gsap.set($(this), { autoAlpha: 1 });
  let textEl = $(this);

  addLineInner(textEl);
});

setTimeout(() => {
  $('[lines-slide-up]').each(function (index) {
    let textEl = $(this);
    let textContent = $(this).text();
    let tl;

    function animateHeadings() {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: textEl,
          start: 'top bottom',
          end: 'bottom bottom',
          toggleActions: 'none play none reset',
        },
      });
      tl.fromTo(
        textEl.find('.line-inner'),
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          stagger: { amount: 0.1, ease: 'smoothOut' },
        }
      );
    }
    animateHeadings();

    // let windowWidth = window.innerWidth;
    // window.addEventListener('resize', function () {
    //   if (windowWidth !== window.innerWidth) {
    //     windowWidth = window.innerWidth;
    //     tl.kill();
    //     textEl.text(textContent);
    //     animateHeadings();
    //   }
    // });
  });
}, 700);

loader();
// blob();
challenges();
// cases();
press();
interlude();
subNav();
