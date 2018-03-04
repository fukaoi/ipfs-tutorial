// https://ipfs.io/docs/api/
// https://github.com/ipfs/js-ipfs-api

const ipfsAPI = require('ipfs-api')

App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    App.ipfsApi = ipfsAPI('localhost', '5001')
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpPrivider('http://localhost:9545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Adoption.json', function (data) {
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
      App.contracts.Adoption.setProvider(App.web3Provider);
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $('#target').submit(App.handleSubmit);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    let file = event.target[0].files;
    let reader = new window.FileReader();
    reader.onloadend = () => App.saveIpfs(reader);
    // reader.readAsArrayBuffer(file);
  },

  saveIpfs: function (reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    App.ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        console.log(ipfsId)
        App.setState({ added_file_hash: ipfsId })
      }).catch((err) => {
        console.error(err)
      })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
