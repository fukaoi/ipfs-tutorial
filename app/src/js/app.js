// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
// before geth daemon startup, geth --dev --rpc --rpccorsdomain "*"'

App = {
  ipfs: {},
  contract: {},
  web3Provider: null,

  init: function () {
    App.initIpfs();
    return App.initWeb3();
  },

  initIpfs: function() {
    App.ipfs = window.IpfsApi('localhost', '5001');    
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpPrivider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract('0x88d17704407baf64f5f568d07f179d231de00732');
  },

  initContract: function (address) {
    var web3 = new Web3();
    $.getJSON('Ipfs.json', function (aritifact) { 
      // web3.eth.defaultAccount = web3.eth.coinbase;
      App.contract.Ipfs = TruffleContract(aritifact);
      App.contract.Ipfs.setProvider(App.web3Provider);


      var instance;

      App.contract.Ipfs.deployed().then(function (instance) {
        console.log(instance);
        adoptionInstance = instance;
        return null;
        // return adoptionInstance.getLength.call();
      }).then(function(adopters) {
        console.log(adopters);
      }).catch(function(err) {
        console.error(err);
      });
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $('#target').submit(App.handleSubmit);
    // for (var i = 0; i < App.contract.getLength(); i++) {
    //   infos = App.contract.getUploadFileInfo(i);
    //   App.insertTemplate(infos[0], infos[1]);
    // } 
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
      console.log(web3.eth.defaultAccount);
      App.contract.setUploadFileInfo(filename, hash);
      $('#result').html(url);
    })
  },

  insertTemplate: function (name, hash) {
    var body = '';
    body += '<tr>';
    body += `<td>${name}</td>`    
    body += `<td>https://ipfs.io/ipfs/${hash}</td>`    
    body += '</tr>'
    $('tbody').prepend(body);
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
