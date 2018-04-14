module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      //gas: 5000000
      gas: 0x800000
    }
  }
};
