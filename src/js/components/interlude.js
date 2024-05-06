import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

//
// THIS FUNCTION IS CALLED INSIDE loader.js
//
export default function interlude() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    context => {
      const triggerElement = document.querySelector('.interlude_wrapper')

      gsap.defaults({ ease: 'none' })

      const image = document.querySelector('.interlude_image')
      const imageParent = document.querySelector('.interlude_image-parent')

      // Parallax
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: 'top bottom',
          end: 'bottom 100%',
          scrub: true,
        },
      })

      tl.from(imageParent, { clipPath: 'polygon(50% 80%, 50% 80%, 50% 80%, 50% 80%)', y: '20rem' })
        // .from(image, { scale: 0.6 }, '<')
        .to(imageParent, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' })
      // .to(image, { scale: 1.2 }, '<')

      // gsap
      //   .timeline({
      //     scrollTrigger: {
      //       trigger: '.interlude_trigger',
      //       start: 'top top',
      //       end: 'bottom top',
      //       scrub: true,
      //     },
      //   })
      //   .to('.interlude_image-parent', { y: '20vh' })
    },
  )
}
