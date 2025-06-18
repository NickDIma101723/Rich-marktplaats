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

// Language toggle logic
const langToggle = document.getElementById('lang-toggle');
const langEn = document.getElementById('lang-en');
const langNl = document.getElementById('lang-nl');

const translations = {
  en: {
    nav: ["DISCOVER", "AUCTIONS", "SELL LUXURY", "SUPPORT"],
    heroWelcome: "WELCOME TO THE FUTURE OF LUXURY",
    heroAurea: "AUREA",
    heroMarketplace: "MARKETPLACE",
    heroExclusive: "EXCLUSIVE. ICONIC. YOURS.",
    heroExplore: "EXPLORE COLLECTION",
    categoriesTitle: "Categories",
    categoriesDesc: "Browse our curated selection of luxury items across exclusive categories",
    cat1: ["01", "Luxury Cars", "2,847", "Available Items", "Discover our exclusive collection of premium cars from verified sellers worldwide.", "EXPLORE CARS"],
    cat2: ["02", "Luxury Yachts", "1,718", "Available Items", "Discover our exclusive collection of premium yachts from verified sellers worldwide.", "EXPLORE YACHTS"],
    cat3: ["03", "Luxury Accesories", "3,286", "Available Items", "Discover our exclusive collection of premium accesories from verified sellers worldwide.", "EXPLORE ACCESORIES"],
    cat4: ["04", "Luxury Planes", "2,147", "Available Items", "Discover our exclusive collection of premium planes from verified sellers worldwide.", "EXPLORE PLANES"],
    bidsTitle: "Hottest Bids",
    bidsDesc: "See the most popular luxury items currently being bid on by our community.",
    bidsMainTitle: "2024 Bugatti Chiron <span class='whitespace-nowrap'>Super</span><br> Sport",
    bidsCurrentLabel: "Current Bid",
    bidsCurrentValue: "$13.2M",
    bidsStartLabel: "Starting Bid",
    bidsStartValue: "$2.8M",
    bidsTotalLabel: "Total Bids",
    bidsTotalValue: "47"
  },
  nl: {
    nav: ["ONTDEK", "VEILINGEN", "VERKOOP LUXE", "ONDERSTEUNING"],
    heroWelcome: "WELKOM IN DE TOEKOMST VAN LUXE",
    heroAurea: "AUREA",
    heroMarketplace: "MARKTPLAATS",
    heroExclusive: "EXCLUSIEF. ICONISCH. VAN JOU.",
    heroExplore: "BEKIJK COLLECTIE",
    categoriesTitle: "Categorieën",
    categoriesDesc: "Bekijk onze zorgvuldig samengestelde selectie luxe items in exclusieve categorieën",
    cat1: ["01", "Luxe Auto's", "2.847", "Beschikbare Items", "Ontdek onze exclusieve collectie premium auto's van geverifieerde verkopers wereldwijd.", "BEKIJK AUTO'S"],
    cat2: ["02", "Luxe Jachten", "1.718", "Beschikbare Items", "Ontdek onze exclusieve collectie premium jachten van geverifieerde verkopers wereldwijd.", "BEKIJK JACHTEN"],
    cat3: ["03", "Luxe Accessoires", "3.286", "Beschikbare Items", "Ontdek onze exclusieve collectie premium accessoires van geverifieerde verkopers wereldwijd.", "BEKIJK ACCESSOIRES"],
    cat4: ["04", "Luxe Vliegtuigen", "2.147", "Beschikbare Items", "Ontdek onze exclusieve collectie premium vliegtuigen van geverifieerde verkopers wereldwijd.", "BEKIJK VLIEGTUIGEN"],
    bidsTitle: "Populairste Biedingen",
    bidsDesc: "Bekijk de meest populaire luxe items waarop momenteel wordt geboden.",
    bidsMainTitle: "2024 Bugatti Chiron <span class='whitespace-nowrap'>Super</span><br> Sport",
    bidsCurrentLabel: "Huidig Bod",
    bidsCurrentValue: "$13,2M",
    bidsStartLabel: "Startbod",
    bidsStartValue: "$2,8M",
    bidsTotalLabel: "Totaal Biedingen",
    bidsTotalValue: "47"
  }
};

function setLanguage(lang) {
  document.getElementById('nav-discover').textContent = translations[lang].nav[0];
  document.getElementById('nav-auctions').textContent = translations[lang].nav[1];
  document.getElementById('nav-sell').textContent = translations[lang].nav[2];
  document.getElementById('nav-support').textContent = translations[lang].nav[3];
  document.getElementById('hero-welcome').textContent = translations[lang].heroWelcome;
  document.getElementById('hero-aurea').textContent = translations[lang].heroAurea;
  document.getElementById('hero-marketplace').textContent = translations[lang].heroMarketplace;
  document.getElementById('hero-exclusive').textContent = translations[lang].heroExclusive;
  document.getElementById('hero-explore-text').textContent = translations[lang].heroExplore;
  document.getElementById('categories-title').textContent = translations[lang].categoriesTitle;
  document.getElementById('categories-desc').textContent = translations[lang].categoriesDesc;
  // Category 1
  document.getElementById('cat1-num').textContent = translations[lang].cat1[0];
  document.getElementById('cat1-title').textContent = translations[lang].cat1[1];
  document.getElementById('cat1-items').childNodes[0].nodeValue = translations[lang].cat1[2] + ' ';
  document.getElementById('cat1-items-label').textContent = translations[lang].cat1[3];
  document.getElementById('cat1-desc').textContent = translations[lang].cat1[4];
  document.getElementById('cat1-btn-text').textContent = translations[lang].cat1[5];
  // Category 2
  document.getElementById('cat2-num').textContent = translations[lang].cat2[0];
  document.getElementById('cat2-title').textContent = translations[lang].cat2[1];
  document.getElementById('cat2-items').childNodes[0].nodeValue = translations[lang].cat2[2] + ' ';
  document.getElementById('cat2-items-label').textContent = translations[lang].cat2[3];
  document.getElementById('cat2-desc').textContent = translations[lang].cat2[4];
  document.getElementById('cat2-btn-text').textContent = translations[lang].cat2[5];
  // Category 3
  document.getElementById('cat3-num').textContent = translations[lang].cat3[0];
  document.getElementById('cat3-title').textContent = translations[lang].cat3[1];
  document.getElementById('cat3-items').childNodes[0].nodeValue = translations[lang].cat3[2] + ' ';
  document.getElementById('cat3-items-label').textContent = translations[lang].cat3[3];
  document.getElementById('cat3-desc').textContent = translations[lang].cat3[4];
  document.getElementById('cat3-btn-text').textContent = translations[lang].cat3[5];
  // Category 4
  document.getElementById('cat4-num').textContent = translations[lang].cat4[0];
  document.getElementById('cat4-title').textContent = translations[lang].cat4[1];
  document.getElementById('cat4-items').childNodes[0].nodeValue = translations[lang].cat4[2] + ' ';
  document.getElementById('cat4-items-label').textContent = translations[lang].cat4[3];
  document.getElementById('cat4-desc').textContent = translations[lang].cat4[4];
  document.getElementById('cat4-btn-text').textContent = translations[lang].cat4[5];
  // Bids section
  document.getElementById('bids-title').textContent = translations[lang].bidsTitle;
  document.getElementById('bids-desc').textContent = translations[lang].bidsDesc;
  document.getElementById('bids-main-title').innerHTML = translations[lang].bidsMainTitle;
  document.getElementById('bids-current-label').textContent = translations[lang].bidsCurrentLabel;
  document.getElementById('bids-current-value').textContent = translations[lang].bidsCurrentValue;
  document.getElementById('bids-start-label').textContent = translations[lang].bidsStartLabel;
  document.getElementById('bids-start-value').textContent = translations[lang].bidsStartValue;
  document.getElementById('bids-total-label').textContent = translations[lang].bidsTotalLabel;
  document.getElementById('bids-total-value').textContent = translations[lang].bidsTotalValue;
}

// Animated switch between EXCLUSIVE., ICONIC., YOURS. with fade out and fade in
const luxuryWords = ["EXCLUSIVE.", "ICONIC.", "YOURS."];
let luxuryIndex = 0;
const luxurySwitcher = document.getElementById('luxury-switcher');

function fadeLuxuryWord() {
  if (!luxurySwitcher) return;
  luxurySwitcher.classList.remove('luxury-switcher-animate-in');
  luxurySwitcher.classList.add('luxury-switcher-animate-out');
  setTimeout(() => {
    luxuryIndex = (luxuryIndex + 1) % luxuryWords.length;
    luxurySwitcher.textContent = luxuryWords[luxuryIndex];
    luxurySwitcher.classList.remove('luxury-switcher-animate-out');
    luxurySwitcher.classList.add('luxury-switcher-animate-in');
  }, 400); // match fade out duration
}

if (luxurySwitcher) {
  luxurySwitcher.textContent = luxuryWords[0];
  luxurySwitcher.classList.add('luxury-switcher-animate-in');
  setInterval(fadeLuxuryWord, 3500); // slower switch interval
}