document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));

  function setActive(key){
    // tabs
    tabs.forEach(btn => {
      const isActive = btn.dataset.tab === key;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });

    // panels
    panels.forEach(p => {
      const isActive = p.dataset.panel === key;
      p.classList.toggle("active", isActive);
    });
  }

  tabs.forEach(btn => {
    btn.addEventListener("click", () => setActive(btn.dataset.tab));
  });
});
