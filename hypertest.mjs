import * as htSdk from '@hypertestco/node-sdk'; // for esm/ts
// const htSdk = require('@hypertestco/node-sdk'); // for commonJS
htSdk.initialize({
    apiKey: '<your-api-key>',
    serviceId: '<your-service-identifier-from-dashboard>',
    serviceName: '<organizationName:service-name>',
    exporterUrl: '<hypertest-logger-url>'
});