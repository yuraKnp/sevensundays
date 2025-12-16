
jQuery(function ($) {
  "use strict";

    $(document).ready( function() {

        const formContainer = $('.contact-form-section');

        if (formContainer && formContainer.attr('data-form-status') === 'success') {
        _functions.openPopup('.popup-content[data-rel="1"]');

        
        
            if (window.history.replaceState) {
                const cleanUrl = window.location.href.split('?')[0];
                window.history.replaceState({path: cleanUrl}, '', cleanUrl);
            }
        }

    });

    // document.addEventListener('DOMContentLoaded', function() {
    //     const formContainer = document.querySelector('.contact-form-section');

    //     console.log(formContainer);

    //     console.log(formContainer.dataset.formStatus);
        
    //     if (formContainer && formContainer.dataset.formStatus === 'success') {
    //     _functions.openPopup('.popup-content[data-rel="1"]');

        
        
    //     if (window.history.replaceState) {
    //         const cleanUrl = window.location.href.split('?')[0];
    //         window.history.replaceState({path: cleanUrl}, '', cleanUrl);
    //     }
    //     }
    // });
  

});

