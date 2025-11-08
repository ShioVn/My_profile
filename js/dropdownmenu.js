(function(){
  function initDropdown(){
    const dbtn = document.querySelector('.dropdown-btn');
    const dmenu = document.querySelector('.dropdown-menu');
    const items = Array.from(document.querySelectorAll('.dropdown-item'));
    const contents = Array.from(document.querySelectorAll('.card-section-content'));

    if (!dbtn || !dmenu) {
      console.warn('Dropdown: .dropdown-btn hoặc .dropdown-menu không tìm thấy.');
      return;
    }

    // helper: hide immediately (no animation)
    function hideAllContentsImmediate(){
      contents.forEach(c => {
        c.classList.remove('active','card-anim-in','card-anim-out');
        c.style.display = 'none';
      });
    }

    function switchTo(id){
      const target = document.getElementById(id);
      if (!target) return;

      const current = contents.find(c => c.classList.contains('active'));

      if (current === target) return;

      if (current) {
        // play out animation, then hide and show new
        current.classList.remove('card-anim-in');
        current.classList.add('card-anim-out');

        // when out animation ends -> hide and show new
        const onOutEnd = (e) => {
          if (e.target !== current) return;
          current.removeEventListener('animationend', onOutEnd);
          current.classList.remove('active','card-anim-out');
          current.style.display = 'none';
          showTargetWithIn(target);
        };
        current.addEventListener('animationend', onOutEnd);
      } else {
        showTargetWithIn(target);
      }
    }

    function showTargetWithIn(target) {
      target.style.display = 'block';
      requestAnimationFrame(() => {
        target.classList.add('active','card-anim-in');
        target.classList.remove('card-anim-out');
      });
    }

    if (document.getElementById('cardTower')) {
      hideAllContentsImmediate();
      const t = document.getElementById('cardTower');
      t.style.display = 'block';
      t.classList.add('active');
    } else {
      hideAllContentsImmediate();
    }

    dbtn.addEventListener('click', function(e){
      e.stopPropagation();
      dmenu.classList.toggle('show');
      dbtn.setAttribute('aria-expanded', dmenu.classList.contains('show'));
      if (dmenu.classList.contains('show')) {
        const first = dmenu.querySelector('.dropdown-item');
        if (first) first.focus();
      }
    });

    dbtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dbtn.click();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        dmenu.classList.add('show');
        const first = dmenu.querySelector('.dropdown-item');
        if (first) first.focus();
      }
    });

    items.forEach(btn => {
      btn.setAttribute('tabindex', '0');

      btn.addEventListener('click', function(e){
        const target = btn.dataset.target;
        items.forEach(i => i.classList.remove('active'));
        btn.classList.add('active');

        dmenu.classList.remove('show');
        dbtn.setAttribute('aria-expanded', 'false');

        switchTo(target);
      });

      // keyboard support for items
      btn.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = items[(items.indexOf(btn)+1) % items.length];
          next.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = items[(items.indexOf(btn)-1 + items.length) % items.length];
          prev.focus();
        } else if (e.key === 'Escape') {
          dmenu.classList.remove('show');
          dbtn.focus();
        }
      });
    });

    // close on outside
    document.addEventListener('click', function(e){
      if (!e.target.closest('.dropdown')) {
        dmenu.classList.remove('show');
        dbtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') {
        dmenu.classList.remove('show');
        dbtn.setAttribute('aria-expanded','false');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
