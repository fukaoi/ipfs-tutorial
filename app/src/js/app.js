// https://ipfs.io/docs/api/
// https://github.com/ipfs/js-ipfs-api
// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'

//todo: regist type 
// timestamp, filename     
// var web3 = require('web3');
App = {
  ipfsApi: {},
  web3: {},
  contracts: {},

  init: function () {
    App.ipfsApi = window.IpfsApi('localhost', '5001');
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    if (typeof web3 !== 'undefined') {
      web3Provider = web3.currentProvider;
    } else {
      web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(web3Provider);
    console.log(web3);
    $.getJSON('Ipfs.json', function (data) {
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
      App.contracts.Adoption.setProvider(App.web3Provider);
      console.log(App.contracts.Adoption);
    });
    return App.bindEvents();
    App.bindEvents();
  },

  bindEvents: function () {
    $('#target').submit(App.handleSubmit);
    $('#result').html = "aaaa";
  },

  handleSubmit: function (event) {
    console.log(web3.eth.accounts[0]);
    event.preventDefault();
    const file = event.target[0].files[0];
    const reader = new window.FileReader();
    reader.onloadend = () => App.saveIpfs(reader);
    reader.readAsArrayBuffer(file);
  },

  saveIpfs: function (reader) {
    const buf = buffer.Buffer(reader.result)
    App.ipfsApi.files.add(buf, (err, result) => { // Upload buffer to IPFS
      if(err) {
        console.error(err)
        return
      }
      const url = `https://ipfs.io/ipfs/${result[0].hash}`
      $('#result').html(url);
      console.log(`Url --> ${url}`)
    })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
