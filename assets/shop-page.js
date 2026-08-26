// Shop page ("/pages/shop") chip scroll-spy: highlights the jump-nav chip
// whose target section is currently in view.

document.addEventListener('DOMContentLoaded', function () {
  var chips = Array.prototype.slice.call(document.querySelectorAll('.shop-chip'));
  if (!chips.length || !('IntersectionObserver' in window)) return;

  var sections = chips
    .map(function (chip) {
      return document.getElementById(chip.dataset.target);
    })
    .filter(Boolean);

  if (!sections.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        chips.forEach(function (chip) {
          chip.classList.toggle('is-current', chip.dataset.target === entry.target.id);
        });
      });
    },
    { rootMargin: '-200px 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
});
