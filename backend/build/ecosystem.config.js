"use strict";

// Target server hostname or IP address
var TARGET_SERVER_HOST = process.env.TARGET_SERVER_HOST ? process.env.TARGET_SERVER_HOST.trim() : "";
// Target server username
var TARGET_SERVER_USER = process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : "";
// Target server application path
var TARGET_SERVER_APP_PATH = "/home/" + TARGET_SERVER_USER + "/clients-app";
// Your repository
var REPO = "git@gitlab.com:dev4mir/clients-app.git";

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [{
    name: "clientApp",
    script: "npm",
    args: "start",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 4000
    }
  }],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: "origin/master",
      repo: REPO,
      ssh_options: "StrictHostKeyChecking=no",
      path: TARGET_SERVER_APP_PATH,
      "post-deploy": "npm install" + " && pm2 startOrRestart ecosystem.config.js --env=production" + " && pm2 save"
    }
  }
};