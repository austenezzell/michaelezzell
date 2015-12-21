/* ====================================
   Onload functions
   ==================================== */

       var meApp = meApp || {};

       meApp.mailingList = function(){
          var $mailingListCTA = $('.mailing-list');
          $mailingListCTA.click(function(e){
            e.preventDefault();
            $('.subscribe').velocity({
              opacity: 1,
              top: 0
            },{
              duration: 400,
              display: 'block'
            });
          });

          $('.close-form').click(function(e){
            e.preventDefault();
            $('.subscribe').velocity({
              opacity: 0,
              top: 40
            },{
              duration: 400,
              display: 'none'
            });
          })
       };

       meApp.pdp = function(){
         $('.related-work').hover(function(){
           $('.cover').velocity('stop').velocity({
             opacity: .1
           },{
             duration: 1400,
             delay: 600
           });
         }, function(){
           $('.cover').velocity('stop').velocity({
             opacity: 1
           },{
             duration: 1400
           });
         });
       };
       meApp.footer = function(){
         $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
              $('.footer-logo').addClass('on');
            } else {
              $('.footer-logo').removeClass('on');
            }
         });
       };

       meApp.bodyClass = function() {
         var pageClassElement = $('.page');
         var pageClass = pageClassElement.data('page-class');
         $('body').attr('class', '');
         $('body').addClass(pageClass);
       };


       meApp.filter = function() {
         if($('body').hasClass('new-work-page') || $('body').hasClass('shop-page')){
           var $module = $('.module');
           var $filter = $('.filter a');
           var categorySelect = 'all';

           $('.filter .all').addClass('active');

           $filter.click(function(e){
             e.preventDefault();
             categorySelect = $(this).attr('class');
             $('.filter a').removeClass('active');
             $(this).addClass('active');

             if(categorySelect == 'all') {
               $('.module').parent().show();
             } else if(categorySelect == 'land') {
               $('.module.land').parent().show();
               $('.module.sea').parent().hide();
               $('.module.air').parent().hide();
               $('.module.table').parent().hide();
               $('.module.fantasy').parent().hide();
             } else if(categorySelect == 'sea') {
               $('.module.land').parent().hide();
               $('.module.sea').parent().show();
               $('.module.air').parent().hide();
               $('.module.table').parent().hide();
               $('.module.fantasy').parent().hide();
             } else if(categorySelect == 'air') {
               $('.module.land').parent().hide();
               $('.module.sea').parent().hide();
               $('.module.air').parent().show();
               $('.module.table').parent().hide();
               $('.module.fantasy').parent().hide();
             } else if(categorySelect == 'table') {
               $('.module.land').parent().hide();
               $('.module.sea').parent().hide();
               $('.module.air').parent().hide();
               $('.module.table').parent().show();
               $('.module.fantasy').parent().hide();
             } else if(categorySelect == 'fantasy') {
               $('.module.land').parent().hide();
               $('.module.sea').parent().hide();
               $('.module.air').parent().hide();
               $('.module.table').parent().hide();
               $('.module.fantasy').parent().show();
             }
           });


         }

       }

       meApp.header = function() {
         var $header = $('header');

         $header.hover(function(){
           $(this).addClass('hover');
         }, function(){
           $(this).removeClass('hover');
         });



         var lastScrollTop = 0;
         $(window).scroll(function(event){

           var scrollTop     = $(window).scrollTop();

           if(scrollTop > 250){
             var st = $(this).scrollTop();

             $header.addClass('up');
             $header.removeClass('down');

             if (st > lastScrollTop){
                 // downscroll code
                 $header.removeClass('fixed');
             } else {
                // upscroll code
                $header.addClass('fixed');
                $header.removeClass('up');
                $header.addClass('down');
             }
             lastScrollTop = st;
           } else {
             var st = $(this).scrollTop();
             if (st > lastScrollTop){
                 // downscroll

              } else {
                // upscroll

              }
           }


         });

       };

       meApp.mobileNav = function() {

         $mobileNavTrigger = $('.menu');
         $body = $('body');

         $('.mobile-close').click(function(e){
           $mobileNavTrigger.text('Menu');
           $body.removeClass('menu-active');
           $('.desktop-nav').velocity('stop').velocity({
             opacity: 0
           },{
             duration: 400,
             display: 'none'
           });
         });
         $mobileNavTrigger.click(function(e){
           e.preventDefault();
           $(this).text('Menu');
           if($body.hasClass('menu-active')){
             $body.removeClass('menu-active');
             $('.desktop-nav').velocity('stop').velocity({
               opacity: 0
             },{
               duration: 400,
               display: 'none'
             });
           } else {
             $(this).text('Close');
             $body.addClass('menu-active');
             $('.desktop-nav').velocity('stop').velocity({
               opacity: 1
             },{
               duration: 400,
               display: 'block'
             });
           }
         })
       }

       meApp.smoothState = function() {
         // SmoothState
         var $body = $('html, body');
         var targetElement;

         var options = {
             prefetch: true,
             prefetchOn: 'mouseover touchstart',
             cacheLength: 2,
             debug: true,
             blacklist: '.no-smoothState',
             onBefore: function(element) {
               targetElement = element;
             },
             onStart: {
               duration: 400, // Duration of our animation
               render: function($container) {
                 // Add your CSS animation reversing class
                 $container.addClass('is-exiting');
                 // Restart your animation
                 smoothState.restartCSSAnimations();
                 // aeApp.onload();
               }
             },
             onReady: {
               duration: 0,
               render: function($container, $newContent) {
                 // Remove your CSS animation reversing class
                 $container.removeClass('is-exiting');
                 // Inject the new content
                 $container.html($newContent);
                 meApp.onload();
               }
             }
           },
           smoothState = $('#main-container').smoothState(options).data('smoothState');
       };






       // Turn the given MailChimp form into an ajax version of it.
       // If resultElement is given, the subscribe result is set as html to
       // that element.
       function ajaxMailChimpForm($form, $resultElement) {
         // Hijack the submission. We'll submit the form manually.
         $form.submit(function(e) {
           e.preventDefault();
           if (!isValidEmail($form)) {
             var error = "A valid email address must be provided.";
             $resultElement.html(error);
           } else {
             $resultElement.css("color", "black");
             $resultElement.html("Subscribing...");
             submitSubscribeForm($form, $resultElement);
           }
         });
       }
       // Validate the email address in the form
       function isValidEmail($form) {
         // If email is empty, show error message.
         var email = $form.find("input[type='email']").val();
         var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

         if (regex.test(email)) {
           return true;
         } else {
           return false;
         }
       }
       // Submit the form with an ajax/jsonp request.
       // Based on http://stackoverflow.com/a/15120409/215821
       function submitSubscribeForm($form, $resultElement) {
         $.ajax({
           type: "GET",
           url: $form.attr("action"),
           data: $form.serialize(),
           cache: false,
           dataType: "jsonp",
           jsonp: "c", // trigger MailChimp to return a JSONP response
           contentType: "application/json; charset=utf-8",
           error: function(error) {
             // According to jquery docs, this is never called for cross-domain JSONP requests
           },
           success: function(data) {
             if (data.result != "success") {
               var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
               $resultElement.css("color", "red");
               if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                 message = "You're already subscribed. Thank you.";
                 $resultElement.css("color", "black");
               }
               $resultElement.html(message);
             } else {
               $resultElement.css("color", "black");

               $resultElement.html("Thank you!<br>You must confirm the subscription in your inbox.");
             }
           }
         });
       }





       // Define load object
       meApp.onload = function() {
         meApp.bodyClass();
         meApp.smoothState();
         meApp.mobileNav();
         meApp.filter();
         meApp.header();
         meApp.footer();
         meApp.pdp();
         meApp.mailingList();

        //  ajaxMailChimpForm($('.subscribe-form-1'), $('.subscribe-result-1'));
       };

       (function($, window, document) {
         meApp.onload();




       }(window.jQuery, window, document));
