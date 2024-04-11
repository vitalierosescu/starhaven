import gsap from 'gsap';
import hero from './hero';

export default function loader() {
  // Initialize the counter and loader duration variables
  let counter = {
    value: 0,
  };
  let loaderDuration = 3;

  // Check if this is not the first time the user has visited this page
  if (sessionStorage.getItem('visited') !== null) {
    // If so, set the loader duration to 1 second and the counter value to 75
    loaderDuration = 1.5;
    counter = {
      value: 75,
    };
  }

  window.addEventListener('resize', () => {
    const loaderComponent = document.querySelector('.loader4_component');
    if (loaderComponent) {
      loaderComponent.style.display = 'none';
    }
  });

  // Set the visited item in the session storage to "true"
  sessionStorage.setItem('visited', 'true');

  // Define a function to update the loader text
  function updateLoaderText() {
    let progress = Math.round(counter.value);
    $('.loader_text.is-number').text(progress);
  }

  // Define a function to end the loader animation
  function endLoaderAnimation() {
    $('.loader4_ix-trigger').click();
  }

  // Create a timeline animation using the GreenSock Animation Platform (GSAP)
  let tl = gsap.timeline({
    onComplete: endLoaderAnimation,
  });

  // Animate the counter value from 0 to 100 with the defined custom ease animation
  tl.to(counter, {
    value: 100,
    onUpdate: updateLoaderText,
    duration: loaderDuration,
    ease: 'Quart.easeInOut',
  });

  // Animate the width of the loader progress bar to 100% with the defined custom ease animation
  const loaders = document.querySelectorAll('.loader4_progress-bar-parent');
  loaders.forEach((loader, index) => {
    loader.style.opacity = `${0.8 - index * 0.08}`;
    console.log(loader.style.opacity);
  });

  if (document.querySelector('.loader4_progress-bar-parent')) {
    loaders.forEach((loader, index) => {
      gsap.to(loader, {
        x: '99%',
        duration: loaderDuration - 0.2 + index * 0.08,
        ease: 'Quart.easeInOut',
      });
    });
  }

  hero(loaderDuration + 1);
}
