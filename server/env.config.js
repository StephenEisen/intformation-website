module.exports = {
  apps: [
    {
      name: "epic7gg-server",
      script: "./server.js",
      watch: false,
      env: {
        "IS_DEV": false,
        "ORIGIN": "https://epic7.gg",
      }
    }
  ]
}
