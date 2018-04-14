// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
// before geth daemon startup, geth --dev --rpc --rpccorsdomain "*"'

App = {
  ipfs: {},
  contract: {},

  init: function () {
    App.initIpfs();
    App.initContract('0x83a4bd51282b57c1418fb1641c451403df6aac78');
    return App.bindEvents();
  },

  initIpfs: function() {
    App.ipfs = window.IpfsApi('localhost', '5001');    
  },

  initContract: function (address) {
    var web3 = new Web3();
    $.getJSON('Ipfs.json', function (aritifact) { 
      web3.setProvider((new Web3.providers.HttpProvider('http://localhost:8545')));
      web3.eth.defaultAccount = web3.eth.coinbase;
      App.contract = web3.eth.contract(aritifact.abi).at(address);
      for (var i = 0; i < App.contract.getLength(); i++) {
        console.log(App.contract.getUploadFileInfo(i));
      } 
    });
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
    App.ipfs.files.add(buf, (err, result) => {
      if(err) {
        console.error(err);
        return;
      }
      const hash = result[0].hash;
      const url = `https://ipfs.io/ipfs/${hash}`;
      App.contract.setUploadFileInfo(filename, hash, { gas: 6000000, from: web3.eth.accounts[0] });
      $('#result').html(url);
    })
  },

  insertTemplate: function () {
    var body = '';
    for(var i = 0; i < 10; i++){
      body += '<tr>';
      body += `<td>${i}</td>`    
      body += `<td>${i}</td>`    
      body += '</tr>'
    }
    $('tbody').prepend(body);
  }
};

$(function () {
  $(window).load(function () {
    App.init();
    App.insertTemplate();
  });
});
