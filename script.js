(function () {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#site-navigation');

  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    navigation.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');
    if (!link || typeof window.gtag !== 'function') return;
    const href = link.getAttribute('href') || '';
    let eventName = '', method = '';
    if (href.includes('wa.me/')) { eventName = 'generate_lead'; method = 'whatsapp'; }
    else if (href.startsWith('mailto:')) { eventName = 'generate_lead'; method = 'email'; }
    else if (href.startsWith('tel:')) { eventName = 'generate_lead'; method = 'phone'; }
    else if (href.endsWith('.pdf')) { eventName = 'file_download'; method = 'brochure'; }
    else if (href.includes('school-') && href.includes('delhi-ncr')) { eventName = 'select_content'; method = 'category_page'; }
    if (eventName) window.gtag('event', eventName, { method: method, link_url: link.href, link_text: (link.textContent || '').trim().slice(0, 100) });
  });

}());
