const hoverElements = document.querySelectorAll('.hover-light');

hoverElements.forEach(el => {
  const spotlight = el.querySelector('::before'); // pseudo-element không thể query trực tiếp
  // Cách đúng: set biến CSS
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    el.querySelector('.hover-light::before'); // pseudo-element không query được
    el.style.setProperty('--opacity', 1);
  });

  el.addEventListener('mouseleave', () => {
    el.style.setProperty('--opacity', 0);
  });
});
