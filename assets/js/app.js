// ============================================
// APP.JS - CUSTOM MOBILE MENU (NO BOOTSTRAP COLLAPSE)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // 2. HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('.startupx-header');
  const headerHeight = header ? header.offsetHeight : 80;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // ============================================
  // 3. CUSTOM MOBILE MENU - FIXED VERSION
  // ============================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  
  if (mobileToggle && mobileMenu && mobileClose) {
    
    // OPEN MENU - SIRF EK BAAR OPEN HO
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Event bubbling rokta hai
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    
    // CLOSE MENU
    mobileClose.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    // CLICK OUTSIDE CLOSE
    document.addEventListener('click', function(e) {
      if (!mobileToggle.contains(e.target) && 
          !mobileMenu.contains(e.target) && 
          mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // PREVENT MENU CLICK SE CLOSE NA HO
    mobileMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // ============================================
  // 4. ACTIVE MENU ON SCROLL
  // ============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .mobile-nav .nav-link');
  
  function updateActiveMenu() {
    let scrollPosition = window.scrollY + headerHeight + 20;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveMenu);
  window.addEventListener('load', updateActiveMenu);
  
  // ============================================
  // 5. SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight + 1,
          behavior: 'smooth'
        });
        
        // Close mobile menu
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
  
  // ============================================
  // 6. CHART ANIMATION
  // ============================================
  const animateBars = () => {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.height = bar.style.height;
      }, index * 100);
    });
  };
  
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateBars();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
  }
  
});