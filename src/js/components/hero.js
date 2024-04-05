import gsap from 'gsap';
import { ScrollTrigger, CustomEase } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CustomEase);

//
// THIS FUNCTION IS CALLED INSIDE loader.js
//
export default function hero(initialDelay) {
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

      gsap.defaults({
        ease: 'Quart.easeInOut',
      });

      // Timeline
      gsap
        .timeline()
        .from(
          document.querySelectorAll('.hero_logo_letter'),
          {
            yPercent: 110,
            duration: 2,
            delay: initialDelay,
            stagger: {
              each: 0.05,
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
            stagger: 0.1,
          },
          0
        )
        .fromTo(
          '.hero_image-wrapper',
          {
            // height: '80%',
            // width: '80%',
            immediateRender: false,
            delay: initialDelay + 0.8,
            borderRadius: '40rem 40rem 0 0',
          },
          {
            duration: 3,
            ease: 'Quart.easeOut',
          },
          0
        );

      // Parallax
      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.section_hero',
            start: 'top 10%',
            end: 'bottom 60%',
            scrub: 1.2,
          },
        })
        .to('.hero_image-wrapper', {
          height: '100vh',
          width: '72%',
          ease: 'custom1',
        })
        .to(
          '.hero_herald',
          {
            y: '-12%',
            x: '-46%',
            scale: 1.1,
          },
          '<'
        );
    }
  );
}
