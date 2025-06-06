document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const scrollWrapper = document.querySelector(".scroll-wrapper");
  const progressBar = document.getElementById("progress-bar");

  function updateProgress() {
    const scrollLeft = main.scrollLeft;
    const maxScrollLeft = scrollWrapper.scrollWidth - main.clientWidth;

    const progress = Math.min(Math.max(scrollLeft / maxScrollLeft, 0), 1);
    progressBar.style.width = `${progress * 100}%`;
  }

  main.addEventListener("scroll", updateProgress);
  window.addEventListener("resize", updateProgress);
  updateProgress(); // initial update
});
