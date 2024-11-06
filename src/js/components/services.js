import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function services() {
  let mm = gsap.matchMedia()

  mm.add('(min-width: 991px)', context => {
    gsap.defaults({ ease: 'none' })

    const services = document.querySelectorAll('.services_content-item')
    const tabs = document.querySelectorAll('.overview_tab-button')

    const image = document.querySelector('.services_image')
    const navbar = document.querySelector('.navbar_wrapper')

    const sectionComponent = document.querySelector('.services_component')
    const sectionTrigger1 = document.querySelector('.services_trigger._1')
    const sectionTrigger2 = document.querySelector('.services_trigger._2')
    const sectionTrigger3 = document.querySelector('.services_trigger._3')

    const enterAnimation = (service, tab) => {
      service.classList.add('is-active')
      tab.classList.add('is-active')
    }

    const leaveAnimation = (service, tab) => {
      service.classList.remove('is-active')
      tab.classList.remove('is-active')
    }

    // TIMELINE 1
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionTrigger1,
        start: 'top bottom',
        end: 'bottom bottom',
        onToggle: ({ self, isActive }) => {
          if (isActive) {
            enterAnimation(services[0], tabs[0])
          } else {
            leaveAnimation(services[0], tabs[0])
          }
        },
      },
    })

    // TIMELINE 2
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionTrigger2,
        start: 'top bottom',
        end: 'bottom bottom',
        onToggle: ({ self, isActive }) => {
          if (isActive) {
            setTimeout(() => {
              enterAnimation(services[1], tabs[1])
            }, 20)
          } else {
            leaveAnimation(services[1], tabs[1])
          }
        },
      },
    })

    // TIMELINE 3
    gsap.timeline({
      scrollTrigger: {
        trigger: sectionTrigger3,
        start: 'top bottom',
        end: 'bottom bottom',
        onToggle: ({ self, isActive }) => {
          if (isActive) {
            setTimeout(() => {
              enterAnimation(services[2], tabs[2])
            }, 100)
          } else {
            leaveAnimation(services[2], tabs[2])
          }
        },
        onLeave: () => {
          enterAnimation(services[2], tabs[2])
        },
      },
    })

    // hide NAV
    let navTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionComponent,
        start: 'top top',
        end: 'bottom 50%',
        onToggle: ({ self, isActive }) => {
          if (isActive) {
            console.log('section is active')
            navTl.play
          } else {
            console.log('section is NOT active')
            navTl.reverse()
          }
        },
        onEnter: () => {
          navTl.play()
        },
      },
    })

    navTl
      .to(navbar, {
        opacity: 0,
        duration: 0.5,
      })
      .to(navbar, {
        duration: 0,
        pointerEvents: 'none',
      })

    // image
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionComponent,
          start: 'top bottom',
          end: 'bottom 80%',
          scrub: true,
        },
      })
      .fromTo(
        image,
        { rotateZ: '150deg' },
        {
          scale: 1.5,
          ease: 'Quart.easeInOut',
          y: '20%',
          rotateZ: '0',
        },
      )
      .to(image, {
        scale: 2.5,
        ease: 'Quart.easeInOut',
        y: '30%',
      })

    // blob
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionComponent,
          start: 'top bottom',
          end: 'bottom -40%',
          scrub: true,
        },
      })
      .fromTo(
        '.blob.is-services-bottom',
        { scale: 0.8, y: '-50%' },
        {
          y: '40%',
          scale: 1,
        },
      )

    // scrollbar
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionComponent,
          start: 'top 20%',
          end: 'bottom bottom',
          scrub: true,
        },
      })
      .to('.services_scroll-progress', {
        width: '100%',
      })

    /**
     * Remove window resize eventlistener
     */
    return () => {
      window.removeEventListener('resize', context.onResize)
      document.querySelector('.services_trigger').style.height = '100svh'
    }
  })
}
