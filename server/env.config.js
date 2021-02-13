module.exports = {
  apps: [
    {
      name: "epic7gg-server",
      script: "./server.js",
      watch: false,
      env: {
        "ORIGIN": "https://epic7.gg",
      }
    }
  ]
}
