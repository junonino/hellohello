/**
 * HLLOHLLO MARKETING (hllohllo.com)
 * Core Client-Side Logic & Micro-Interactions
 * Built-in tech stack powered by hllo.you
 */

document.addEventListener('DOMContentLoaded', () => {
  // Page load timestamp for time-on-page spam protection (speed trap)
  const pageLoadTime = Date.now();
  // 1. Service Pillar CTA Smooth Scroll & Auto-Selection
  const pillarCtaButtons = document.querySelectorAll('.service-cta-btn');
  const serviceInterestSelect = document.getElementById('service-interest');

  pillarCtaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const interest = btn.getAttribute('data-interest');
      if (serviceInterestSelect) {
        if (interest === 'pillar-1') {
          serviceInterestSelect.value = 'Pillar 1: Local Search & Google Map Pack Visibility';
        } else if (interest === 'pillar-2') {
          serviceInterestSelect.value = 'Pillar 2: High-Converting Websites & Real Customer Messaging';
        } else if (interest === 'pillar-3') {
          serviceInterestSelect.value = 'Pillar 3: Call Tracking & High-Intent Local Campaigns';
        }

        // Highlight field visually to confirm auto-selection
        serviceInterestSelect.style.borderColor = 'var(--btn-orange)';
        serviceInterestSelect.style.boxShadow = '0 0 0 3px rgba(255, 90, 31, 0.25)';
        setTimeout(() => {
          serviceInterestSelect.style.borderColor = '';
          serviceInterestSelect.style.boxShadow = '';
        }, 2200);
      }
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

  // Form endpoint: hllo.you agency endpoint (configurable via window.ENV or meta tag, with Formspree fallback)
  const HLLO_YOU_ENDPOINT = (typeof window !== 'undefined' && window.ENV && window.ENV.HLLO_YOU_ENDPOINT)
    || (document.querySelector('meta[name="hllo-you-endpoint"]')?.getAttribute('content'))
    || 'https://hllo.you/f/audit-request';
  const FALLBACK_ENDPOINT = 'https://formspree.io/f/xvkavydv';

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

      // 1. Honeypot check: if filled by a bot, silently fake success without sending to Formspree
      const honeypot = document.getElementById('company-website');
      if (honeypot && honeypot.value.trim() !== '') {
        leadForm.reset();
        if (modalTitle) modalTitle.textContent = 'Thanks, we got it.';
        if (modalMessage) {
          modalMessage.textContent = "We'll review your local presence and email your custom diagnostic report within 24 hours. If you don't see it, please check your spam folder.";
        }
        openModal();
        return;
      }

      // 2. Time-on-page speed trap: bots submit forms in under 3 seconds
      const secondsOnPage = (Date.now() - pageLoadTime) / 1000;
      if (secondsOnPage < 3.0) {
        leadForm.reset();
        if (modalTitle) modalTitle.textContent = 'Thanks, we got it.';
        if (modalMessage) {
          modalMessage.textContent = "We'll review your local presence and email your custom diagnostic report within 24 hours. If you don't see it, please check your spam folder.";
        }
        openModal();
        return;
      }

      const name = document.getElementById('contact-name') ? document.getElementById('contact-name').value.trim() : '';
      const businessName = document.getElementById('business-name') ? document.getElementById('business-name').value.trim() : '';
      const website = document.getElementById('website-url') ? document.getElementById('website-url').value.trim() : '';
      const serviceLocation = document.getElementById('service-location') ? document.getElementById('service-location').value.trim() : '';
      const serviceInterest = document.getElementById('service-interest') ? document.getElementById('service-interest').value : '';
      const email = document.getElementById('contact-email') ? document.getElementById('contact-email').value.trim() : '';
      const phone = document.getElementById('contact-phone') ? document.getElementById('contact-phone').value.trim() : '';
      const marketingSetup = document.getElementById('marketing-setup') ? document.getElementById('marketing-setup').value : '';

      // Button loading state
      const originalBtnText = submitBtn ? submitBtn.querySelector('span')?.textContent || 'Claim My Free San Diego Audit' : 'Claim My Free San Diego Audit';
      if (submitBtn) {
        submitBtn.disabled = true;
        const span = submitBtn.querySelector('span');
        if (span) span.textContent = 'Submitting...';
      }

      const payload = {
        name,
        businessName,
        website,
        serviceLocation,
        serviceInterest,
        email,
        phone,
        marketingSetup
      };

      try {
        let response;
        try {
          response = await fetch(HLLO_YOU_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            throw new Error(`Endpoint returned status ${response.status}`);
          }
        } catch (endpointErr) {
          // Graceful fallback to Formspree if primary hllo.you endpoint is unavailable
          response = await fetch(FALLBACK_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        leadForm.reset();
        if (modalTitle) modalTitle.textContent = 'Thanks, we got it.';
        if (modalMessage) {
          modalMessage.textContent = "We'll review your local presence and email your custom diagnostic report within 24 hours. If you don't see it, please check your spam folder.";
        }
        openModal();
      } catch (err) {
        if (formErrorMsg) {
          formErrorMsg.style.display = 'block';
          formErrorMsg.textContent = 'Something went wrong submitting your audit request. Please try again.';
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
        navLinks.style.background = 'rgba(250, 249, 246, 0.98)';
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
