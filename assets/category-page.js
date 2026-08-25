// Category page ("Kategorie") interactions: the sleep-position finder quiz and the
// material split accordion + image swap. Vanilla JS, delegated on document so it
// works regardless of load order relative to the sections it targets.

document.addEventListener('click', function (event) {
  var optBtn = event.target.closest('.cat-finder__opt');
  if (optBtn) {
    var group = optBtn.closest('.cat-finder__opts');
    if (!group) return;

    group.querySelectorAll('.cat-finder__opt').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn === optBtn));
    });

    var box = optBtn.closest('.cat-finder__box');
    if (!box) return;

    var result = box.querySelector('.cat-finder__result');
    var img = box.querySelector('.cat-finder__result-img');
    var nameEl = box.querySelector('.cat-finder__result-name');
    var whyEl = box.querySelector('.cat-finder__result-why');
    var linkEl = box.querySelector('.cat-finder__result-link');

    if (nameEl) nameEl.textContent = optBtn.dataset.name || '';
    if (whyEl) whyEl.textContent = optBtn.dataset.why || '';
    if (linkEl && optBtn.dataset.href) linkEl.setAttribute('href', optBtn.dataset.href);
    if (img && optBtn.dataset.image) img.setAttribute('src', optBtn.dataset.image);

    if (result) {
      result.classList.remove('cat-finder__fade');
      // eslint-disable-next-line no-unused-expressions
      result.offsetWidth;
      result.classList.add('cat-finder__fade');
    }

    return;
  }

  var rowBtn = event.target.closest('.cat-split__row-btn');
  if (rowBtn) {
    var row = rowBtn.closest('.cat-split__row');
    var rows = rowBtn.closest('.cat-split__rows');
    if (!row || !rows) return;

    rows.querySelectorAll('.cat-split__row').forEach(function (r) {
      r.classList.toggle('is-active', r === row);
    });

    var media = rows.closest('.cat-split').querySelector('.cat-split__media');
    if (media && row.dataset.img) {
      media.querySelectorAll('img').forEach(function (image) {
        image.classList.toggle('is-active', image.dataset.i === row.dataset.img);
      });
    }
  }
});
