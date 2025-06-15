document.querySelectorAll('.category-section').forEach(section => {
  const img = section.querySelector('.category-img');
  const video = section.querySelector('.category-video');
  section.addEventListener('mouseenter', () => {
    if (video) {
      video.classList.remove('opacity-0');
      video.classList.add('opacity-100');
      video.play();
    }
    if (img) {
      img.classList.add('opacity-0');
    }
  });
  section.addEventListener('mouseleave', () => {
    if (video) {
      video.classList.remove('opacity-100');
      video.classList.add('opacity-0');
      video.pause();
      video.currentTime = 0;
    }
    if (img) {
      img.classList.remove('opacity-0');
    }
  });
});