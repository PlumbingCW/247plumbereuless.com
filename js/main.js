(function () {
  "use strict";
  var BREAKPOINT = 768;
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("drawer-close");
  var root = document.documentElement;

  function setDrawer(open) {
    if (!drawer || !toggle) { return; }
    drawer.classList.toggle("open", open);
    if (overlay) { overlay.classList.toggle("visible", open); }
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    root.style.overflow = open ? "hidden" : "";
    if (open && closeBtn) { closeBtn.focus(); }
    if (!open && toggle) { toggle.focus(); }
  }
  if (toggle) { toggle.addEventListener("click", function () { setDrawer(!drawer.classList.contains("open")); }); }
  if (closeBtn) { closeBtn.addEventListener("click", function () { setDrawer(false); }); }
  if (overlay) { overlay.addEventListener("click", function () { setDrawer(false); }); }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) { setDrawer(false); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > BREAKPOINT && drawer && drawer.classList.contains("open")) {
      drawer.classList.remove("open");
      if (overlay) { overlay.classList.remove("visible"); }
      if (toggle) { toggle.setAttribute("aria-expanded", "false"); }
      root.style.overflow = "";
    }
  });

  var items = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(items, function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) { return; }
    q.addEventListener("click", function () {
      var open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : "";
    });
  });
})();
