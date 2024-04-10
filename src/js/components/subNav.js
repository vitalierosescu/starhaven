import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const lenis = new Lenis();

export default function subNav() {
  let mm = gsap.matchMedia(),
    breakPoint = 479;

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions;

      if (isDesktop) {
        gsap.defaults({
          ease: 'power4.out',
        });

        const subNavWrapper = document.querySelector('.sub-nav_wrapper');
        const subNav = document.querySelector('.sub-nav');
        const subNavLinks = document.querySelectorAll('.sub-nav_link');

        subNavLinks.forEach((link) => {
          const subNavScroller = (section) => {
            link.classList.contains(`is-${section}`)
              ? link.addEventListener('click', () => {
                  lenis.scrollTo(`#${section}`);
                  lenis.stop();
                })
              : null;
          };

          subNavScroller('challenges');
          subNavScroller('crew');
          subNavScroller('cases');
          subNavScroller('services');
        });

        gsap.set(subNavWrapper, { display: 'none' });

        let tl;
        tl = gsap.timeline({
          paused: true,
          onReverseComplete: () => {
            subNavWrapper.style.display = 'none';
          },
        });

        tl.from(subNav, {
          opacity: 0,
          duration: 0.4,
          yPercent: 20,
          scrollTrigger: {
            trigger: '.main-wrapper',
            onUpdate: (self) => {
              // Show & hide the navigation based on scroll direction
              if (self.direction !== self.prevDirection) {
                self.prevDirection = self.direction;
                self.direction === 1 ? tl.reverse() : tl.play();
              }
            },
          },
          onStart: () => {
            subNavWrapper.style.display = 'flex';
          },
        });
      }
    }
  );
}
