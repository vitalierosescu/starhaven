import gsap from 'gsap';
import { ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

//
// THIS FUNCTION IS CALLED INSIDE loader.js
//
export default function interlude() {
  let mm = gsap.matchMedia(),
    breakPoint = 479;

  CustomEase.create('custom1', '0.49, 0.03, 0.13, 0.99)');

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions;

      const triggerElement = document.querySelector('.interlude_wrapper');

      // Parallax
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom',
            end: 'bottom 70%',
            scrub: true,
          },
        })
        .fromTo(
          '.interlude_image-child',
          {
            width: '0%',
          },
          {
            width: '50%',
          }
        )
        .to('.interlude_image-parent', {
          height: '100%',
        })
        .to(
          '.interlude_image-child',
          {
            width: '100%',
            height: '100%',
          },
          '<'
        )
        .to(
          '.interlude_image',
          {
            width: '100%',
            height: '100%',
          },
          '<'
        );

      //   gsap.from('.section_services', {
      //     y: '-120vh',
      //     duration: 4,
      //     scrollTrigger: {
      //       trigger: '.interlude_trigger',
      //       start: 'top bottom',
      //       end: 'bottom bottom',
      //       scrub: true,
      //     },
      //   });
    }
  );
}
