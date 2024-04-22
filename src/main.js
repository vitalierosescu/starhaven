import './styles/style.css';
import gsap from 'gsap';
import { CustomEase, ScrollTrigger } from 'gsap/all';
import challenges from './js/components/challenges';
import loader from './js/components/loader';
import press from './js/components/press';
import cases from './js/components/cases';
import services from './js/components/services';
import SplitType from 'split-type';
import addLineInner from './js/utils/addlineInner';
import interlude from './js/components/interlude';
import subNav from './js/components/subNav';

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create('smoothOut', '.39,0,.22,1');

new SplitType('[split-type]', { types: 'lines', tagName: 'span' });

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
        { yPercent: 105 },
        {
          yPercent: 5,
          duration: 1,
          ease: 'smoothOut',
          stagger: { amount: 0.1 },
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

challenges();
press();
interlude();
subNav();
services();
cases();
