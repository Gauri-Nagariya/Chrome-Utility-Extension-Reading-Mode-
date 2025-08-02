const btn = document.getElementById('toggleBtn');

btn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: toggleReadingMode
    });
  });

  // Toggle the button label
  btn.textContent =
    btn.textContent === "Enable Reading Mode"
      ? "Disable Reading Mode"
      : "Enable Reading Mode";
});

function toggleReadingMode() {
  const alreadyClean = document.body.classList.contains('reading-mode');

  if (alreadyClean) {
    location.reload(); // revert back
  } else {
    document.body.classList.add('reading-mode');

    // Hide distracting elements
    const elementsToHide = [
      'header', 'nav', 'aside', 'footer', 'form', 'button',
      '.sidebar', '.advertisement', '.popup', '.ads', '.banner',
      '[role="banner"]', '[role="navigation"]', '[role="complementary"]'
    ];
    elementsToHide.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
    });

    // Keep only main content
    const mainContent = document.querySelector('article') || document.querySelector('main') || document.body;
    document.body.innerHTML = '';
    document.body.appendChild(mainContent.cloneNode(true));

    // Apply reader-friendly styles
    document.body.style.background = "#fdf6e3";
    document.body.style.color = "#000";
    document.body.style.fontSize = "18px";
    document.body.style.lineHeight = "1.6";
    document.body.style.padding = "40px";
    document.body.style.maxWidth = "800px";
    document.body.style.margin = "auto";
  }
}
