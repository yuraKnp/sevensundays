
jQuery(function ($) {
  "use strict";

    document.addEventListener('DOMContentLoaded', function() {
        const formContainer = document.querySelector('.contact-form-section');

        console.log(formContainer);

        console.log(formContainer.dataset.formStatus);
        
        if (formContainer && formContainer.dataset.formStatus === 'success') {
        _functions.openPopup('.popup-content[data-rel="1"]');

        
        
        if (window.history.replaceState) {
            const cleanUrl = window.location.href.split('?')[0];
            window.history.replaceState({path: cleanUrl}, '', cleanUrl);
        }
        }
    });

      // Table Of Content Component
  // ==========================

  var headings = $(".article__body h2, .article__body h3");
  var tocContainer = $(".toc__wrapper");
  var toc = $(".toc");

  if (toc) {
    // create an id for headings

    headings.each(function () {
      var string = $(this)
        .text()
        .replace(/[^\w\s]|_/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();
      $(this).attr("id", string);
    });

    // generate toc

    String.prototype.repeat = function (num) {
      if (!num) return;
      return new Array(num + 1).join(this);
    };

    var ToC = '<p class="toc__title">Inhaltsverzeichnis</p>' + '<nav role="navigation">' + '<ul class="toc__menu">';

    var newLine, element, title, link, level, baseLevel;

    headings.each(function () {
      element = $(this);
      title = element.text();
      link = "#" + element.attr("id");

      var prevLevel = level || 0;
      level = this.nodeName.substr(1);
      if (!baseLevel) {
        baseLevel = level;
      }

      if (prevLevel == 0) {
        newLine = "<li>";
      } else if (level == prevLevel) {
        newLine = "</li><li>";
      } else if (level > prevLevel) {
        newLine = '<ul class="toc__submenu"><li>'.repeat(level - prevLevel);
      } else if (level < prevLevel) {
        newLine = "</li></ul>".repeat(prevLevel - level) + "</li><li>";
      }

      newLine += '<a class="toc__link" href="' + link + '">' + title + "</a>";

      ToC += newLine;
    });

    ToC += "</li></ul>".repeat(level - baseLevel) + "</li>" + "</ul>" + "</nav>";

    var renderToc = function () {
      tocContainer.prepend(ToC);
    };
  }

  var addMarginToptoShareIcons = function () {
    var shareBlock = document.querySelector("[share]");
    var toc = document.querySelector(".toc__wrapper");

    if (shareBlock && window.matchMedia("(min-width: 992px)").matches) {
      shareBlock.style.marginTop = toc.offsetHeight + 128 + "px";
    }
  };
  

});

