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

  // 3. Free Local Audit Form & Modal Handling
  const leadForm = document.getElementById('lead-magnet-form');
  const planModal = document.getElementById('plan-modal');
  const modalCloseBtn = document.getElementById('modal-close-button');
  const modalActionBtn = document.getElementById('modal-action-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalMessage = document.getElementById('modal-message');
  const submitBtn = document.getElementById('submit-plan-btn');
  const formErrorMsg = document.getElementById('form-error-msg');

  // Form endpoint URL placeholder. Replace this with your Formspree (or similar) endpoint URL.
  const FORM_ENDPOINT = '[FORM_ENDPOINT_URL]';

  function openModal() {
    if (planModal) {
      planModal.classList.add('active');
      planModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (modalActionBtn) modalActionBtn.focus();
    }
  }

  function closeModal() {
    if (planModal) {
      planModal.classList.remove('active');
      planModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (submitBtn) submitBtn.focus();
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

  if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (formErrorMsg) {
        formErrorMsg.style.display = 'none';
        formErrorMsg.textContent = '';
      }

      // Honeypot check: if filled, bypass network request and show immediate success
      const honeypot = document.getElementById('company-website');
      if (honeypot && honeypot.value.trim() !== '') {
        leadForm.reset();
        if (modalTitle) modalTitle.textContent = 'Thanks, we got it.';
        if (modalMessage) {
          modalMessage.textContent = "We'll reply to the email you entered within [ONE BUSINESS DAY] with a short audit. If you do not see it, check your spam folder or email [CONTACT EMAIL].";
        }
        openModal();
        return;
      }

      const name = document.getElementById('contact-name') ? document.getElementById('contact-name').value.trim() : '';
      const businessName = document.getElementById('business-name') ? document.getElementById('business-name').value.trim() : '';
      const website = document.getElementById('website-url') ? document.getElementById('website-url').value.trim() : '';
      const email = document.getElementById('contact-email') ? document.getElementById('contact-email').value.trim() : '';
      const phone = document.getElementById('contact-phone') ? document.getElementById('contact-phone').value.trim() : '';
      const marketingSetup = document.getElementById('marketing-setup') ? document.getElementById('marketing-setup').value : '';

      // Button loading state
      const originalBtnText = submitBtn ? submitBtn.querySelector('span')?.textContent || 'Get My Free Local Audit' : 'Get My Free Local Audit';
      if (submitBtn) {
        submitBtn.disabled = true;
        const span = submitBtn.querySelector('span');
        if (span) span.textContent = 'Submitting...';
      }

      const payload = {
        name,
        businessName,
        website,
        email,
        phone,
        marketingSetup
      };

      try {
        // If placeholder hasn't been configured, throw error to trigger graceful fallback
        if (!FORM_ENDPOINT || FORM_ENDPOINT.includes('[FORM_ENDPOINT_URL]')) {
          throw new Error('Endpoint not yet configured');
        }

        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        leadForm.reset();
        if (modalTitle) modalTitle.textContent = 'Thanks, we got it.';
        if (modalMessage) {
          modalMessage.textContent = "We'll reply to the email you entered within [ONE BUSINESS DAY] with a short audit. If you do not see it, check your spam folder or email [CONTACT EMAIL].";
        }
        openModal();
      } catch (err) {
        if (formErrorMsg) {
          formErrorMsg.style.display = 'block';
          formErrorMsg.textContent = 'Something went wrong. Please try again, or email us at [CONTACT EMAIL].';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          const span = submitBtn.querySelector('span');
          if (span) span.textContent = originalBtnText;
        }
      }
    });
  }

  // 4. Mobile Menu Toggle
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
