// Rosa - Popup Script

const rosaToggle = document.getElementById('rosaToggle');
const focusToggle = document.getElementById('focusToggle');
const dimGridToggle = document.getElementById('dimGridToggle');
const softerCornersToggle = document.getElementById('softerCornersToggle');
const eventBordersToggle = document.getElementById('eventBordersToggle');
const eventShadowToggle = document.getElementById('eventShadowToggle');
const dottedUnacceptedToggle = document.getElementById('dottedUnacceptedToggle');
const hideNavButtonsToggle = document.getElementById('hideNavButtonsToggle');
const subtleHeaderToggle = document.getElementById('subtleHeaderToggle');
const subtleTimesToggle = document.getElementById('subtleTimesToggle');
const subtleDatesToggle = document.getElementById('subtleDatesToggle');

// Load saved settings
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
  'rosaSubtleDates'
], (result) => {
  rosaToggle.checked = result.rosaEnabled !== false; // Default to enabled
  focusToggle.checked = result.rosaFocusMode || false;
  dimGridToggle.checked = result.rosaDimGrid || false;
  softerCornersToggle.checked = result.rosaSofterCorners || false;
  eventBordersToggle.checked = result.rosaEventBorders || false; // Default to showing borders
  eventShadowToggle.checked = result.rosaEventShadow || false;
  dottedUnacceptedToggle.checked = result.rosaDottedUnaccepted || false;
  hideNavButtonsToggle.checked = result.rosaHideNavButtons || false;
  subtleHeaderToggle.checked = result.rosaSubtleHeader || false;
  subtleTimesToggle.checked = result.rosaSubtleTimes || false;
  subtleDatesToggle.checked = result.rosaSubtleDates || false;
});

// Handle toggle changes
function updateSettings() {
  const enabled = rosaToggle.checked;
  const focusMode = focusToggle.checked;
  const dimGrid = dimGridToggle.checked;
  const softerCorners = softerCornersToggle.checked;
  const eventBorders = eventBordersToggle.checked;
  const eventShadow = eventShadowToggle.checked;
  const dottedUnaccepted = dottedUnacceptedToggle.checked;
  const hideNavButtons = hideNavButtonsToggle.checked;
  const subtleHeader = subtleHeaderToggle.checked;
  const subtleTimes = subtleTimesToggle.checked;
  const subtleDates = subtleDatesToggle.checked;

  // Send message to content script (only if on Google Calendar)
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.url?.includes('calendar.google.com')) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: 'toggleRosa',
          enabled,
          focusMode,
          dimGrid,
          softerCorners,
          eventBorders,
          eventShadow,
          dottedUnaccepted,
          hideNavButtons,
          subtleHeader,
          subtleTimes,
          subtleDates
        },
        (response) => {
          // Ignore errors (e.g., if content script isn't loaded yet)
          if (chrome.runtime.lastError) {
            // Settings are saved and will apply on page refresh
            console.log('Settings saved - refresh the page to apply');
          }
        }
      );
    }
  });
}

rosaToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaEnabled: rosaToggle.checked });
  updateSettings();
});

focusToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaFocusMode: focusToggle.checked });
  updateSettings();
});

dimGridToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaDimGrid: dimGridToggle.checked });
  updateSettings();
});

softerCornersToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaSofterCorners: softerCornersToggle.checked });
  updateSettings();
});

eventBordersToggle.addEventListener('change', () => {
  // If hide borders is enabled, turn off dotted unaccepted
  if (eventBordersToggle.checked) {
    dottedUnacceptedToggle.checked = false;
    chrome.storage.sync.set({ rosaDottedUnaccepted: false });
  }
  chrome.storage.sync.set({ rosaEventBorders: eventBordersToggle.checked });
  updateSettings();
});

eventShadowToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaEventShadow: eventShadowToggle.checked });
  updateSettings();
});

dottedUnacceptedToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaDottedUnaccepted: dottedUnacceptedToggle.checked });
  updateSettings();
});

hideNavButtonsToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaHideNavButtons: hideNavButtonsToggle.checked });
  updateSettings();
});

subtleHeaderToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaSubtleHeader: subtleHeaderToggle.checked });
  updateSettings();
});

subtleTimesToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaSubtleTimes: subtleTimesToggle.checked });
  updateSettings();
});

subtleDatesToggle.addEventListener('change', () => {
  chrome.storage.sync.set({ rosaSubtleDates: subtleDatesToggle.checked });
  updateSettings();
});
