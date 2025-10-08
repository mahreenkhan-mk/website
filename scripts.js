document.querySelectorAll('[data-include]').forEach(async (el) => {
      const file = el.getAttribute('data-include');
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(res.status);
        el.innerHTML = await res.text();
      } catch (e) {
        el.innerHTML = "<!-- include failed: " + file + " -->";
      }
    });
  
    // Theme toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('lab-theme');
    if (savedTheme) root.setAttribute('data-bs-theme', savedTheme);
    themeToggleBtn?.addEventListener('click', () => {
      const current = root.getAttribute('data-bs-theme') || 'light';
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-bs-theme', next);
      localStorage.setItem('lab-theme', next);
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) backToTop.style.display = 'inline-flex';
      else backToTop.style.display = 'none';
    });
    backToTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Bootstrap client-side validation
    (() => {
      const forms = document.querySelectorAll('.needs-validation');
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    })();
    
const offcanvasElement = document.getElementById('offcanvasNav');
const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
const navLinks = offcanvasElement.querySelectorAll('.nav-link');
navLinks.forEach(function(link) {
  link.addEventListener('click', function() {
    bsOffcanvas.hide();
  });
});
