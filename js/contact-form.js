//Validade Name
function validateName() {
  var name = document.getElementById('contact-name').value;

  if(name.length < 3) {
      toastr.info('Name is required', 'name-error' , 'red');
    return false;

  }

  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {

    toastr.info('First and last name, please.','name-error', 'red');
    return false;

  }

  toastr.info('Valid', 'name-error', 'green');
  return true;

}
//Validate Email
function validateEmail () {

  var email = document.getElementById('contact-email').value;

  if(email.length == 0) {

    toastr.info('Email Invalid','email-error', 'red');
    return false;

  }

  if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {

    toastr.info('Email Invalid', 'email-error', 'red');
    return false;

  }

  toastr.info('Valid', 'email-error', 'green');
  return true;

}

//Validate Message
function validateMessage() {
  var message = document.getElementById('contact-message').value;
  var required = 30;
  var left = required - message.length;

  if (left > 0) {
    toastr.info(left + ' more characters required','message-error','red');
    return false;
  }

  toastr.info('Valid', 'message-error', 'green');
  return true;

}
document.getElementById("contact-submit").addEventListener("click", validateForm);

function validateForm() {
  if (!validateName() || !validateEmail() || !validateMessage()) {
    toastr.info('Please fix errors to submit.', 'submit-error', 'red');
    setTimeout(function(){jsHide('submit-error');}, 2000);
  }
  else {

  }
}
$(document).ready(function() {
function saveData(){
 var storName = $("#contact-name").val();
 var storEmail = $("#contact-email").val();
 var storMessage = $("#contact-message").val();

 let itemsObject = {

   'name': storName,
    'email': storEmail,
    'message': storMessage
  };


 localStorage.setItem(currentDay, JSON.stringify(itemsObject));
 const data = JSON.parse(localStorage.getItem(currentDay));
}

$("#contact-name,#contact-email,#contact-message").on('change keypress paste focus textInput input',saveData);


});
