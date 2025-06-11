const veyronGroup = document.querySelector('.group.relative');
const veyronVideo = document.getElementById('veyronVideo');
const veyronImg = document.getElementById('veyronImg');
const veyronOverlay = document.getElementById('veyronOverlay');
let veyronLoaded = false;
if (veyronGroup && veyronVideo && veyronImg && veyronOverlay) {
  veyronGroup.addEventListener('mouseenter', () => {
    if (!veyronLoaded) {
      veyronOverlay.style.opacity = 0.7;
      veyronVideo.load();
      veyronLoaded = true;
      veyronVideo.addEventListener('canplay', function handler() {
        veyronOverlay.style.opacity = 0;
        veyronVideo.currentTime = 0;
        veyronVideo.play();
        veyronVideo.style.opacity = 1;
        veyronImg.style.opacity = 0;
        veyronVideo.removeEventListener('canplay', handler);
      });
    } else {
      veyronVideo.currentTime = 0;
      veyronVideo.play();
      veyronVideo.style.opacity = 1;
      veyronImg.style.opacity = 0;
    }
  });
  veyronGroup.addEventListener('mouseleave', () => {
    veyronVideo.pause();
    veyronVideo.style.opacity = 0;
    veyronImg.style.opacity = 1;
    veyronOverlay.style.opacity = 0;
  });
}

function handleCategoryScrollAnimation() {
  const animatedEls = document.querySelectorAll('.category-animate');
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15) {
      el.classList.add('category-animate-in');
    } else {
      el.classList.remove('category-animate-in');
    }
  });
}

function handleFadeInOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * 0.92 && rect.bottom > windowHeight * 0.08) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', () => {
  handleCategoryScrollAnimation();
  handleFadeInOnScroll();
});
window.addEventListener('resize', () => {
  handleCategoryScrollAnimation();
  handleFadeInOnScroll();
});
document.addEventListener('DOMContentLoaded', () => {
  handleCategoryScrollAnimation();
  handleFadeInOnScroll();
  const video = document.querySelector('video');
  if (video) {
    video.playbackRate = 0.8;
  }
});