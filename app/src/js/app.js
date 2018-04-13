// https://ipfs.io/docs/api/
// https://github.com/ipfs/js-ipfs-api
// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
// before geth daemon startup, geth --dev --rpc --rpccorsdomain "*"'

App = {
  ipfsApi: {},
  web3: {},
  contract: {},

  init: function () {
    App.ipfsApi = window.IpfsApi('localhost', '5001');
    var web3 = new Web3();
    $.getJSON('Ipfs.json', function (aritifact) { 
      // App.contracts = new TruffleContract(aritifact);
      web3.setProvider((new Web3.providers.HttpProvider('http://localhost:8545')));
      // App.contracts.deployed().then((test) => {console.log(test)});
      // console.log(App.contracts.deployed().then((aaa) => { console.log(aaa) }));
      var address = '0xd3038be72f853c33e6a847f96dfa1947fd2672f9';
      App.contract = web3.eth.contract(aritifact.abi).at(address);
      web3.eth.defaultAccount = web3.eth.accounts[0];
      console.log(App.contract.getUploadFileInfos(0));
    });
    return App.bindEvents();
  },

  bindEvents: function () {
    $('#target').submit(App.handleSubmit);
    $('#result').html = "";
  },

  handleSubmit: function (event) {
    event.preventDefault();
    const file = event.target[0].files[0];
    const reader = new window.FileReader();
    reader.onloadend = () => App.saveIpfs(reader, file.name);
    reader.readAsArrayBuffer(file);
  },

  saveIpfs: function (reader, filename) {
    const buf = buffer.Buffer(reader.result)
    App.ipfsApi.files.add(buf, (err, result) => { // Upload buffer to IPFS
      if(err) {
        console.error(err)
        return
      }
      const url = `https://ipfs.io/ipfs/${result[0].hash}`;
      $('#result').html(url);
      App.contract.setUploadFileInfo(filename, url);
    })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
