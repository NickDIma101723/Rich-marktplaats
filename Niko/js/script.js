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
function handleHottestBidsScrollAnimation() {
  const animatedEls = document.querySelectorAll('.hottest-bid-card');
  animatedEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * 0.85 && rect.bottom > windowHeight * 0.15) {
      el.classList.add('hottest-bid-card-in');
    } else {
      el.classList.remove('hottest-bid-card-in');
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
  handleHottestBidsScrollAnimation();
}, 50));

window.addEventListener('resize', () => {
  handleCategoryScrollAnimation();
  handleFadeInOnScroll();
  handleHottestBidsScrollAnimation();
});

document.addEventListener('DOMContentLoaded', () => {
  handleCategoryScrollAnimation();
  handleFadeInOnScroll();
  handleHottestBidsScrollAnimation();
  const video = document.querySelector('video');
  if (video) {
    video.playbackRate = 0.8;
  }

  const openCart = document.getElementById('open-cart');
  const sidebarCart = document.getElementById('sidebar-cart');
  const closeCart = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');
  function openSidebarCart() {
    sidebarCart.classList.remove('translate-x-full');
    sidebarCart.classList.add('translate-x-0');
    cartOverlay.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
  function closeSidebarCart() {
    sidebarCart.classList.add('translate-x-full');
    sidebarCart.classList.remove('translate-x-0');
    cartOverlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
  if (openCart && sidebarCart && cartOverlay) {
    openCart.addEventListener('click', function(e) {
      e.preventDefault();
      openSidebarCart();
    });
    cartOverlay.addEventListener('click', closeSidebarCart);
  }
  if (closeCart && sidebarCart && cartOverlay) {
    closeCart.addEventListener('click', closeSidebarCart);
  }
});

function addCursorClickEffect() {
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const originalCursor = document.body.style.cursor;
      document.body.style.cursor = 'wait';
      setTimeout(() => {
        document.body.style.cursor = originalCursor || '';
      }, 400);
    });
  });
}

window.addEventListener('DOMContentLoaded', addCursorClickEffect);