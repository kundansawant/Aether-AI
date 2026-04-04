const https = require('https');

const url = 'https://gxcbzschfvajyiwdtcqq.supabase.com/rest/v1/health';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Y2J6c2NoZnZhanlpd2R0Y3FxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNDcxMzIsImV4cCI6MjA5MDcyMzEzMn0.7Zy2wxLpTNtACUHO4g6dEyu4wZcQVPvZLyjwJZCy7M4';

const options = {
  headers: {
    'apikey': apiKey,
    'Authorization': `Bearer ${apiKey}`
  }
};

console.log("Pinging Supabase at:", url);

https.get(url, options, (res) => {
  console.log('Status Code:', res.statusCode);
  if (res.statusCode === 200) {
    console.log('SUCCESS: Supabase project is ONLINE and Key is VALID.');
  } else {
    console.log('FAILURE: Supabase responded with error:', res.statusCode);
  }
}).on('error', (e) => {
  console.error('NETWORK ERROR: Could not reach Supabase. Check your connection or VPN.');
  console.error(e.message);
});
