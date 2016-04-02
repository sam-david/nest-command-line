$(document).ready(function() {
  if (currentToken == true) {
    $('#output').append("<li class='green'>LOGIN SUCCESS</li>")
  } else {
    console.log('nothing')
  }
})

$(document).bind('keypress', function(e) {
  var keyCode = e.keyCode;
  var currentInputText = $('#input').text();
  var currentInputChar = String.fromCharCode(keyCode);
  console.log(keyCode,'You pressed', String.fromCharCode(keyCode));

  if (keyCode == 13) {
    if (currentInputText == 'link nest') {
      console.log('farting');
      window.location.href = '/auth'
    } else {
      console.log('unkown fart');
      $('#output').append('<li>Unknown command: ' + currentInputText + '</li>')
      $('#input').text('')
    }
  } else {
    $('#input').text(currentInputText + currentInputChar);
  }
});

var showBorder = false;

setInterval(function(){
  flashBorder();
}, 300);

function flashBorder() {
  if (showBorder == false) {
    $('#input').css('border-right','solid white 1px')
    showBorder = true
  } else {
    $('#input').css('border-right','none')
    showBorder = false
  }
}
