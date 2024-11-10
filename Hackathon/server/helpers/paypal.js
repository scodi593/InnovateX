const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AbXo-zjOp_SlQUfaj3zxXgiwsSUmIelU515-SyTid748Gon_du3vCSghvgTgV8bIlxvYJFmLWekgU1-V",
  client_secret: "EPS3um6qHHvdMmH6tRSRDFbE3vyfZcdySVZWDwhY3UZ26mweK2VJXwzCFtQurLyci3Wnt7h35j5o0COU",
});

module.exports = paypal;