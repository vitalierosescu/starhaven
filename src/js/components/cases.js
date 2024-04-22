import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

export default function cases() {
  let mm = gsap.matchMedia(),
    breakPoint = 479;

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions;

      const cases = [...document.querySelectorAll('.cases_item.is-1')];
      const overlay = document.querySelector('.cases_item-overlay');

      const setZIndex = (reverse, currentItem) => {
        cases.forEach((item) => {
          gsap.set(item, { zIndex: reverse ? 5 : 3 });
        });
        gsap.set(currentItem, { zIndex: 5 });
      };

      cases.forEach((caseItem) => {
        let q = gsap.utils.selector(caseItem);

        // HOVER TIMELINE
        let hoverTl = gsap.timeline({
          defaults: { duration: 1 },
          paused: true,
        });
        hoverTl
          .fromTo(
            caseItem,
            {
              y: '0rem',
            },
            {
              y: '-1rem',
              ease: 'Quart.easeOut',
            }
          )
          .to(
            q('.cases_item-image'),
            {
              opacity: 1,
              stagger: 0,
              duration: 0.4,
            },
            0
          )
          .from(
            q('.cases_item-title'),
            {
              y: '100%',
              ease: 'smoothOut',
            },
            0
          );

        // CLICK TIMELINE
        let clickTl = gsap.timeline({
          defaults: { ease: 'smoothOut' },
          paused: true,
        });
        clickTl
          .to(caseItem, {
            width: '800%',
            duration: 1.2,
          })
          .from(
            q('.cases_item-title-inner .line-inner'),
            {
              y: '102%',
              duration: 1,
              stagger: 0.1,
            },
            0
          )
          .fromTo(
            '.cases_close',
            {
              opacity: 0,
              display: 'none',
              y: '1rem',
            },
            {
              opacity: 1,
              display: 'block',
              y: '0rem',
            },
            0
          )
          .from(
            q('.cases_item-text'),
            {
              opacity: 0,
              y: '2rem',
              onComplete: () => {
                gsap.set(q('.cases_item-content'), { overflow: 'scroll' });
                caseItem
                  .querySelector('.cases_item-content')
                  .setAttribute('data-lenis-prevent', '');
              },
            },
            '<.4'
          )
          .fromTo(overlay, { opacity: 0 }, { opacity: 1 }, 0);

        const closeOverlay = () => {
          clickTl.reverse();
          setTimeout(() => {
            setZIndex(true, caseItem);
            gsap.set(overlay, { display: 'none' });
          }, 1000);
          gsap.set(q('.cases_item-content'), { overflow: 'hidden' });
          caseItem
            .querySelector('.cases_item-content')
            .removeAttribute('data-lenis-prevent');
        };

        // close overlay
        overlay.addEventListener('click', (e) => {
          closeOverlay();
        });

        // close overlay
        document
          .querySelector('.cases_close')
          .addEventListener('click', (e) => {
            closeOverlay();
          });

        caseItem.addEventListener('click', (e) => {
          clickTl.play();
          gsap.set(overlay, { display: 'block' });
          setZIndex(false, caseItem);
        });

        // HOVER eventlisteners
        caseItem.addEventListener('mouseenter', () => {
          hoverTl.play();
          //   gsap.to(hoverTl, {
          //     time: hoverTl.duration(),
          //   });
        });
        caseItem.addEventListener('mouseleave', () => {
          hoverTl.reverse();
          //   gsap.to(hoverTl, {
          //     time: 0,
          //     duration: 0.3,
          //     ease: 'smoothOut',
          //     overwrite: true,
          //   });
        });
      });
    }
  );
}
