// https://ipfs.io/docs/api/
// https://github.com/ipfs/js-ipfs-api
// before ipfs daemon startup, Should ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'

App = {
  ipfsApi: {},

  init: function () {
    App.ipfsApi = window.IpfsApi('localhost', '5001')
    return App.bindEvents();
  },

  bindEvents: function () {
    $('#target').submit(App.handleSubmit);
    $('#result').html = "aaaa";
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
