const categoryGroups = document.querySelectorAll('.group.relative, .relative.group');

categoryGroups.forEach(categoryGroup => {
  const categoryVideo = categoryGroup.querySelector('.category-video');
  const categoryImg = categoryGroup.querySelector('.category-img');
  const categoryOverlay = categoryGroup.querySelector('.category-overlay');
  let categoryLoaded = false;
  let isHovering = false;
  if (categoryImg) {
    categoryImg.style.opacity = 1;
    categoryImg.style.transition = 'opacity 3s cubic-bezier(0.4,0,0.2,1)';
  }
  if (categoryVideo) {
    categoryVideo.style.opacity = 0;
    categoryVideo.style.transition = 'opacity 3s cubic-bezier(0.4,0,0.2,1)';
  }
  if (categoryOverlay) categoryOverlay.style.opacity = 0;

  if (categoryVideo && categoryImg && categoryOverlay) {
    categoryGroup.addEventListener('mouseenter', () => {
      isHovering = true;
      categoryOverlay.style.opacity = 0.7;
      if (!categoryLoaded) {
        categoryVideo.load();
        categoryLoaded = true;
        categoryVideo.addEventListener('canplay', function handler() {
          categoryOverlay.style.opacity = 0;
          categoryVideo.currentTime = 0;
          categoryVideo.play();
          categoryVideo.style.opacity = 1;
          categoryImg.style.opacity = 0;
          categoryVideo.removeEventListener('canplay', handler);
        });
      } else {
        categoryVideo.currentTime = 0;
        categoryVideo.play();
        categoryVideo.style.opacity = 1;
        categoryImg.style.opacity = 0;
        categoryOverlay.style.opacity = 0;
      }
    });

    categoryGroup.addEventListener('mouseleave', () => {
      isHovering = false;
      categoryVideo.pause();
      categoryVideo.style.opacity = 0;
      categoryImg.style.opacity = 1;
      categoryOverlay.style.opacity = 0;
    });

    categoryVideo.addEventListener('error', () => {
      categoryImg.style.opacity = 1;
      categoryVideo.style.opacity = 0;
      categoryOverlay.style.opacity = 0;
      isHovering = false;
    });
  }
});

function handleFadeInOnScroll() {
  const fadeEls = document.querySelectorAll('.fade-in-on-scroll');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
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