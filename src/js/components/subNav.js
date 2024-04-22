import gsap from 'gsap';
import { ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

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

        let initialDirection = false;

        // Scroll Direction
        ScrollTrigger.create({
          trigger: '.page-wrapper',
          start: 'top -600px',
          end: 'bottom bottom',
          onUpdate: (self) => {
            if (self.direction !== self.prevDirection) {
              if (initialDirection === false) {
                initialDirection = true;
                self.direction = -1;
              }
              gsap.to(subNav, {
                y: self.direction === -1 ? '0%' : '-120%',
                opacity: self.direction === -1 ? 1 : 0,
                duration: 1,
                ease: 'smoothOut',
                onStart: () => {
                  // scrolling up
                  if (self.direction === -1) {
                    gsap.set(subNavWrapper, { display: 'flex' });
                  }
                },
                onComplete: () => {
                  // scrolling down
                  if (self.direction === 1) {
                    gsap.set(subNavWrapper, { display: 'none' });
                  }
                },
              });
              self.prevDirection = self.direction;
            }
          },
        });
      }
    }
  );
}
