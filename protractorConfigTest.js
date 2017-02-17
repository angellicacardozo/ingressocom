/**
** Protactor Configuration File for App e2e Tests Cases
** @run webdriver-manager start, protractor protectorCinfigTest.js
**
**/
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  directConnect: true,

  /**
  ** Capabilities to be passed to the webdriver instance.
  **/
  capabilities: {
    'browserName': 'chrome'
  },

  /**
  ** Framework to use. Jasmine 2 is recommended.
  **/
  framework: 'jasmine2',

  /**
  ** Spec patterns are relative to the current working directly when
  ** protractor is called.
  **/
  specs: ['spec/e2e/**/*.js'],

  baseUrl: 'http://localhost:8000',

  /**
  ** Options to be passed to Jasmine.
  **/
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};