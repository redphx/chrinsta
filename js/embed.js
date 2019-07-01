var webview = document.getElementById('webview');

function onKeyDown(e) {
  let modifierActive = (navigator.platform.startsWith('Win')) ? e.ctrlKey : e.metaKey;
  let altModifierActive = (navigator.platform.startsWith('Win')) ? e.altKey : e.ctrlKey;

  // F5 or Ctrl/Cmd + R
  if (e.keyCode === 116 || (modifierActive && e.keyCode === 82)) {
    if (typeof webview !== 'undefined') {
      webview.reload();
    } else {
      window.location.reload();
    }
  }
}

window.addEventListener('keydown', onKeyDown);

webview.addEventListener('contentload', () => {
  webview.executeScript({
    code: 'window.addEventListener("keydown", ' + onKeyDown.toString() + ')',
  });
});