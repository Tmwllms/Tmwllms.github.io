document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  const scrollWrapper = document.querySelector(".scroll-wrapper");
  const sections = document.querySelectorAll(".scroll-section");
  const timelineProgress = document.querySelector(".timeline-progress");
  const timelineLabels = document.querySelectorAll(".timeline-labels span");
  const timelineIndicator = document.querySelector(".timeline-indicator");
  const timelineBar = document.querySelector(".timeline-bar");

  function updateTimeline() {
    const scrollLeft = main.scrollLeft;
    const maxScrollLeft = scrollWrapper.scrollWidth - main.clientWidth;

    // Calculate scroll progress 0 to 1
    let progress = scrollLeft / maxScrollLeft;
    progress = Math.min(Math.max(progress, 0), 1);

    // Update progress bar width (0 to 100%)
    timelineProgress.style.width = `${progress * 100}%`;

    // Find the section whose center is closest to the center of the viewport
    const mainCenter = scrollLeft + main.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    sections.forEach((section, index) => {
      const sectionLeft = section.offsetLeft;
      const sectionCenter = sectionLeft + section.clientWidth / 2;
      const distance = Math.abs(mainCenter - sectionCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    // Get the corresponding label
    const label = timelineLabels[closestIndex];
    if (!label) return;

    // Calculate label's center relative to timelineBar
    const labelRect = label.getBoundingClientRect();
    const barRect = timelineBar.getBoundingClientRect();

    const labelCenterX = labelRect.left + labelRect.width / 2;
    const offsetX = labelCenterX - barRect.left;

    // Move timelineIndicator
    timelineIndicator.style.left = `${offsetX}px`;

    // Update timelineIndicator text
    timelineIndicator.textContent = label.textContent;
  }

  // Initial update
  updateTimeline();

  // Update on scroll
  main.addEventListener("scroll", updateTimeline);

  // Update on resize (to recalc positions)
  window.addEventListener("resize", updateTimeline);
});
