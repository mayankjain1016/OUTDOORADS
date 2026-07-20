const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1542204165608-f5659872be99?w=800&q=80",
  "https://images.unsplash.com/photo-1559828551-ddb663556094?w=800&q=80",
  "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80",
  "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&q=80",
  "https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&q=80",
  "https://images.unsplash.com/photo-1485001211100-880bb6e7d953?w=800&q=80",
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`Status for ${url}: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Error for ${url}: ${e.message}`);
  });
});
