const keyExpiry = (Math.floor(new Date().getTime()/1000) + 86400).toString();  // 24 hrs expiry
console.log(keyExpiry);