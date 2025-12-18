
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

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
        var id = entry.target.getAttribute("id");
        var tocItem = document.querySelector('.toc__menu li a[href="#' + id + '"]');
        var submenu = document.querySelector('.toc__menu li a[href="#' + id + '"]').parentElement.parentElement;
        var tocItemParent = tocItem.parentNode;

        if (entry.intersectionRatio > 0) {
            tocItem.classList.add("is--active");
            tocItemParent.classList.add("is--active");
            if (submenu.classList.contains("toc__submenu")) {
            submenu.classList.add("is--visible");
            }
        } else {
            tocItem.classList.remove("is--active");
            tocItemParent.classList.remove("is--active");
            if (submenu.classList.contains("toc__submenu")) {
            submenu.classList.remove("is--visible");
            }
        }
        });
    });

    var toggleToc = function (event) {
        /**
         *  Hide/show Toc on click.
         */

        var toc = document.querySelector(".toc");
        var tocmenu = document.querySelector(".toc__wrapper");

        var toggleContainer = event.target.closest(".toc__toggle");
        if (!toggleContainer) return;

        event.preventDefault();

        toggleContainer.classList.toggle("is--opened");
        tocmenu.classList.toggle("is--opened");
        toc.classList.toggle("bottom-0");
    };

    var closeToc = function (event) {
        /**
         *  Hide/show Toc on click.
         */

        var toc = document.querySelector(".toc");
        var tocmenu = document.querySelector(".toc__wrapper");
        var toggle = document.querySelector(".toc__toggle");

        var tocItem = event.target.closest(".toc__link");
        if (!tocItem) return;

        event.preventDefault();

        if (window.matchMedia("(max-width: 992px)").matches) {
        toggle.classList.remove("is--opened");
        tocmenu.classList.remove("is--opened");
        toc.classList.remove("bottom-0");
        }
    };

    // fire the following functions when Toc is rendered

    $.when(renderToc()).then(function () {
        // set aside social icons margin-top
        addMarginToptoShareIcons();
        window.addEventListener("resize", addMarginToptoShareIcons);
        window.addEventListener("scroll", addMarginToptoShareIcons);

        // hide/show toc on click
        document.addEventListener("click", toggleToc, false);
        document.addEventListener("click", closeToc, false);

        // Track all headings that have an 'id' applied
        document.querySelectorAll(".article__body h2, .article__body h3").forEach(function (heading) {
        observer.observe(heading);
        });
    });
  

});

