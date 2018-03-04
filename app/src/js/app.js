// https://ipfs.io/docs/api/
// https://github.com/ipfs/js-ipfs-api

App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpPrivider('http://localhost:9545');      
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      　var AdoptionArtifact = data;
      　App.contracts.Adoption = TruffleContract(AdoptionArtifact);
      　App.contracts.Adoption.setProvider(App.web3Provider);
      });
    return App.bindEvents();
  },

  bindEvents: function() {
    $('#target').submit(App.handleSubmit);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    let file = event.target[0].files;
    let reader = new window.FileReader();

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
