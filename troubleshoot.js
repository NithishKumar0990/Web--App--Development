const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const http = require('http');
const https = require('https');

// Terminal colors
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  red: "\x1b[31m"
};

console.log(`${colors.bright}${colors.cyan}==========================================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}         MASTER DECOUPLED WEB APP TROUBLESHOOTER          ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}==========================================================${colors.reset}\n`);

const diagnostics = {
  phpInstalled: false,
  composerInstalled: false,
  laravelRunning: false,
  viteRunning: false,
  localEnvOk: false,
  databaseOk: false,
  localApiOk: false,
  remoteApiOk: false,
};

// Help helper
function printHeader(title) {
  console.log(`\n${colors.bright}${colors.blue}--- ${title} ---${colors.reset}`);
}

// 1. Check CLI Tools
printHeader("1. CLI Tool Checks");
try {
  const phpVer = execSync('php -v').toString().split('\n')[0].trim();
  console.log(`${colors.green}✔ PHP: ${phpVer}${colors.reset}`);
  diagnostics.phpInstalled = true;
} catch (e) {
  console.log(`${colors.red}✘ PHP: Not found in PATH. Please install PHP 8.2+ or start XAMPP.${colors.reset}`);
}

try {
  const nodeVer = execSync('node -v').toString().trim();
  console.log(`${colors.green}✔ Node.js: ${nodeVer}${colors.reset}`);
} catch (e) {
  console.log(`${colors.red}✘ Node.js: Not found. Please install Node.js.${colors.reset}`);
}

try {
  const compVer = execSync('composer --version').toString().split('\n')[0].trim();
  console.log(`${colors.green}✔ Composer: ${compVer}${colors.reset}`);
  diagnostics.composerInstalled = true;
} catch (e) {
  console.log(`${colors.yellow}⚠ Composer: Not found in PATH. Make sure Composer is installed.${colors.reset}`);
}

// 2. Check Port Availability (8000 & 5173)
printHeader("2. Port Availability Checks");

function checkPort(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is occupied (something is running)
      } else {
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is free (nothing is running)
    });
    server.listen(port, '127.0.0.1');
  });
}

// 3. Configuration Checks
printHeader("3. Configuration Files & Environment Variables");
const frontendEnvPath = path.join(__dirname, 'PORT', '.env');
const backendEnvPath = path.join(__dirname, 'LaravelProjects', 'fromInstaller', '.env');

let viteApiUrl = "";
if (fs.existsSync(frontendEnvPath)) {
  const content = fs.readFileSync(frontendEnvPath, 'utf8');
  console.log(`${colors.green}✔ Frontend .env file found.${colors.reset}`);
  const match = content.match(/^VITE_API_URL=(.*)$/m);
  if (match) {
    viteApiUrl = match[1].trim();
    console.log(`  - Configured VITE_API_URL: "${colors.bright}${viteApiUrl}${colors.reset}"`);
  } else {
    console.log(`  - ${colors.yellow}⚠ VITE_API_URL is empty or missing in frontend .env.${colors.reset}`);
  }
} else {
  console.log(`${colors.yellow}⚠ Frontend .env not found in PORT/.env${colors.reset}`);
}

let dbHost = "";
let dbDatabase = "";
if (fs.existsSync(backendEnvPath)) {
  const content = fs.readFileSync(backendEnvPath, 'utf8');
  console.log(`${colors.green}✔ Backend .env file found.${colors.reset}`);
  diagnostics.localEnvOk = true;

  const appUrl = (content.match(/^APP_URL=(.*)$/m) || [])[1];
  const dbConnection = (content.match(/^DB_CONNECTION=(.*)$/m) || [])[1];
  dbHost = (content.match(/^DB_HOST=(.*)$/m) || [])[1];
  dbDatabase = (content.match(/^DB_DATABASE=(.*)$/m) || [])[1];

  console.log(`  - APP_URL: ${appUrl ? appUrl.trim() : 'not set'}`);
  console.log(`  - DB_CONNECTION: ${dbConnection ? dbConnection.trim() : 'not set'}`);
  console.log(`  - DB_HOST: ${dbHost ? dbHost.trim() : 'not set'}`);
  console.log(`  - DB_DATABASE: ${dbDatabase ? dbDatabase.trim() : 'not set'}`);
} else {
  console.log(`${colors.red}✘ Backend .env not found in LaravelProjects/fromInstaller/.env${colors.reset}`);
}

// 4. Database Connection Check
async function runDatabaseCheck() {
  printHeader("4. Database Connectivity");
  if (!diagnostics.phpInstalled) {
    console.log(`${colors.red}✘ Cannot test database connection: PHP is not installed.${colors.reset}`);
    return;
  }
  if (!diagnostics.localEnvOk) {
    console.log(`${colors.red}✘ Cannot test database connection: Backend .env is missing.${colors.reset}`);
    return;
  }

  try {
    const migrateStatus = execSync('php artisan migrate:status', {
      cwd: path.join(__dirname, 'LaravelProjects', 'fromInstaller'),
      stdio: ['ignore', 'pipe', 'pipe']
    }).toString();
    console.log(`${colors.green}✔ Database connected successfully!${colors.reset}`);
    console.log(`✔ Migrations Status: Valid.`);
    diagnostics.databaseOk = true;
  } catch (err) {
    console.log(`${colors.red}✘ Database Connection Failed!${colors.reset}`);
    console.log(`Error output: ${err.message || err}`);
    if (dbHost && dbHost.includes('supabase.co')) {
      console.log(`\n${colors.yellow}👉 TIP: Supabase default host requires IPv6. If you are running locally or on a serverless provider without IPv6 support, use the Supabase Connection Pooler host (ends in .pooler.supabase.com) instead!${colors.reset}`);
    }
  }
}

// 5. Test API endpoints
function testHttp(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { timeout: 3000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          contentType: res.headers['content-type'] || '',
          body: data
        });
      });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function runApiChecks() {
  printHeader("5. API Server & Endpoint Tests");

  const is8000Active = await checkPort(8000);
  const is5173Active = await checkPort(5173);

  console.log(`Local Laravel Server (Port 8000): ${is8000Active ? colors.green + 'RUNNING' : colors.yellow + 'NOT RUNNING'}${colors.reset}`);
  console.log(`Local Vite Server (Port 5173): ${is5173Active ? colors.green + 'RUNNING' : colors.yellow + 'NOT RUNNING'}${colors.reset}`);

  diagnostics.laravelRunning = is8000Active;
  diagnostics.viteRunning = is5173Active;

  if (is8000Active) {
    const localRes = await testHttp('http://127.0.0.1:8000/api/contact');
    if (localRes.error) {
      console.log(`${colors.red}✘ Local API check failed: ${localRes.error}${colors.reset}`);
    } else if (localRes.statusCode === 200 && localRes.body.includes('alive')) {
      console.log(`${colors.green}✔ Local API contact endpoint is alive and functional!${colors.reset}`);
      diagnostics.localApiOk = true;
    } else {
      console.log(`${colors.yellow}⚠ Local API returned status ${localRes.statusCode}: ${localRes.body.substring(0, 100)}${colors.reset}`);
    }
  } else {
    console.log(`${colors.yellow}⚠ Local API cannot be verified (Laravel server is offline).${colors.reset}`);
  }

  // Check remote API
  const prodBackendUrl = "https://web-app-development-from-installer-seven.vercel.app";
  console.log(`\nTesting production backend deployment (${prodBackendUrl})...`);
  
  // Test double API path
  const remoteRes = await testHttp(`${prodBackendUrl}/api/api/contact`);
  if (remoteRes.error) {
    console.log(`${colors.red}✘ Remote Production API check failed: ${remoteRes.error}${colors.reset}`);
  } else if (remoteRes.statusCode === 200 && remoteRes.body.includes('alive')) {
    console.log(`${colors.green}✔ Remote Production API endpoint is alive and responsive!${colors.reset}`);
    diagnostics.remoteApiOk = true;
  } else {
    console.log(`${colors.yellow}⚠ Remote API returned status ${remoteRes.statusCode}. Vercel environment variables or database connection might be failing.${colors.reset}`);
  }
}

// Main execution flow
async function main() {
  await runDatabaseCheck();
  await runApiChecks();

  printHeader("6. DIAGNOSTIC SUMMARY & GUIDANCE");

  let issuesCount = 0;

  if (!diagnostics.laravelRunning) {
    issuesCount++;
    console.log(`${colors.yellow}[ISSUE] Local Laravel Server is not running.${colors.reset}`);
    console.log(`  👉 FIX: Run ${colors.bright}npm run dev${colors.reset} from the workspace root folder to start both frontend and backend concurrently.`);
    console.log(`  👉 OR: Run ${colors.bright}php artisan serve${colors.reset} inside the ${colors.bright}LaravelProjects/fromInstaller${colors.reset} directory.`);
  }

  if (diagnostics.laravelRunning && !diagnostics.databaseOk) {
    issuesCount++;
    console.log(`${colors.red}[ISSUE] Local server is running but database connection is failing.${colors.reset}`);
    console.log(`  👉 FIX: Check your database host and password in ${colors.bright}LaravelProjects/fromInstaller/.env${colors.reset}.`);
    console.log(`  👉 TIP: Ensure your database allows traffic from your current IP address (in Supabase, check Allowed IP settings or verify your network connection).`);
  }

  if (viteApiUrl && !viteApiUrl.endsWith('/api') && !viteApiUrl.startsWith('http://127.0.0.1')) {
    issuesCount++;
    console.log(`${colors.red}[ISSUE] Frontend VITE_API_URL configured incorrectly in environment.${colors.reset}`);
    console.log(`  Current VITE_API_URL: "${viteApiUrl}"`);
    console.log(`  👉 FIX: In production (Vercel settings), set VITE_API_URL to:`);
    console.log(`     ${colors.bright}https://web-app-development-from-installer-seven.vercel.app/api${colors.reset}`);
    console.log(`     (Note: This trailing "/api" is critical because Vercel PHP strips the first /api prefix, making double-api mapping necessary).`);
  }

  if (diagnostics.remoteApiOk) {
    console.log(`${colors.green}✔ Production Backend Deployment is ONLINE and healthy!${colors.reset}`);
  } else {
    issuesCount++;
    console.log(`${colors.red}[ISSUE] Production Backend Deployment is OFFLINE or returning errors.${colors.reset}`);
    console.log(`  👉 FIX: Check the Vercel dashboard logs for your backend deployment.`);
    console.log(`  👉 Check that Vercel has correct Env variables for Supabase (using the Session Pooler host ending in .pooler.supabase.com).`);
  }

  if (issuesCount === 0) {
    console.log(`\n${colors.bright}${colors.green}🎉 ALL DIAGNOSTIC TESTS PASSED! Everything is running correctly.${colors.reset}\n`);
  } else {
    console.log(`\n${colors.bright}${colors.yellow}⚠ Found ${issuesCount} item(s) to address. Follow the recommendations above to resolve the network error.${colors.reset}\n`);
  }
}

main();
