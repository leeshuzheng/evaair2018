// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import './jquery-1.7.2.min';
import './jquery-ui.min';
import './jquery.ui.touch-punch.min'; // for touch and drag
import Webcam from './webcam';
import html2canvas from 'html2canvas';
import Keyboard from '../_modules/atoms/keyboard/keyboard';

// take snapshot

$(() => {

  // change to false when deploying to production
  window.production = true;

  Webcam.set({
    image_format: 'jpeg'
  });

  new Keyboard();

  let start = $('#start'),
  select = $('#select'),
  currentcity = '',
  allpages = $('.page'),
  count;

  setcount();

  start.on('click touchstart', function() {
    start.removeClass('show');
    select.addClass('show');
  });

  let selectcity = $('a', select),
  snap = $('.snap'),
  takepicturecontainer = $('.takepicturecontainer'),
  timer,
  countdown = $('#countdown'),
  audio = $('audio');


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

  let stickerimage = $('.sticker').find('img');

  stickerimage.on('click touchstart', function() {
    let clone = $(this).clone();
    clone.addClass('dragme').css({
      'position': 'absolute'
    }).appendTo('.holdscreenshot');

    $('.dragme').draggable();
  });


  let stickers = $('.sticker'),
  addstickerpage = $('#addsticker'),
  holdscreenshot = $('.holdscreenshot'); // holder to score screenshot

  let retake = $('.retake', addstickerpage),
  confirm = $('.confirm', addstickerpage),
  enteremailpage = $('#enterEmail'),
  modal = $('.modal', addstickerpage);

  confirm.on('click touchstart', function() {
    // take screenshot of holdscreenshot div and append it to document body, visibility: hidden
    // show modal with keyboard (DONE)
    modal.addClass('is-active');
  })

  retake.on('click touchstart', function() {
    addstickerpage.removeClass('show');
    takepicturecontainer.addClass('show');

    // restart countdown from 5 seconds
    holdscreenshot.html('');
    setcount();

    timer = setInterval(function() {
      handleTimer(count);
    }, 1000);
  })

  let submitbtn = $('button', modal),
  close = $('.close', modal),
  thanks = $('#thanks'),
  startagain = $('button', thanks);

  close.on('click touchstart', function() {
    modal.removeClass('is-active');
  });

  $('.modal-background').on('click touchstart', function() {
    $('.modal').removeClass('is-active');
  });

  submitbtn.on('click touchstart', function() {
    let email = $('input', modal).val();

    // $.ajax({
    //   type: 'POST',
    //   dataType: 'text',
    //   // url: evaair2018.ajaxurl,
    //   data: {
    //     'action' : 'update_count',
    //     'label': eventName,
    //     'frame': currentFrame,
    //     'panel': currentPanel,
    //     'add_option' : value
    //   },
    //   success: function (data) {
    //     console.log(data);
    //   },
    //   error: function(e) {
    //   }
    // });

    addstickerpage.removeClass('show');
    thanks.addClass('show');
  });

  startagain.on('click touchstart', function() {
    reset();
  });

  // helper functions

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
  }

  function take_snapshot() {
    Webcam.snap(function(data_uri) {

      document.getElementById('webcamimg').innerHTML = '<img src="'+data_uri+'"/>';

    });

    html2canvas(document.querySelector('.takepicturecontainer')).then(canvas => {
      let img = convertCanvasToImage(canvas);
      img.className = 'heeey';
      holdscreenshot[0].appendChild(img);
    });
  }

  function endCountdown() {
    take_snapshot();

    // play sound
    audio[0].play();

    // wait for 1.5 seconds then change
    setTimeout(function() {
      // 1) hide container for snap countries
      takepicturecontainer.removeClass('show');

      addstickerpage.addClass('show');

      stickers.removeClass('show');

      $(`.sticker-${currentcity}`).addClass('show');

      let frame = $('.snap.show').clone();
      holdscreenshot.append(frame);
    }, 1500);
  }

  function handleTimer() {
    if(count === 0) {
      clearInterval(timer);
      endCountdown();
    } else {
      console.log(`count is ${count}`);
      countdown.html(count);
      count--;
    }
  }

  function base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
  }

  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL('image/png');



    // var base64ImageContent = base64.replace(/^data:image\/(png|jpg);base64,/, "");

    // var blob = base64ToBlob(base64ImageContent, 'image/png');

    // image.src = blob;

    return image;
  }
});
