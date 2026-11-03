// Highlights the section currently on screen in the top navigation.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.sections a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  var targets = [];
  links.forEach(function (link) {
    var el = document.getElementById(link.getAttribute('href').slice(1));
    if (el) { byId[el.id] = link; targets.push(el); }
  });

  var nav = document.querySelector('.sections');
  var visible = {};

  function update() {
    var current = null;
    for (var i = 0; i < targets.length; i++) {
      if (visible[targets[i].id]) { current = targets[i].id; break; }
    }
    if (!current) return;
    links.forEach(function (l) { l.removeAttribute('aria-current'); });
    var active = byId[current];
    active.setAttribute('aria-current', 'true');
    // Keep the active link in view when the nav scrolls horizontally (phones).
    if (nav && nav.scrollWidth > nav.clientWidth) {
      var left = active.offsetLeft - nav.clientWidth / 2 + active.offsetWidth / 2;
      nav.scrollTo({ left: left, behavior: 'smooth' });
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    update();
  }, { rootMargin: '-25% 0px -65% 0px' });

  targets.forEach(function (t) { observer.observe(t); });
})();
