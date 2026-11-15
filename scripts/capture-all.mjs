import { spawn } from 'child_process';
import fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const SITES = [
  { name: 'drjpnaut', url: 'https://drjpnauthomeopath.in' },
  { name: 'jmmt', url: 'https://jmmt.org.in' },
  { name: 'flatout', url: 'https://flatout13.netlify.app' },
  { name: 'ecomm', url: 'https://ecomm1326.netlify.app' },
  { name: 'ochno', url: 'https://ochno2.netlify.app' },
  { name: 'ctst', url: 'https://ctst.netlify.app' },
  { name: 'kulfi', url: 'https://euphonious-kulfi-19377f.netlify.app' },
];

async function capture() {
  const port = 9222;
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--user-data-dir=/tmp/chrome-cdp',
    '--window-size=1440,2600',
    '--hide-scrollbars',
    'about:blank',
  ]);

  // Wait for Chrome to start
  await new Promise((r) => setTimeout(r, 1500));

  let versionData;
  for (let i = 0; i < 10; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      versionData = await res.json();
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  if (!versionData) {
    console.error('Failed to connect to Chrome CDP');
    chrome.kill();
    return;
  }

  const wsUrl = versionData.webSocketDebuggerUrl;
  console.log('Connected to Chrome:', wsUrl);

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve) => (ws.onopen = resolve));

  let id = 1;
  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };

  // Create new target page
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', {
    targetId,
    flatten: true,
  });

  const sendSession = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === msgId) {
          ws.removeEventListener('message', handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, sessionId, method, params }));
    });
  };

  await sendSession('Page.enable');
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 2600,
    deviceScaleFactor: 1.5, // Crisp retina quality!
    mobile: false,
  });

  for (const site of SITES) {
    console.log(`Navigating to ${site.name} (${site.url})...`);
    await sendSession('Page.navigate', { url: site.url });
    // Wait for DOM & images to render
    await new Promise((r) => setTimeout(r, 3000));

    const { data } = await sendSession('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false,
    });

    const buffer = Buffer.from(data, 'base64');
    fs.writeFileSync(`public/projects/${site.name}.png`, buffer);
    console.log(`Saved public/projects/${site.name}.png (${buffer.length} bytes)`);
  }

  ws.close();
  chrome.kill();
  console.log('All screenshots captured successfully!');
}

capture().catch(console.error);
