// https://ipfs.io/docs/api/
// https://github.com/ipfs/js-ipfs-api
// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
// before geth daemon startup, geth --dev --rpc --rpccorsdomain "*"'

App = {
  ipfsApi: {},
  web3: {},
  contracts: {},

  init: function () {
    App.ipfsApi = window.IpfsApi('localhost', '5001');

    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    App.web3 = new Web3(web3Provider);
    $.getJSON('Ipfs.json', function (data) {
      var IpfsArtifact = data;
      App.contracts.Ipfs = TruffleContract(IpfsArtifact);
      App.contracts.Ipfs.setProvider(web3Provider);
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $('#target').submit(App.handleSubmit);
    $('#result').html = "";
  },

  handleSubmit: function (event) {
    console.log(App.web3.eth);
    console.log(App.web3.eth.coinbase);
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
