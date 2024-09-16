document.addEventListener("DOMContentLoaded", () => {
  function highlightHashElement() {
    if (!location.hash) return;
    const targetId = location.hash.slice(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);
    const element = targetElement?.parentElement?.parentElement;
    if (!element) return;
    element.classList.add("highlight");
    setTimeout(() => element.classList.remove("highlight"), 3000);
  }

  window.addEventListener("hashchange", highlightHashElement);
  highlightHashElement();
});
