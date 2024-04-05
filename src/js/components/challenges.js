import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import addLineInner from '../utils/addlineInner';

gsap.registerPlugin(ScrollTrigger);

export default function challenges() {
  let mm = gsap.matchMedia(),
    breakPoint = 479;

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions;

      const challenges = document.querySelectorAll('.challenges_item');
      const borderLines = document.querySelectorAll('.border-line');
      if (challenges) {
        // Link timelines to scroll position
        function createScrollTrigger(triggerElement, timeline, startAnimation) {
          // Reset tl when scroll out of view past bottom of screen
          ScrollTrigger.create({
            trigger: triggerElement,
            start: 'top bottom',
            onLeaveBack: () => {
              timeline.progress(0);
              timeline.pause();
            },
          });
          // Play tl when scrolled into view (20% offset)
          ScrollTrigger.create({
            trigger: triggerElement,
            start: startAnimation,
            onEnter: () => timeline.play(),
          });
        }

        borderLines.forEach((line) => {
          let tl = gsap.timeline({ paused: true });
          tl.from(
            line,
            {
              scaleX: 0,
              duration: 1.2,
              ease: 'Quart.easeInOut',
            },
            0
          );

          createScrollTrigger(line, tl, 'top bottom');
        });

        challenges.forEach((challenge) => {
          let tl = gsap.timeline({ paused: true });
          tl.from(
            challenge.querySelectorAll('.challenges_item .subtitle'),
            {
              yPercent: 110,
              duration: 1.2,
              ease: 'Quart.easeOut',
            },
            0
          )
            .from(
              challenge.querySelectorAll('.challenges_item-title .line-inner'),
              {
                yPercent: 110,
                duration: 2,
                ease: 'Quart.easeOut',
                stagger: 0.1,
                delay: 0.4,
              },
              0
            )
            .from(
              challenge.querySelectorAll('.challenges_item p'),
              {
                y: '2rem',
                opacity: 0,
                duration: 1.2,
                ease: 'Quart.easeOut',
                stagger: 0.1,
                delay: 0.75,
              },
              0
            );

          createScrollTrigger(challenge, tl, 'top 80%');
        });
      }
    }
  );
}
