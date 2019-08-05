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
  } else if (window.location.href.indexOf('/direct/t/') > -1) {
    // Enter to send message
    if (e.keyCode === 13 && !e.shiftKey) {
      let sibling = e.target.parentNode.nextElementSibling;
      let sendBtn = sibling.querySelector('button');
      if (sendBtn) {
        sendBtn.click()
        e.preventDefault()
      }
    }
  }
}

window.addEventListener('keydown', onKeyDown);

webview.addEventListener('contentload', () => {
  webview.executeScript({
    code: 'window.addEventListener("keydown", ' + onKeyDown.toString() + ')',
  });
});