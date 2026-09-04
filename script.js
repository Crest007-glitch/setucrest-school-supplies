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

  const form = document.querySelector('#enquiry-form');
  const status = document.querySelector('#form-status');
  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const subject = 'School supply enquiry from ' + (data.get('institution') || data.get('name') || 'institution');
      const body = [
        'Hello SetuCrest,',
        '',
        'I would like to request a quotation for school / institutional supplies.',
        '',
        'Name: ' + (data.get('name') || ''),
        'Institution: ' + (data.get('institution') || ''),
        'Role: ' + (data.get('role') || ''),
        'City / area: ' + (data.get('city') || ''),
        'Phone: ' + (data.get('phone') || ''),
        'Email: ' + (data.get('email') || ''),
        '',
        'Requirement:',
        data.get('requirements') || ''
      ].join('\n');

      status.textContent = 'Opening your email app…';
      window.location.href = 'mailto:ashutoshgupta@setucrestglobal.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
}());
