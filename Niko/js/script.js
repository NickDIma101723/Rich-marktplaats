const veyronGroups = document.querySelectorAll('.group.relative, .relative.group');

veyronGroups.forEach(veyronGroup => {
  const veyronVideo = veyronGroup.querySelector('.category-video');
  const veyronImg = veyronGroup.querySelector('.category-img');
  const veyronOverlay = veyronGroup.querySelector('.category-overlay');
  let veyronLoaded = false;
  let isHovering = false;

  if (veyronVideo && veyronImg && veyronOverlay) {
    veyronGroup.addEventListener('mouseenter', () => {
      isHovering = true;
      veyronOverlay.style.opacity = 0.7;
      if (!veyronLoaded) {
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
        veyronOverlay.style.opacity = 0;
      }
    });

    veyronGroup.addEventListener('mouseleave', () => {
      isHovering = false;
      veyronVideo.pause();
      veyronVideo.style.opacity = 0;
      veyronImg.style.opacity = 1;
      veyronOverlay.style.opacity = 0;
    });

    veyronVideo.addEventListener('error', () => {
      veyronImg.style.opacity = 1;
      veyronVideo.style.opacity = 0;
      veyronOverlay.style.opacity = 0;
      isHovering = false;
    });
  }
});

// Fade-in on scroll logic for all fade-in elements
function handleFadeInOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
      // Optionally reset opacity if not being hovered
      const parentSection = el.closest('.group.relative, .relative.group');
      if (parentSection && !parentSection.matches(':hover')) {
        if (el.classList.contains('category-img')) el.style.opacity = 1;
        if (el.classList.contains('category-video')) el.style.opacity = 0;
        if (el.classList.contains('category-overlay')) el.style.opacity = 0;
      }
    }
  });
}

// Animation logic for category-animate elements
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

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Event listeners
window.addEventListener('scroll', debounce(() => {
  handleCategoryScrollAnimation();
  handleFadeInOnScroll();
}, 50));

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