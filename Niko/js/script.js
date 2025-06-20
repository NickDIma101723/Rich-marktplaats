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
});

// ================= HEART LIKE FUNCTIONALITY =================
let likeCount = 0;
let currentNotification = null;
let notificationQueue = [];

function hideNotification(notification) {
  if (notification) {
    notification.classList.remove('translate-y-0');
    notification.classList.add('translate-y-full');
    notification.style.opacity = '0';
    
    if (notification.timeout) {
      clearTimeout(notification.timeout);
      notification.timeout = null;
    }
  }
}

function processNotificationQueue() {
  if (notificationQueue.length === 0) {
    currentNotification = null;
    return;
  }
  
  const nextNotification = notificationQueue.shift();
  showNotificationInternal(nextNotification.message, nextNotification.isLiked);
}

function showNotificationInternal(message, isLiked = true) {
  const notificationId = isLiked ? 'like-notification' : 'remove-notification';
  const notification = document.getElementById(notificationId);
  
  if (notification) {
    currentNotification = notification;
    
    // Update message
    const messageSpan = notification.querySelector('span:last-child');
    if (messageSpan) {
      messageSpan.textContent = message;
    }
    
    // Reset and show notification
    notification.classList.remove('translate-y-0');
    notification.classList.add('translate-y-full');
    notification.style.opacity = '0';
    
    // Show notification after brief delay
    setTimeout(() => {
      notification.classList.remove('translate-y-full');
      notification.classList.add('translate-y-0');
      notification.style.opacity = '1';
    }, 50);
    
    // Hide notification after 2.5 seconds and process queue
    notification.timeout = setTimeout(() => {
      hideNotification(notification);
      setTimeout(() => {
        processNotificationQueue();
      }, 300); // Wait for hide animation to complete
    }, 2500);
  }
}

function showNotification(message, isLiked = true) {
  // If there's a current notification, hide it immediately and queue the new one
  if (currentNotification) {
    hideNotification(currentNotification);
    
    // Add new notification to queue
    notificationQueue.push({ message, isLiked });
    
    // Process queue after a short delay to allow current notification to hide
    setTimeout(() => {
      processNotificationQueue();
    }, 200);
  } else {
    // No current notification, show immediately
    showNotificationInternal(message, isLiked);
  }
}

function updateHeartCounters() {
  // Update main navbar counter
  const heartCounter = document.getElementById('heart-counter');
  const heartCounterSmall = document.getElementById('heart-counter-small');
  
  if (heartCounter) {
    heartCounter.textContent = likeCount;
    if (likeCount > 0) {
      heartCounter.style.opacity = '1';
      heartCounter.style.transform = 'scale(1)';
      heartCounter.style.display = 'flex';
      heartCounter.style.visibility = 'visible';
    } else {
      heartCounter.style.opacity = '0';
      heartCounter.style.transform = 'scale(0)';
      heartCounter.style.visibility = 'hidden';
    }
  }
  
  if (heartCounterSmall) {
    heartCounterSmall.textContent = likeCount;
    if (likeCount > 0) {
      heartCounterSmall.style.opacity = '1';
      heartCounterSmall.style.transform = 'scale(1)';
      heartCounterSmall.style.display = 'flex';
      heartCounterSmall.style.visibility = 'visible';
    } else {
      heartCounterSmall.style.opacity = '0';
      heartCounterSmall.style.transform = 'scale(0)';
      heartCounterSmall.style.visibility = 'hidden';
    }
  }
}

function setupHeartInteractions() {
  // Get all heart checkboxes
  const heartCheckboxes = document.querySelectorAll('.heart-checkbox');
  
  heartCheckboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function() {
      const heartButton = this.closest('button');
      const heartSvg = heartButton.querySelector('svg');
      const heartPath = heartButton.querySelector('svg path');
      
      if (this.checked) {
        // Heart is now liked
        likeCount++;
        
        // Add visual feedback
        heartSvg.style.transform = 'scale(1.2)';
        heartPath.setAttribute('fill', 'currentColor');
        heartSvg.classList.add('text-red-500');
        
        // Reset scale after animation
        setTimeout(() => {
          heartSvg.style.transform = 'scale(1)';
        }, 200);
        
        // Show like notification
        const currentLang = localStorage.getItem('lang') || 'EN';
        showNotification(translations[currentLang].addedToFavorites, true);
        
      } else {
        // Heart is now unliked
        likeCount = Math.max(0, likeCount - 1);
        
        // Remove visual feedback
        heartSvg.style.transform = 'scale(0.9)';
        heartPath.setAttribute('fill', 'none');
        heartSvg.classList.remove('text-red-500');
        
        // Reset scale after animation
        setTimeout(() => {
          heartSvg.style.transform = 'scale(1)';
        }, 200);
        
        // Show remove notification
        const currentLang = localStorage.getItem('lang') || 'EN';
        showNotification(translations[currentLang].removedFromFavorites, false);
      }
      
      // Update counters
      updateHeartCounters();
    });
  });
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
        marketplace: "MARKETPLACE",
        categories: "Categories",
        categoriesDesc: "Browse our curated selection of luxury items across exclusive categories",
        hottestBids: "Hottest Bids",
        bidsDesc: "See the most popular luxury items currently being bid on by our community.",
        bidNow: "BID NOW",
        viewDetails: "VIEW DETAILS",
        viewBid: "View Bid",
        addedToFavorites: "Added to favorites",
        removedFromFavorites: "Removed from favorites",
        currentBid: "Current Bid",
        startingBid: "Starting Bid",
        totalBids: "Total Bids",
        luxuryCars: "Luxury Cars",
        luxuryYachts: "Luxury Yachts", 
        luxuryAccessories: "Luxury Accessories",
        luxuryPlanes: "Luxury Planes",
        availableItems: "Available Items",
        exploreCars: "EXPLORE CARS",
        exploreYachts: "EXPLORE YACHTS",
        exploreAccessories: "EXPLORE ACCESSORIES",
        explorePlanes: "EXPLORE PLANES",
        cart: "Cart",
        emptyCart: "Your cart is empty"
      },
      NL: {
        discover: "Ontdek",
        auctions: "Veilingen", 
        sell: "Verkoop Luxe",
        support: "Ondersteuning",
        welcome: "WELKOM IN DE TOEKOMST VAN LUXE",
        marketplace: "MARKTPLAATS",
        categories: "Categorieën",
        categoriesDesc: "Blader door onze gecureerde selectie van luxe artikelen in exclusieve categorieën",
        hottestBids: "Populairste Biedingen",
        bidsDesc: "Bekijk de populairste luxe artikelen waar momenteel op wordt geboden door onze gemeenschap.",
        bidNow: "BIED NU",
        viewDetails: "BEKIJK DETAILS",
        viewBid: "Bekijk Bod",
        addedToFavorites: "Toegevoegd aan favorieten",
        removedFromFavorites: "Verwijderd uit favorieten",
        currentBid: "Huidig Bod",
        startingBid: "Startbod",
        totalBids: "Totaal Biedingen",
        luxuryCars: "Luxe Auto's",
        luxuryYachts: "Luxe Jachten",
        luxuryAccessories: "Luxe Accessoires", 
        luxuryPlanes: "Luxe Vliegtuigen",
        availableItems: "Beschikbare Artikelen",
        exploreCars: "ONTDEK AUTO'S",
        exploreYachts: "ONTDEK JACHTEN",
        exploreAccessories: "ONTDEK ACCESSOIRES",
        explorePlanes: "ONTDEK VLIEGTUIGEN",
        cart: "Winkelwagen",
        emptyCart: "Je winkelwagen is leeg"
      }
    };
    
    function updateLanguageButtons(activeLanguage) {
      const langEN = document.getElementById('lang-en');
      const langNL = document.getElementById('lang-nl');
      
      if (langEN && langNL) {
        if (activeLanguage === 'EN') {
          langEN.classList.remove('text-white/60');
          langEN.classList.add('text-white', 'bg-white/10');
          langNL.classList.remove('text-white', 'bg-white/10');
          langNL.classList.add('text-white/60');
        } else {
          langNL.classList.remove('text-white/60');
          langNL.classList.add('text-white', 'bg-white/10');
          langEN.classList.remove('text-white', 'bg-white/10');
          langEN.classList.add('text-white/60');
        }
      }
    }
    
    function setLanguage(lang) {
      // Update small navbar with proper spacing for Dutch
      const navDiscover = document.getElementById('nav-discover');
      const navAuctions = document.getElementById('nav-auctions');
      const navSell = document.getElementById('nav-sell');
      const navSupport = document.getElementById('nav-support');
      
      if (navDiscover) navDiscover.textContent = translations[lang].discover.toUpperCase();
      if (navAuctions) navAuctions.textContent = translations[lang].auctions.toUpperCase();
      if (navSell) {
        navSell.textContent = translations[lang].sell.toUpperCase();
        // Adjust font size for Dutch to prevent wrapping
        if (lang === 'NL') {
          navSell.style.fontSize = '0.8rem';
          navSell.style.lineHeight = '1.2';
        } else {
          navSell.style.fontSize = '';
          navSell.style.lineHeight = '';
        }
      }
      if (navSupport) navSupport.textContent = translations[lang].support.toUpperCase();
      
      // Update all translatable elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });
      
      // Update notification messages
      const currentLang = lang;
      
      updateLanguageButtons(lang);
      localStorage.setItem('lang', lang);
    }
    
    // Initialize language switcher
    const langEN = document.getElementById('lang-en');
    const langNL = document.getElementById('lang-nl');
    
    if (langEN) {
      langEN.addEventListener('click', () => setLanguage('EN'));
      langEN.addEventListener('mouseenter', function() {
        if (!this.classList.contains('bg-white/10')) {
          this.classList.add('hover:bg-white/10');
        }
      });
    }
    
    if (langNL) {
      langNL.addEventListener('click', () => setLanguage('NL'));
      langNL.addEventListener('mouseenter', function() {
        if (!this.classList.contains('bg-white/10')) {
          this.classList.add('hover:bg-white/10');
        }
      });
    }
    
    const savedLang = localStorage.getItem('lang') || 'EN';
    setLanguage(savedLang);

// Animated switch between EXCLUSIVE., ICONIC., YOURS. with fade out and fade in
const luxuryWords = ["EXCLUSIVE", "ICONIC", "YOURS"];
let luxuryIndex = 0;
const luxurySwitcher = document.getElementById('luxury-switcher');

function switchLuxuryWord() {
  luxurySwitcher.textContent = luxuryWords[luxuryIndex];
  luxuryIndex = (luxuryIndex + 1) % luxuryWords.length;
}

switchLuxuryWord(); // Show first word immediately
setInterval(switchLuxuryWord, 4000); // Change every 2 seconds


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

// Initialize heart functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize heart functionality
    setupHeartInteractions();
    updateHeartCounters();
    
    // Heart animation
    document.querySelectorAll('.heart-btn').forEach(function(heartBtn) {
        heartBtn.addEventListener('click', function() {
            const icon = this.querySelector('.heart-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 150);
            }
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

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cartBtnLarge = document.getElementById('cart-btn-large');
    const cartBtnSmall = document.getElementById('cart-btn-small');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');

    function openCart() {
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.remove('translate-x-full');
            cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCart() {
        if (cartSidebar && cartOverlay) {
            cartSidebar.classList.add('translate-x-full');
            cartOverlay.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        }
    }

    // Cart button event listeners
    if (cartBtnLarge) {
        cartBtnLarge.addEventListener('click', openCart);
    }
    
    if (cartBtnSmall) {
        cartBtnSmall.addEventListener('click', openCart);
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Close cart with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
});

// ================= MOBILE NAVIGATION FUNCTIONALITY =================
document.addEventListener('DOMContentLoaded', function() {
  console.log('Mobile navigation script loaded'); // Debug line
  
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  console.log('Mobile menu elements:', { mobileMenuToggle, mobileMenuOverlay, mobileNavLinks }); // Debug line
  
  // Check if elements exist
  if (!mobileMenuToggle) {
    console.error('Mobile menu toggle button not found!');
    return;
  }
  
  if (!mobileMenuOverlay) {
    console.error('Mobile menu overlay not found!');
    return;
  }
  
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Hamburger clicked!'); // Debug line
    
    const isOpen = mobileMenuOverlay.classList.contains('menu-open');
    console.log('Menu is currently open:', isOpen); // Debug line
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  // Close mobile menu when clicking nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      console.log('Nav link clicked, closing menu'); // Debug line
      closeMobileMenu();
    });
  });
  
  // Close mobile menu when clicking overlay background
  mobileMenuOverlay.addEventListener('click', function(e) {
    if (e.target === mobileMenuOverlay) {
      console.log('Overlay clicked, closing menu'); // Debug line
      closeMobileMenu();
    }
  });
  
  // Close mobile menu with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('menu-open')) {
      console.log('Escape pressed, closing menu'); // Debug line
      closeMobileMenu();
    }
  });
  
  function openMobileMenu() {
    console.log('Opening mobile menu'); // Debug line
    mobileMenuOverlay.classList.add('menu-open');
    mobileMenuToggle.classList.add('hamburger-open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
  
  function closeMobileMenu() {
    console.log('Closing mobile menu'); // Debug line
    mobileMenuOverlay.classList.remove('menu-open');
    mobileMenuToggle.classList.remove('hamburger-open');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Sync mobile counters with main counters
  const heartCounter = document.getElementById('heart-counter');
  const heartCounterMobile = document.getElementById('heart-counter-mobile');
  const cartCounter = document.getElementById('cart-counter');
  const cartCounterMobile = document.getElementById('cart-counter-mobile');
  
  // Language switcher for mobile
  const langEnMobile = document.getElementById('lang-en-mobile');
  const langNlMobile = document.getElementById('lang-nl-mobile');
  const langEn = document.getElementById('lang-en');
  const langNl = document.getElementById('lang-nl');
  
  // Sync language selection
  langEnMobile?.addEventListener('click', function() {
    langEn?.click(); // Trigger desktop language switcher
    updateMobileLanguageButtons('en');
  });
  
  langNlMobile?.addEventListener('click', function() {
    langNl?.click(); // Trigger desktop language switcher
    updateMobileLanguageButtons('nl');
  });
  
  function updateMobileLanguageButtons(lang) {
    if (lang === 'en') {
      langEnMobile?.classList.add('bg-white/10');
      langEnMobile?.classList.remove('text-white/60');
      langNlMobile?.classList.remove('bg-white/10');
      langNlMobile?.classList.add('text-white/60');
    } else {
      langNlMobile?.classList.add('bg-white/10');
      langNlMobile?.classList.remove('text-white/60');
      langEnMobile?.classList.remove('bg-white/10');
      langEnMobile?.classList.add('text-white/60');
    }
  }
  
  // Responsive navbar visibility management
  function handleNavbarVisibility() {
    const isMobile = window.innerWidth < 1024;
    const navbarLarge = document.getElementById('navbar-large');
    const navbarSmall = document.getElementById('navbar-small');
    const navbarMobile = document.getElementById('navbar-mobile');
    
    if (isMobile) {
      // Show mobile navbar, hide desktop navbars
      navbarMobile?.classList.remove('hidden');
      navbarLarge?.classList.add('hidden');
      navbarSmall?.classList.add('hidden');
    } else {
      // Show desktop navbars, hide mobile navbar
      navbarMobile?.classList.add('hidden');
      navbarLarge?.classList.remove('hidden');
      navbarSmall?.classList.remove('hidden');
    }
  }
  
  // Handle window resize
  window.addEventListener('resize', function() {
    handleNavbarVisibility();
    // Close mobile menu if screen becomes desktop size
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });
  
  // Initial setup
  handleNavbarVisibility();
  
  // Sync cart functionality for mobile
  const cartBtnMobile = document.getElementById('cart-btn-mobile');
  cartBtnMobile?.addEventListener('click', function() {
    // Trigger the same cart functionality as desktop
    const cartBtnLarge = document.getElementById('cart-btn-large');
    cartBtnLarge?.click();
  });
});

// ================= MOBILE-OPTIMIZED CATEGORY INTERACTIONS =================
document.addEventListener('DOMContentLoaded', function() {
  // Check if device supports touch
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    // Disable hover effects for categories on touch devices
    const categoryGroups = document.querySelectorAll('.group.relative, .relative.group');
    
    categoryGroups.forEach(categoryGroup => {
      // Add touch handling
      categoryGroup.addEventListener('touchstart', function(e) {
        // Optional: Add touch feedback
        categoryGroup.style.transform = 'scale(0.98)';
      });
      
      categoryGroup.addEventListener('touchend', function(e) {
        // Reset touch feedback
        categoryGroup.style.transform = 'scale(1)';
      });
      
      // Remove hover listeners for touch devices
      categoryGroup.removeEventListener('mouseenter', () => {});
      categoryGroup.removeEventListener('mouseleave', () => {});
    });
  }
});

// ================= EXISTING SCRIPT CONTINUES BELOW =================

// Alternative mobile menu toggle (fallback)
window.addEventListener('load', function() {
  console.log('Window loaded, setting up mobile menu fallback');
  
  // Try to find the hamburger button again
  const hamburger = document.querySelector('#mobile-menu-toggle');
  const overlay = document.querySelector('#mobile-menu-overlay');
  
  if (hamburger && overlay) {
    console.log('Fallback: Found hamburger and overlay');
    
    // Remove any existing listeners and add new one
    hamburger.addEventListener('click', function(event) {
      event.stopPropagation();
      event.preventDefault();
      
      console.log('Fallback: Hamburger clicked!');
      
      // Toggle the menu
      if (overlay.classList.contains('menu-open')) {
        overlay.classList.remove('menu-open');
        hamburger.classList.remove('hamburger-open');
        document.body.style.overflow = '';
        console.log('Fallback: Menu closed');
      } else {
        overlay.classList.add('menu-open');
        hamburger.classList.add('hamburger-open');
        document.body.style.overflow = 'hidden';
        console.log('Fallback: Menu opened');
      }
    });
  } else {
    console.error('Fallback: Could not find hamburger or overlay elements');
  }
});

