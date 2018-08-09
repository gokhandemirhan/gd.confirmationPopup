(function ($) {
    'use strict';
    var isOpen = false;

    $.fn.confirmationPopover = function (options) {
        var button = this;

        // Extend our default options with those provided.
        // Note that the first argument to extend is an empty
        // object – this is to keep from overriding our "defaults" object.
        var opts = $.extend({}, $.fn.confirmationPopover.defaults, options);

        var box = '<span class="confirmationBox"><p>' + opts.text + '</p><span id="cancel" class="' + opts.noButtonClass + '">' + opts.noButtonText + '</span><span id="confirm" class="' + opts.yesButtonClass + '">' + opts.yesButtonText + '</span></span>';
        this.append(box);

        var confirmationBox = this.find('.confirmationBox');
        confirmationBox.find('#cancel').on('click', opts.noButtonClicked);
        confirmationBox.find('#confirm').on('click', opts.yesButtonClicked);

        this.addClass('confirmationContainer');
        this.data('confirmationpopover', button);
        return button;

    };

    // Plugin defaults – added as a property on our plugin function.
    $.fn.confirmationPopover.defaults = {
        text: "Are you sure you want to delete?",
        yesButtonText: "Yes",
        noButtonText: "No",
        yesButtonClass: "",
        noButtonClass: "",
        yesButtonClicked: function () {
            console.log('yes');
        },
        noButtonClicked: function () {
            console.log('no');
        }
    };

    $.fn.showPopover = function () {

        $(this).addClass('selected');
        isOpen = true;

        var nh = $(this).find('.confirmationBox').height() + 10;
        $(this).find('.confirmationBox').css({
            top: "-" + nh + "px"
        });
    };

    $.fn.hidePopover = function () {
        $(this).removeClass('selected');
        isOpen = false;
        $(this).find('.confirmationBox').css({top: "-90px"});
    };

    $.fn.isOpen = function () {
        return isOpen;
    };

    $.fn.destroy = function () {

        this.find('.confirmationBox #cancel').off('click');
        this.find('.confirmationBox #confirm').off('click');
        this.find('.confirmationBox').remove();
        this.removeData('confirmationpopover');
    };


}(jQuery));
