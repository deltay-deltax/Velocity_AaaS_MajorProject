const http = require('http');

function testEndpoint(path) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:5173${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`\n=== GET ${path} ===`);
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode >= 400) {
          console.log(`Error Body: ${data.substring(0, 1000)}`);
        } else {
             console.log(`Body (first 500 chars): ${data.substring(0, 500)}`);
        }
        resolve();
      });
    });
    req.on('error', (err) => {
      console.log(`Error requesting ${path}: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  await testEndpoint('/src/index.css');
  await testEndpoint('/src/main.tsx');
  await testEndpoint('/src/components/Navbar.tsx');
  await testEndpoint('/src/components/ui/button.jsx');
}

run();
