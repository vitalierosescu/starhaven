import gsap from 'gsap';
import { ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

//
// THIS FUNCTION IS CALLED INSIDE loader.js
//
export default function interlude() {
  let mm = gsap.matchMedia(),
    breakPoint = 479;

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions;

      const triggerElement = document.querySelector('.interlude_wrapper');

      gsap.defaults({ ease: 'none' });

      const image = document.querySelector('.interlude_image');
      const imageParent = document.querySelector('.interlude_image-parent');
      const imageChild = document.querySelector('.interlude_image-child');

      const imageFade = document.querySelector('.interlude_fade');

      // Parallax
      gsap
        .timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: 'top bottom',
            end: 'bottom 120%',
            scrub: true,
          },
        })
        .fromTo(
          imageParent,
          {
            width: '0%',
            height: '0%',
            y: '20rem',
          },
          {
            width: '20%',
            height: '50%',
            y: '0rem',
          }
        )
        .fromTo(
          image,
          {
            width: '80vw',
            height: '80vh',
          },
          {
            width: '140vw',
            height: '140vh',
          },
          '<'
        )
        .to(imageParent, {
          width: '100%',
          height: '100%',
        })
        .fromTo(imageFade, { height: '200%' }, { height: '100%' }, '<')
        .to(
          imageChild,
          {
            width: '100vw',
          },
          '<'
        )
        .to(
          image,
          {
            width: '120vw',
            height: '120vh',
          },
          '<'
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.interlude_trigger',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to('.interlude_image-parent', { y: '20vh' });
    }
  );
}
