import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve .env path
const envPath = path.resolve(__dirname, '../.env');

if (!fs.existsSync(envPath)) {
  console.error('\x1b[31mError: .env file not found!\x1b[0m');
  console.log('Please copy .env.example to .env and configure your AWS credentials.');
  process.exit(1);
}

// Load env variables manually from .env
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const match = trimmed.match(/^([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[key] = value.trim();
  }
});

const bucketName = env.AWS_BUCKET_NAME || process.env.AWS_BUCKET_NAME;
const accessKey = env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
const secretKey = env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
const region = env.AWS_DEFAULT_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';

// Validate that values are configured and not placeholders
if (!bucketName || bucketName.includes('YOUR_') || 
    !accessKey || accessKey.includes('YOUR_') || 
    !secretKey || secretKey.includes('YOUR_')) {
  console.error('\x1b[31mError: AWS S3 credentials are not configured in your .env file!\x1b[0m');
  console.log('Please update the placeholders in .env with your actual AWS keys and S3 bucket details.');
  process.exit(1);
}

console.log('\n📦 \x1b[36mBuilding production bundles...\x1b[0m');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: path.resolve(__dirname, '..') });
  console.log('\x1b[32mProduction build succeeded.\x1b[0m\n');
} catch (error) {
  console.error('\x1b[31mError: Build step failed!\x1b[0m');
  process.exit(1);
}

console.log(`🚀 \x1b[36mDeploying to S3 bucket: ${bucketName} in region: ${region}...\x1b[0m`);
try {
  const syncCommand = `aws s3 sync dist/ s3://${bucketName} --delete`;
  execSync(syncCommand, {
    stdio: 'inherit',
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      AWS_ACCESS_KEY_ID: accessKey,
      AWS_SECRET_ACCESS_KEY: secretKey,
      AWS_DEFAULT_REGION: region
    }
  });
  console.log('\n🎉 \x1b[32mWebsite deployment complete!\x1b[0m');
  console.log(`\x1b[34mWebsite URL: http://${bucketName}.s3-website-${region}.amazonaws.com\x1b[0m\n`);
  console.log('\x1b[33mNote:\x1b[0m Ensure your S3 bucket has public website hosting enabled and the following bucket policy applied for public read access:');
  console.log(`
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${bucketName}/*"
    }
  ]
}`);
} catch (error) {
  console.error('\x1b[31mError: S3 sync failed!\x1b[0m');
  console.error(error.message);
  process.exit(1);
}
