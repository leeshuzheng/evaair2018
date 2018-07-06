// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import './jquery-1.7.2.min';
import './jquery-ui.min';
import './jquery.ui.touch-punch.min'; // for touch and drag
import Webcam from './webcam';
import html2canvas from 'html2canvas';
import tippy from 'tippy.js';

import Keyboard from '../_modules/atoms/keyboard/keyboard';
import Sticker from '../_modules/atoms/sticker/sticker';

$(() => {
  // change to false when deploying to production
  window.production = true;

  let mywebcam = {},
    start = $('#start'),
    select = $('#select'),
    currentcity = '',
    allpages = $('.page'),
    count,
    loader = $('.loader'),
    selectcity = $('a', select),
    snap = $('.snap'),
    takepicturecontainer = $('.takepicturecontainer'),
    timer,
    countdown = $('.countdown'),
    audio = $('audio'),
    stickers = $('.sticker'),
    addstickerpage = $('#addsticker'),
    holdscreenshot = $('.holdscreenshot'),
    retake = $('.retake', addstickerpage),
    confirm = $('.confirm', addstickerpage),
    enteremailpage = $('#enterEmail'),
    modal = $('.modal', addstickerpage),
    submitbtn = $('.submit', modal),
    close = $('.close', modal),
    thanks = $('#thanks'),
    startagain = $('.btn', thanks),
    emailInput = document.querySelector('#write');

  mywebcam.width = 470; // to match $screenshotwidth
  mywebcam.height = mywebcam.width * 1.778;

  Webcam.set({
    image_format: 'jpeg',
    dest_width: mywebcam.width,
    dest_height: mywebcam.height
  });


  new Keyboard();
  new Sticker();

  setcount();

  start.on('click touchstart', function() {
    start.removeClass('show');
    select.addClass('show');
  });

  selectcity.on('click touchstart', function() {
    // hide select page
    select.removeClass('show');

    // get name of city
    let city = $(this).data('select');

    // store name of city in global variable
    currentcity = city;

    // show city with camera
    let citytoshow = $(`#${city}`);

    takepicturecontainer.addClass('show');
    citytoshow.addClass('show');

    // show containers then attach camera

    Webcam.attach('#camera');

    timer = setInterval(function() {
      handleTimer(count);
    }, 1000);
  });


  confirm.on('click touchstart', function() {
    modal.addClass('is-active');
  });

  retake.on('click touchstart', function() {
    addstickerpage.removeClass('show');
    takepicturecontainer.addClass('show');

    // restart countdown
    let webcamimg = '<div id="webcamimg"></div>';
    holdscreenshot.html(webcamimg);
    setcount();

    timer = setInterval(function() {
      handleTimer(count);
    }, 1000);
  });

  // init tippy
  tippy(emailInput, {
    arrow: true,
    trigger: 'manual'
  });

  close.on('click touchstart', function() {
    modal.removeClass('is-active');
  });

  $('.modal-background').on('click touchstart', function() {
    $('.modal').removeClass('is-active');
  });

  submitbtn.on('click touchstart', function() {
    let emailValue = emailInput.value;

    if (isValidEmail(emailValue)) {

      html2canvas(document.querySelector('.holdscreenshot')).then(canvas => {
        let base64string = getBase64FromCanvas(canvas);

        console.log(`base64string is ${base64string}`);
      });

      showLoader();

      setTimeout(function() {
        addstickerpage.removeClass('show');
        thanks.addClass('show');
        hideLoader();
      }, 1800);

      // hide tippy
      emailInput._tippy.hide();

      // $.ajax({
      //   type: 'POST',
      //   // url: evaair2018.ajaxurl,
      //   data: {
      //     'action' : 'update_user_submissions',
      //   },
      //   success: function (data) {
      //     console.log(data);
      //   },
      //   error: function(e) {
      // console.log(e);
      //   }
      // });
    } else {
      // show tippy
      console.log('show tippy');
      emailInput._tippy.show();
    }
  });

  startagain.on('click touchstart', function() {
    reset();
  });

  // helper functions

  function showLoader() {
    loader.addClass('show');
  }

  function hideLoader() {
    loader.removeClass('show');
  }

  function isValidEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
  }

  function setcount() {
    if (window.production) {
      count = 3;
    } else {
      count = 5;
    }
  }

  function reset() {
    modal.removeClass('is-active');
    allpages.removeClass('show');
    start.addClass('show');
    setcount();
    holdscreenshot.html(webcamimg); // empty holdscreenshot and webcamimg divs
  }

  function take_snapshot() {
    Webcam.snap(function(data_uri) {
      document.getElementById('webcamimg').innerHTML = '<img src="'+data_uri+'"/>';
    });
  }

  function endCountdown() {

    // 1) take picture in webcam
    take_snapshot();

    // 2) get city-appropriate frame and append that to .holdscreenshot div
    let frame = new Image(),
    source = `../images/frames/frame_${currentcity}.png`;

    frame.src = source;
    // each frame image is given a src based on current city, and a class of frame for styling
    holdscreenshot.append(frame);

    // 3) play sound
    audio[0].play();

    showLoader();

    // 4) wait for 1.5 seconds then change
    setTimeout(function() {

      takepicturecontainer.removeClass('show');

      addstickerpage.addClass('show');

      stickers.removeClass('show');
      $(`.sticker-${currentcity}`).addClass('show');

      // 5) handle clicking and dragging stickers
      let stickerimage = $('.sticker').find('img');

      stickerimage.on('click touchstart', function() {
        let clone = $(this).clone();
        clone.addClass('dragme').css({
          'position': 'absolute'
        }).appendTo('.holdscreenshot');

        $('.dragme').draggable();
      });

      hideLoader();

    }, 1800);
  }

  function handleTimer() {
    if(count === 0) {
      clearInterval(timer);
      countdown.html('');
      endCountdown();
    } else {
      countdown.html(count);
      count--;
    }
  }

  function getBase64FromCanvas(canvas) {
    var base64 = canvas.toDataURL('image/png');
    return base64;
  }
});
