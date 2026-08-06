const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.cluster0.zo8akma.mongodb.net", (err, records) => {
  if (err) {
    console.error("SRV Error:", err);
  } else {
    console.log(records);
  }
});