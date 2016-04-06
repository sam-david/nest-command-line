// Override delete key default, have to use 'keydown'
$(document).keydown(function(e) {
    if (e.which == 8) {
      e.preventDefault();
      deleteInputChar();
    } else if (e.which == 32) {
      e.preventDefault();
      addCharToInput(' ')
    }
});

// Use keypress to get the correcdt keyCode values
$(document).bind('keypress', function(e) {
  var keyCode = e.keyCode;
  var currentInputChar = String.fromCharCode(keyCode);

  // On 'Enter' key, process input
  if (keyCode == 13) {
    if (currentInputText == 'link nest') {
      window.location.href = '/auth'
    } else {
      $('#output').append('<div>Unknown command: ' + currentInputText + '</div>')
      $('#input').text('')
    }
  } else {
    addCharToInput(currentInputChar);
  }
});

// Page load, check if Oauth redirect and show successful connetion
$(document).ready(function() {
  if (currentToken == true) {
    $('#output').append("<div class='green'>LOGIN SUCCESS</div>")
  }
})

// Set interval for text caret
var showBorder = false;
setInterval(function(){
  flashBorder();
}, 400);

function flashBorder() {
  if (showBorder == false) {
    $('#input').css('border-right','solid white 1px')
    showBorder = true
  } else {
    $('#input').css('border-right','none')
    showBorder = false
  }
}

// Input adjusting functions
function addCharToInput(char) {
  var currentInputText = $('#input').text();
  $('#input').text(currentInputText + char);
  console.log($('#input').text())
}

function deleteInputChar() {
  var currentInputText = $('#input').text();
  $('#input').text(currentInputText.slice(0, -1))
}


