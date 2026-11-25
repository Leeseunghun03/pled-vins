/* PLED-VINS project page interactions.
   Comparison slider between the entropy score map and the entropy-recency score map. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCompare() {
    var box = document.getElementById('cmp');
    if (!box) return;
    var REST = 58, pos = REST, dragging = false, touched = false, anim = null;

    function set(p) {
      pos = Math.max(0, Math.min(100, p));
      box.style.setProperty('--pos', pos + '%');
      box.setAttribute('aria-valuenow', Math.round(pos));
    }
    function fromEvent(e) {
      var r = box.getBoundingClientRect();
      return (e.clientX - r.left) / r.width * 100;
    }
    function takeOver() {
      touched = true;
      if (anim) { cancelAnimationFrame(anim); anim = null; }
    }

    box.addEventListener('pointerdown', function (e) {
      takeOver(); dragging = true;
      box.setPointerCapture(e.pointerId);
      set(fromEvent(e));
    });
    box.addEventListener('pointermove', function (e) { if (dragging) set(fromEvent(e)); });
    box.addEventListener('pointerup', function () { dragging = false; });
    box.addEventListener('pointercancel', function () { dragging = false; });
    box.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowLeft') { takeOver(); set(pos - step); e.preventDefault(); }
      if (e.key === 'ArrowRight') { takeOver(); set(pos + step); e.preventDefault(); }
      if (e.key === 'Home') { takeOver(); set(0); e.preventDefault(); }
      if (e.key === 'End') { takeOver(); set(100); e.preventDefault(); }
    });

    // One gentle sweep the first time the slider comes into view, to show that it can be dragged.
    function sweep() {
      if (reduceMotion || touched) return;
      var keys = [REST, 22, 85, REST], seg = 900, t0 = null;
      function frame(t) {
        if (touched) return;
        if (t0 === null) t0 = t;
        var k = (t - t0) / seg, i = Math.floor(k);
        if (i >= keys.length - 1) { set(REST); anim = null; return; }
        var f = k - i, ease = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
        set(keys[i] + (keys[i + 1] - keys[i]) * ease);
        anim = requestAnimationFrame(frame);
      }
      anim = requestAnimationFrame(frame);
    }
    set(REST);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); setTimeout(sweep, 400); } });
      }, { threshold: 0.6 });
      io.observe(box);
    }
  }

  document.addEventListener('DOMContentLoaded', initCompare);
})();
