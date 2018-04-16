// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
// before geth daemon startup, geth --dev --rpc --rpccorsdomain "*"'

App = {
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
    console.log(App.currentProvider);
    web3 = new Web3(App.web3Provider);
    console.log(web3.eth);
    return App.initContract();
  },

  initContract: function () {
    $.getJSON('Ipfs.json', function (aritifact) { 
      App.contract = TruffleContract(aritifact);
      App.contract.setProvider(App.web3Provider);
      App.contract.defaults({
        gas: 1000000
      })

      var instance;
      App.contract.deployed().then(function (data) {
        instance = data;
        return instance.getLength();
      }).then((res) => {
        for (var i = 0; i < res; i++) {
          infos = instance.getUploadFileInfo(i);
          App.insertTemplate(infos[0], infos[1]);
        } 
      }) 
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
      var instance;
      App.contract.deployed().then(function (instance) {
        instance.setUploadFileInfo(filename, hash);
      });
      console.log(url);
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
