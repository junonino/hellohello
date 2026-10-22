/**
 * HELLOHELLO MARKETING (hellohellomarketing.net)
 * Core Client-Side Logic & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Service Category Tab Filtering
  const tabButtons = document.querySelectorAll('.service-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const targetCategory = button.getAttribute('data-target');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 2. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Close all other FAQ items for a clean accordion effect
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isCurrentlyActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. Lead Magnet Form & Interactive Custom Strategy Modal
  const leadForm = document.getElementById('lead-magnet-form');
  const planModal = document.getElementById('plan-modal');
  const modalCloseBtn = document.getElementById('modal-close-button');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const businessName = document.getElementById('business-name').value.trim() || 'Your Business';
      const category = document.getElementById('business-category').value;
      const primaryGoal = document.getElementById('primary-goal').value;
      const email = document.getElementById('contact-email').value.trim();

      // Customize modal content
      if (modalTitle) {
        modalTitle.textContent = `The "${businessName}" Growth Plan is Underway!`;
      }
      if (modalMessage) {
        modalMessage.innerHTML = `We are analyzing local search data for the <strong>${category}</strong> industry. Your tailored strategy report addressing <em>"${primaryGoal}"</em> will be sent directly to <strong>${email}</strong>.`;
      }

      // Show modal
      openModal();
      leadForm.reset();
    });
  }

  function openModal() {
    if (planModal) {
      planModal.classList.add('active');
      planModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (planModal) {
      planModal.classList.remove('active');
      planModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalActionBtn) modalActionBtn.addEventListener('click', closeModal);

  if (planModal) {
    planModal.addEventListener('click', (e) => {
      if (e.target === planModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && planModal && planModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 4. Accent Theme Switcher (Warm Amber / Sage Green)
  const btnAmber = document.getElementById('btn-theme-amber');
  const btnSage = document.getElementById('btn-theme-sage');

  if (btnAmber && btnSage) {
    btnAmber.addEventListener('click', () => {
      document.body.classList.remove('theme-sage');
      btnAmber.classList.add('active');
      btnSage.classList.remove('active');
    });

    btnSage.addEventListener('click', () => {
      document.body.classList.add('theme-sage');
      btnSage.classList.add('active');
      btnAmber.classList.remove('active');
    });
  }

  // 5. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('main-nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      if (isVisible) {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(249, 248, 243, 0.98)';
        navLinks.style.padding = '2rem';
        navLinks.style.borderBottom = '1px solid var(--border-divider)';
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = '';
        }
      });
    });
  }
});
