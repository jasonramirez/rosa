// Rosa - Minimal Google Calendar Content Script

// Load saved state
chrome.storage.sync.get([
  'rosaEnabled',
  'rosaFocusMode',
  'rosaDimGrid',
  'rosaSofterCorners',
  'rosaEventBorders',
  'rosaEventShadow',
  'rosaDottedUnaccepted',
  'rosaHideNavButtons',
  'rosaSubtleHeader',
  'rosaSubtleTimes',
  'rosaSubtleDates',
  'rosaHideLogo'
], (result) => {
  const enabled = result.rosaEnabled !== false; // Default to enabled
  const focusMode = result.rosaFocusMode || false;
  const dimGrid = result.rosaDimGrid || false;
  const softerCorners = result.rosaSofterCorners || false;
  const eventBorders = result.rosaEventBorders || false; // Default to showing borders
  const eventShadow = result.rosaEventShadow || false;
  const dottedUnaccepted = result.rosaDottedUnaccepted || false;
  const hideNavButtons = result.rosaHideNavButtons || false;
  const subtleHeader = result.rosaSubtleHeader || false;
  const subtleTimes = result.rosaSubtleTimes || false;
  const subtleDates = result.rosaSubtleDates || false;
  const hideLogo = result.rosaHideLogo || false;

  applyRosa(enabled, focusMode, dimGrid, softerCorners, eventBorders, eventShadow, dottedUnaccepted, hideNavButtons, subtleHeader, subtleTimes, subtleDates, hideLogo);
});

// Listen for toggle from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggleRosa') {
    applyRosa(
      message.enabled,
      message.focusMode,
      message.dimGrid,
      message.softerCorners,
      message.eventBorders,
      message.eventShadow,
      message.dottedUnaccepted,
      message.hideNavButtons,
      message.subtleHeader,
      message.subtleTimes,
      message.subtleDates,
      message.hideLogo
    );
  }
});

function applyRosa(enabled, focusMode, dimGrid, softerCorners, eventBorders, eventShadow, dottedUnaccepted, hideNavButtons, subtleHeader, subtleTimes, subtleDates, hideLogo) {
  if (enabled) {
    document.body.classList.add('rosa-enabled');

    if (focusMode) {
      document.body.classList.add('rosa-focus-mode');
    } else {
      document.body.classList.remove('rosa-focus-mode');
    }

    if (dimGrid) {
      document.body.classList.add('rosa-dim-grid');
    } else {
      document.body.classList.remove('rosa-dim-grid');
    }

    if (softerCorners) {
      document.body.classList.add('rosa-softer-corners');
    } else {
      document.body.classList.remove('rosa-softer-corners');
    }

    if (eventBorders) {
      document.body.classList.add('rosa-no-borders');
    } else {
      document.body.classList.remove('rosa-no-borders');
    }

    if (eventShadow) {
      document.body.classList.add('rosa-event-shadow');
    } else {
      document.body.classList.remove('rosa-event-shadow');
    }

    if (dottedUnaccepted) {
      document.body.classList.add('rosa-dotted-unaccepted');
    } else {
      document.body.classList.remove('rosa-dotted-unaccepted');
    }

    if (hideNavButtons) {
      document.body.classList.add('rosa-hide-nav-buttons');
    } else {
      document.body.classList.remove('rosa-hide-nav-buttons');
    }

    if (subtleHeader) {
      document.body.classList.add('rosa-subtle-header');
    } else {
      document.body.classList.remove('rosa-subtle-header');
    }

    if (subtleTimes) {
      document.body.classList.add('rosa-subtle-times');
    } else {
      document.body.classList.remove('rosa-subtle-times');
    }

    if (subtleDates) {
      document.body.classList.add('rosa-subtle-dates');
    } else {
      document.body.classList.remove('rosa-subtle-dates');
    }

    if (hideLogo) {
      document.body.classList.add('rosa-hide-logo');
    } else {
      document.body.classList.remove('rosa-hide-logo');
    }
  } else {
    document.body.classList.remove(
      'rosa-enabled',
      'rosa-focus-mode',
      'rosa-dim-grid',
      'rosa-softer-corners',
      'rosa-no-borders',
      'rosa-event-shadow',
      'rosa-dotted-unaccepted',
      'rosa-hide-nav-buttons',
      'rosa-subtle-header',
      'rosa-subtle-times',
      'rosa-subtle-dates',
      'rosa-hide-logo'
    );
  }
}

// Force-dim grid lines by overriding inline styles
let applyDimGridRunning = false;

function applyDimGrid() {
  // Prevent infinite loops
  if (applyDimGridRunning) return;
  applyDimGridRunning = true;

  console.log('Rosa: applyDimGrid running');

  // CSS overlay approach should handle most of the work
  // Just apply the class and let CSS do its thing

  applyDimGridRunning = false;
}

// Auto-hide keyboard shortcuts modal
const observer = new MutationObserver(() => {
  // Hide keyboard shortcuts modal
  const modal = document.querySelector('[role="dialog"][aria-label*="Keyboard shortcuts"]');
  if (modal && document.body.classList.contains('rosa-enabled')) {
    modal.style.display = 'none';
  }

  // No need to re-apply dim grid - CSS handles it automatically
});

observer.observe(document.body, { childList: true, subtree: true });
