$(document).unbind('keydown').bind('keydown', function (event) {
    if (event.keyCode === 8) {
      event.preventDefault();
      deleteInputChar();
    }
});

$(document).ready(function() {
  if (currentToken == true) {
    $('#output').append("<div class='green'>LOGIN SUCCESS</div>")
  } else {
    console.log('No token')
  }
})

$(document).bind('keypress', function(e) {
  var keyCode = e.keyCode;
  var currentInputText = $('#input').text();
  var currentInputChar = String.fromCharCode(keyCode);

  if (keyCode == 13) {
    if (currentInputText == 'link nest') {
      window.location.href = '/auth'
    } else {
      $('#output').append('<div>Unknown command: ' + currentInputText + '</div>')
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

function deleteInputChar() {
  var currentInputText = $('#input').text();
  $('#input').text(currentInputText.slice(0, -1))
}
