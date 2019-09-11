let checkForUpdate = () => {
  let manifestUrl = 'https://raw.githubusercontent.com/redphx/chrinsta/master/manifest.json';

  let xhr = new XMLHttpRequest();
  xhr.open('GET', manifestUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      let resp = JSON.parse(xhr.responseText);
      if (resp.version != chrome.runtime.getManifest().version) {
        chrome.notifications.create({
          type: 'basic',
          title: 'ChrInsta',
          iconUrl: 'img/icon.png',
          message: 'Đã có phiên bản mới ' + resp.version +'. Nhấn vào để xem hướng dẫn cập nhật.',
        });
      }
    }
  }
  xhr.send();
}

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
  checkForUpdate();

  return win => {
    win.contentWindow.onload = () => {
      let webview = win.contentWindow.document.getElementById('webview');

      webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Mobile Safari/537.36');

      webview.addEventListener('permissionrequest', e => {
        e.request.allow();
      });

      webview.addEventListener('newwindow', e => {
        e.preventDefault();
        if (e.targetUrl !== 'about:blank') {
          win.contentWindow.open(e.targetUrl);
        }
      });
    };
  };
}

chrome.notifications.onClicked.addListener(notificationId => {
  let homepageUrl = 'https://github.com/redphx/chrinsta';
  window.open(homepageUrl);
});

chrome.app.runtime.onLaunched.addListener(runApp);
