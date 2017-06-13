javascript: (function() {
  if (window.location.href.match("https://drive.google.com/.*/(view|edit).*")){
    var file_id = /.*\/([\w\d_-]+)\/(view|edit).*/.exec(window.location.href);
    var dd_url = "https://drive.google.com/uc?export=download&id=" + file_id[1];
    var obj = document.createElement("div");
    obj.innerHTML = "<span>" + dd_url + "</span>";
    document.body.appendChild(obj);
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNodeContents(obj);
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      alert("Direct download link copied!")
    } catch(err) {
      alert("Oops, unable to copy");
    }
    window.getSelection().removeAllRanges();
    document.body.removeChild(obj);
  } else {
    var input = document.querySelectorAll('input[aria-label*="Link to share this file."]');
    if (input !== undefined && input.length > 0){
      var url = input[0].value;
      var file_id = url.split("id=")[1];
      if (file_id.includes("&")){
        file_id = file_id.split("&")[0];
      }
      var dd_url = "https://drive.google.com/uc?export=download&id=" + file_id;
      input[0].value = dd_url;
      input[0].select();
      var range = document.createRange();
      var selection = window.getSelection();
      range.selectNodeContents(input[0]);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      setTimeout(function(){
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          alert("Direct download link copied!")
        } catch(err) {
          alert("Oops, unable to copy");
        }
      }, 1000);
    } else {
      alert("ERROR! Could not find link.");
    }
  }
})();
