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
    var web3 = new Web3();
    $.getJSON('Ipfs.json', function (aritifact) { 
      // App.contracts = new TruffleContract(aritifact);
      web3.setProvider((new Web3.providers.HttpProvider('http://localhost:8545')));
      // App.contracts.deployed().then((test) => {console.log(test)});
      // console.log(App.contracts.deployed().then((aaa) => { console.log(aaa) }));
      var address = '0xf2383e20cfdb937b18dd4d2f7c64e1860729cce2';
      
      var c = web3.eth.contract(aritifact.abi).at(address);
      web3.eth.defaultAccount = web3.eth.accounts[0];
      console.log(c);
      c.set("fuckyou");
      console.log(c.get());
      // c.set("fuck");
      // console.log(c.get());
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
