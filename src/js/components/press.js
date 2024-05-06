import gsap from 'gsap'
import { ScrollTrigger, CustomEase } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, CustomEase)

export default function press() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  // CustomEase.create('custom1', '0.49, 0.03, 0.13, 0.99)');

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    context => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions

      gsap.defaults({
        ease: 'power1.out',
        stagger: 0.4,
      })

      // const oddOrEven = (target, value) => {
      //   if (target.classList.contains('is-even')) {
      //     return `-${value}%`
      //   } else {
      //     return `${value}%`
      //   }
      // }

      gsap.set('.press_card.is-even', { transformOrigin: 'bottom left' })

      // Parallax
      gsap
        .timeline()
        .from('.press_card.is-odd', {
          x: isDesktop ? '-20rem' : '-4rem',
          rotateZ: isDesktop ? -12 : 0,
          opacity: 0,
          yPercent: 10,
          scrollTrigger: {
            trigger: '.section_press',
            start: 'top bottom',
            end: 'bottom 80%',
            scrub: true,
          },
        })
        .from(
          '.press_card.is-even',
          {
            x: isDesktop ? '24rem' : '4rem',
            rotateZ: isDesktop ? 12 : 0,
            opacity: 0,
            yPercent: 10,
            scrollTrigger: {
              trigger: '.section_press',
              start: 'top 80%',
              end: 'bottom 50%',
              scrub: true,
            },
          },
          '0',
        )
    },
  )
}
