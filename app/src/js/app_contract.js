// https://ipfs.io/docs/api/
// https://github.com/ipfs/js-ipfs-api
// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'

App = {
  web3Provider: null,
  contracts: {},
  ipfsApi: {},

  init: function () {
    App.ipfsApi = window.IpfsApi('localhost', '5001')
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
    $.getJSON('k', function (data) {
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
      let url = `https://ipfs.io/ipfs/${result[0].hash}`
      console.log(`Url --> ${url}`)
    })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
