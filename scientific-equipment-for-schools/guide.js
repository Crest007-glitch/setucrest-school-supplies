/* Progressive enhancement: the full inventory remains readable without JavaScript. */
(() => {
  const form = document.getElementById('lab-filters');
  if (!form) return;
  const search = document.getElementById('lab-search');
  const grade = document.getElementById('lab-class');
  const subject = document.getElementById('lab-subject');
  const count = document.getElementById('lab-count');
  const empty = document.getElementById('lab-empty');
  const sections = [...document.querySelectorAll('.inventory-section')].map(section => ({
    section,
    rows: [...section.querySelectorAll('tbody tr')].map(row => ({
      row,
      grades: row.dataset.grades.split(' '),
      text: row.textContent.toLocaleLowerCase('en-IN')
    }))
  }));
  const total = sections.reduce((sum, section) => sum + section.rows.length, 0);
  function update() {
    const words = search.value.trim().toLocaleLowerCase('en-IN').split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const {section, rows} of sections) {
      let sectionCount = 0;
      for (const {row, grades, text} of rows) {
        const matches = (!grade.value || grades.includes(grade.value)) &&
          (!subject.value || section.dataset.subject === subject.value) &&
          words.every(word => text.includes(word));
        row.hidden = !matches;
        if (matches) sectionCount++;
      }
      section.hidden = sectionCount === 0;
      visible += sectionCount;
    }
    count.textContent = `Showing ${visible} of ${total} entries.`;
    empty.hidden = visible !== 0;
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => {
    search.value = ''; grade.value = ''; subject.value = '';
    update();
  });
  // Contents links should reveal their target even after filtering.
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.getAttribute('href').slice(1));
      if (target?.classList.contains('inventory-section') && target.hidden) form.reset();
    });
  });
  form.hidden = false;
  update();
})();
