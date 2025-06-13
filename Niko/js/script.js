const veyronGroup = document.querySelector('.group.relative, .relative.group');
const veyronVideo = document.getElementById('veyronVideo');
const veyronImg = document.getElementById('veyronImg');
const veyronOverlay = document.getElementById('veyronOverlay');
let veyronLoaded = false;
let isHovering = false;

if (veyronGroup && veyronVideo && veyronImg && veyronOverlay) {
  veyronGroup.addEventListener('mouseenter', () => {
    isHovering = true;
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
    isHovering = false;
    veyronVideo.pause();
    veyronVideo.style.opacity = 0;
    veyronImg.style.opacity = 1;
    veyronOverlay.style.opacity = 0;
  });

  // Fallback for video errors
  veyronVideo.addEventListener('error', () => {
    veyronImg.style.opacity = 1;
    veyronVideo.style.opacity = 0;
    veyronOverlay.style.opacity = 0;
    isHovering = false;
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
    if (rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2) {
      el.classList.add('visible');
      if (el.id === 'veyronImg' && !isHovering) {
        // Use setTimeout to stabilize transitions
        setTimeout(() => {
          if (!isHovering) { // Double-check hover state
            document.getElementById('veyronImg').style.opacity = 1;
            document.getElementById('veyronVideo').style.opacity = 0;
            document.getElementById('veyronVideo').pause();
            document.getElementById('veyronOverlay').style.opacity = 0;
          }
        }, 100);
      }
    } else {
      el.classList.remove('visible');
    }
  });
}

// Debounce scroll for smoother performance
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