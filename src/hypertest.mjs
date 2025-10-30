import * as htSdk from '@hypertestco/node-sdk-v3';


if (process.env.HT_MODE === 'RECORD') {
  htSdk.initialize({
    apiKey: process.env.HT_API_KEY,
    serviceId: process.env.HT_SERVICE_ID,
    serviceName: 'sample-mjs-express-pg',
    exporterUrl: process.env.HT_EXPORTER_URL
  });
}
