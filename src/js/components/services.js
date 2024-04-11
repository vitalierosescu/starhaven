import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import $ from 'jquery';

gsap.registerPlugin(ScrollTrigger);

export default function services() {
  let mm = gsap.matchMedia();

  mm.add('(min-width: 991px)', (context) => {
    gsap.defaults({ ease: 'none' });

    const service1 = document.querySelector('.services_content-item._1');
    const service2 = document.querySelector('.services_content-item._2');
    const service3 = document.querySelector('.services_content-item._3');

    const tab1 = document.querySelector('.overview_tab-button._1');
    const tab2 = document.querySelector('.overview_tab-button._2');
    const tab3 = document.querySelector('.overview_tab-button._3');

    const image = document.querySelector('.services_image');

    const sectionTrigger = document.querySelector('.services_trigger');

    let mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionTrigger,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    mainTl
      .to(service1, {
        opacity: 0,
        duration: 1,
      })
      .to(
        tab1,
        {
          opacity: 0.4,
          duration: 1,
        },
        '<'
      )
      .to(service2, {
        opacity: 1,
        duration: 1,
      })
      .to(service2, {
        opacity: 0,
        duration: 1,
      })
      .to(service3, {
        opacity: 1,
        duration: 1.5,
      });

    // image
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionTrigger,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      })
      .to(image, {
        scale: 2,
        ease: 'Quart.easeInOut',
        y: '20%',
      })
      .to(image, {
        scale: 3,
        ease: 'Quart.easeInOut',
        y: '30%',
      })
      .to(
        '.blob.is-services-bottom',
        {
          scale: 1.2,
          y: '-30%',
        },
        0
      );

    // scrollbar
    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionTrigger,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      })
      .to('.services_scroll-progress', {
        width: '100%',
      });

    /**
     * Remove window resize eventlistener
     */
    return () => {
      window.removeEventListener('resize', context.onResize);
      document.querySelector('.services_trigger').style.height = '100svh';
    };
  });
}
