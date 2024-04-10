import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

//
// THIS FUNCTION IS CALLED INSIDE loader.js
//
export default function hero(initialDelay) {
  let mm = gsap.matchMedia(),
    breakPoint = 479;

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions;

      gsap.defaults({
        // ease: 'Quart.easeOut',
        ease: 'smoothOut',
      });

      // Timeline
      gsap
        .timeline()
        .from(
          document.querySelectorAll('.hero_logo_letter'),
          {
            yPercent: 120,
            duration: 1.2,
            delay: initialDelay + 0.15,
            stagger: {
              each: 0.02,
              from: 'center',
            },
          },
          0
        )
        .from(
          '.hero_slogan',
          {
            yPercent: 110,
            duration: 1.5,
            delay: initialDelay + 0.7,
            stagger: 0.15,
          },
          0
        );

      // Parallax
      if (isDesktop) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.section_hero',
              start: 'top 4rem',
              end: 'bottom 60%',
              scrub: 1.2,
            },
          })
          .to('.hero_image-wrapper', {
            height: '100svh',
            width: '72%',
          })
          .to(
            '.hero_herald',
            {
              y: '-12rem',
            },
            '<'
          );
      }
    }
  );
}
