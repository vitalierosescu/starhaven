export default function blob() {
  const blobChallenges = document.querySelector('.blob.is-challenges');
  const blobHero = document.querySelector('.blob.is-hero');

  const blobs = document.querySelectorAll('.blob');

  window.onpointermove = (e) => {
    const { clientX, clientY } = e;

    const challengesX = clientX / 5 + 400;
    const challengesY = clientY / 5 + 400;

    const heroX = clientX / 5 + 200;
    const heroY = clientY / 5 + 600;

    blobs.forEach((blob) => {
      blob.animate(
        {
          left: `${challengesX}px`,
          top: `${challengesY}px`,
        },
        { duration: 3000, fill: 'forwards' }
      );
    });
  };
}
