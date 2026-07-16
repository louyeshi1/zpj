(function () {
  var pending = Array.prototype.slice.call(document.querySelectorAll("img[data-src]"));

  function reveal(img) {
    if (!img || !img.dataset || !img.dataset.src) return;
    img.src = img.dataset.src;
    img.removeAttribute("data-src");
    var card = img.closest(".page-card");
    if (card) card.classList.remove("page-card-pending");
  }

  if (!("IntersectionObserver" in window)) {
    pending.forEach(reveal);
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      root: null,
      rootMargin: "900px 0px",
      threshold: 0.01,
    }
  );

  pending.forEach(function (img) {
    observer.observe(img);
  });
})();
