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
      web3.setProvider((new Web3.providers.HttpProvider('http://localhost:8545')));
      web3.eth.defaultAccount = web3.eth.coinbase;
      var address = '0xcf2d4b8b29064dea8fd31d937fd6dbcec54b8dfe';

      App.contract = web3.eth.contract(aritifact.abi).at(address);
      console.log(App.contract.gasPrices);
      for (var i = 0; i < App.contract.getLength(); i++) {
        console.log(App.contract.getUploadFileInfo(i));
      } 
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
    App.ipfsApi.files.add(buf, (err, result) => {
      if(err) {
        console.error(err);
        return;
      }
      const hash = result[0].hash;
      const url = `https://ipfs.io/ipfs/${hash}`;
      console.log(`${filename}`, `${url}`);  
      console.log(App.contract);
      App.contract.setUploadFileInfo("takachiaaaaaaaaaaa123456789fuck", "akira12345678910111213134151617181920");
      $('#result').html(url);
    })
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
