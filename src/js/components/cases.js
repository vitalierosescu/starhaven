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
          defaults: { ease: 'none' },
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
              duration: 1.2,
              ease: 'Quart.easeOut',
            }
          )
          .from(
            q('.cases_item-title'),
            {
              y: '100%',
              duration: 1.2,
              ease: 'smoothOut',
            },
            '<'
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

        // close overlay
        overlay.addEventListener('click', (e) => {
          clickTl.reverse();
          setTimeout(() => {
            setZIndex(true, caseItem);
            gsap.set(overlay, { display: 'none' });
          }, 1000);
          gsap.set(q('.cases_item-content'), { overflow: 'hidden' });
        });

        caseItem.addEventListener('click', (e) => {
          clickTl.play();
          gsap.set(overlay, { display: 'block' });
          setZIndex(false, caseItem);
        });

        // HOVER eventlisteners
        caseItem.addEventListener('mouseenter', () => {
          gsap.to(hoverTl, {
            time: hoverTl.duration(),
          });
        });
        caseItem.addEventListener('mouseleave', () => {
          gsap.to(hoverTl, {
            time: 0,
            duration: 0.3,
            ease: 'smoothOut',
            overwrite: true,
          });
        });
      });
    }
  );
}
