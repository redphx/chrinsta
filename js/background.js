let runApp = () => {
  let appWindow = {
    id: 'embed',
    frame: {
      type: 'chrome',
    },
    'icon': 'img/icon.png',
    'innerBounds': {
      width: 500,
      height: window.screen.availHeight,
      minWidth: 400,
      maxWidth: 600,
    }
  }
  chrome.app.window.create('html/embed.html', appWindow, onWindowLoaded());
}

let onWindowLoaded = popup => {
  return win => {
    win.contentWindow.onload = () => {
      let webview = win.contentWindow.document.getElementById('webview');

      webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Mobile Safari/537.36');

      webview.addEventListener('permissionrequest', e => {
        e.request.allow();
      });

      webview.addEventListener('newwindow', e => {
        win.contentWindow.open(e.targetUrl);
      });
    };
  };
}

chrome.app.runtime.onLaunched.addListener(runApp);
