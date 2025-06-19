const categoryGroups = document.querySelectorAll('.group.relative, .relative.group');

categoryGroups.forEach(categoryGroup => {
  const categoryVideo = categoryGroup.querySelector('.category-video');
  const categoryImg = categoryGroup.querySelector('.category-img');
  const categoryOverlay = categoryGroup.querySelector('.category-overlay');
  let categoryLoaded = false;
  let isHovering = false;
  if (categoryImg) {
    categoryImg.style.opacity = 1;
    categoryImg.style.transition = 'opacity 6s cubic-bezier(0.4,0,0.2,1)'; // slower fade
  }
  if (categoryVideo) {
    categoryVideo.style.opacity = 0;
    categoryVideo.style.transition = 'opacity 6s cubic-bezier(0.4,0,0.2,1)'; // slower fade
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

// Popup for favoriting
function showFavoritePopup(message) {
  let popup = document.getElementById('favorite-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'favorite-popup';
    popup.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:0.7rem;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.78-7-12A5 5 0 0 1 12 4a5 5 0 0 1 7 5c0 7.22-7 12-7 12Z" fill="#fff" stroke="#fff" stroke-width="1.2"/></svg>
        <span style="font-weight:500;font-size:1rem;letter-spacing:0.01em;">${message}</span>
      </span>
    `;
    popup.style.position = 'fixed';
    popup.style.bottom = '48px';
    popup.style.left = '50%';
    popup.style.top = '';
    popup.style.transform = 'translateX(-50%)';
    popup.style.background = 'rgba(24,24,24,0.82)';
    popup.style.color = '#fff';
    popup.style.padding = '0.7rem 1.6rem';
    popup.style.borderRadius = '1.2rem';
    popup.style.fontFamily = 'Montserrat, sans-serif';
    popup.style.boxShadow = '0 4px 18px 0 rgba(0,0,0,0.13)';
    popup.style.zIndex = '9999';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.3s cubic-bezier(0.4,0,0.2,1), bottom 0.4s cubic-bezier(0.4,0,0.2,1)';
    popup.style.backdropFilter = 'blur(3px)';
    document.body.appendChild(popup);
  }
  popup.style.opacity = '1';
  popup.style.bottom = '80px';
  setTimeout(() => {
    popup.style.opacity = '0';
    popup.style.bottom = '48px';
  }, 900);
}

function updateNavbarHeartCount(count) {
  let navHeartBtn = document.querySelector('nav .flex.items-center.gap-6 > button');
  if (!navHeartBtn) return;
  let badge = navHeartBtn.querySelector('.fav-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'fav-badge';
    badge.style.position = 'absolute';
    badge.style.top = '0px';
    badge.style.right = '0px';
    badge.style.background = '#fff';
    badge.style.color = '#181818';
    badge.style.fontSize = '0.82rem';
    badge.style.fontWeight = '600';
    badge.style.padding = '0.08em 0.48em';
    badge.style.borderRadius = '999px';
    badge.style.boxShadow = '0 1px 4px 0 rgba(0,0,0,0.10)';
    badge.style.zIndex = '10';
    badge.style.lineHeight = '1.1';
    navHeartBtn.style.position = 'relative';
    navHeartBtn.appendChild(badge);
  }
  badge.textContent = count > 99 ? '99+' : count;
  badge.style.display = count > 0 ? 'inline-block' : 'none';
}

let favCount = 0;
function setupHeartButtons() {
  const navHeartBtn = document.querySelector('nav .flex.items-center.gap-6 > button');
  document.querySelectorAll('button').forEach(btn => {
    // Only add to count if it's a heart button NOT in the navbar
    if (
      btn.querySelector('svg') &&
      btn.querySelector('svg path[d*="M21 8.25"]') &&
      btn !== navHeartBtn
    ) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        favCount++;
        updateNavbarHeartCount(favCount);
        showFavoritePopup('This item has been added to your favourites');
      });
    }
  });
  updateNavbarHeartCount(favCount);
}

  let scrolled = false;
    function updateNavbar() {
      const navbarLarge = document.getElementById('navbar-large');
      const navbarSmall = document.getElementById('navbar-small');
      if (window.scrollY > 100 && !scrolled) {
        scrolled = true;
        navbarLarge.style.opacity = '0';
        navbarLarge.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
          navbarSmall.style.opacity = '1';
          navbarSmall.style.transform = 'translateY(0)';
        }, 200);
      } else if (window.scrollY <= 100 && scrolled) {
        scrolled = false;
        navbarSmall.style.opacity = '0';
        navbarSmall.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          navbarLarge.style.opacity = '1';
          navbarLarge.style.transform = 'translateX(0) translateY(0)';
        }, 200);
      }
    }
    let ticking = false;
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }
    window.addEventListener('scroll', () => {
      requestTick();
      ticking = false;
    });
    updateNavbar();

    // Language translation
    const translations = {
      EN: {
        discover: "Discover",
        auctions: "Auctions",
        sell: "Sell Luxury",
        support: "Support",
        welcome: "WELCOME TO THE FUTURE OF LUXURY",
        bidNow: "View Bid"
      },
      NL: {
        discover: "Ontdek",
        auctions: "Veilingen",
        sell: "Verkoop Luxe",
        support: "Ondersteuning",
        welcome: "WELKOM IN DE TOEKOMST VAN LUXE",
        bidNow: "Bied Nu"
      }
    };
    function setLanguage(lang) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
      localStorage.setItem('lang', lang);
    }
    document.getElementById('lang-en').addEventListener('click', () => setLanguage('EN'));
    document.getElementById('lang-nl').addEventListener('click', () => setLanguage('NL'));
    const savedLang = localStorage.getItem('lang') || 'EN';
    setLanguage(savedLang);

// Animated switch between EXCLUSIVE., ICONIC., YOURS. with fade out and fade in
const luxuryWords = ["EXCLUSIVE", "ICONIC", "YOURS"];
let luxuryIndex = 0;
const luxurySwitcher = document.getElementById('luxury-switcher');


document.addEventListener('DOMContentLoaded', function() {
    // Heart animation
    document.querySelectorAll('.heart-btn').forEach(function(heartBtn) {
        heartBtn.addEventListener('click', function() {
            const icon = this.querySelector('.heart-icon');
            icon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 150);
        });
    });

    // Button click feedback
    document.querySelectorAll('.minimal-btn').forEach(function(viewBtn) {
        viewBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
});

