//*==============
//*  Inputs     =
//*==============
//*  Select     =
//*==============
//*  Calendar   =
//*==============

jQuery(function ($) {
  "use strict";
  $(document).on("click", "[disabled], .disabled", function (e) {
    e.preventDefault();
  });

  //*==============
  //*  Inputs     =
  //*==============
  $(document).on('focus', '.input-field .input, .input-button-wrap .input', function () {
    $(this).closest('.input-field').addClass('focus');
  });
  $(document).on('blur', '.input-field .input, .input-button-wrap .input', function () {
    $(this).closest('.input-field').removeClass('focus');
  });
  $(document).on('keyup', '.input-field .input', function () {
    if ($(this).val()) $(this).closest('.input-field').addClass('value');
    else $(this).closest('.input-field').removeClass('value');
  });


  // Invalid Input
  $(document).on('blur', '.input-field .input[required]', function () {
    if ($(this).val().trim()) {
      $(this).closest('.input-field').removeClass('invalid');
    } else {
      $(this).closest('.input-field').addClass('invalid');
    }
  });


  // Check if input has value or autofill
  $(document).ready(function () {
    $('.input-field .input').each(function () {
      let th = $(this);
      if (th.val()) {
        th.closest('.input-field').addClass('value');
      }
    });

    $('.input-field .input:-webkit-autofill').each(function () {
      let th = $(this);

      th.closest('.input-field').addClass('value');
    });
  });


  // Validate email
  _functions.validateEmail = function (email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  $(document).on('keyup', 'input[type="email"]', function () {
    const email = $(this);

    if (!_functions.validateEmail(email.val())) {
      email.closest('.input-field').addClass('invalid-email');
    } else {
      email.closest('.input-field').removeClass('invalid-email');
    }

    if (email.val() == '') {
      email.closest('.input-field').removeClass('invalid-email');
    }
  });


  // Password Hide/Show
  $(document).on('click', '.password-control', function () {
    let thisInput = $(this).siblings('.input');

    if (thisInput.attr('type') == 'password') {
      $(this).addClass('view');
      thisInput.attr('type', 'text');
    } else {
      $(this).removeClass('view');
      thisInput.attr('type', 'password');
    }
    return false;
  });

});