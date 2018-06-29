// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import './jquery-1.7.2.min';
import './jquery-ui.min';
import './jquery.ui.touch-punch.min'; // for touch and drag
import Webcam from './webcam';
import html2canvas from 'html2canvas';

$(() => {

  let start = $('#start'),
  select = $('#select'),
  currentcity = '';

  start.on('click touchstart', function() {
    start.removeClass('show');
    select.addClass('show');
  });

  let selectcity = $('a', select),
  snap = $('.snap'),
  takepicturecontainer = $('.takepicturecontainer'),
  timer,
  countdown = $('#countdown'),
  count = 5,
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
    count = 5;

    timer = setInterval(function() {
      handleTimer(count);
    }, 1000);
  })

  // helper functions

  function take_snapshot() {
    Webcam.snap(function(data_uri) {
      document.getElementById('my_result').innerHTML = '<img src="'+data_uri+'"/>';
    });
  }

  function endCountdown() {

    // take snapshot
    html2canvas(document.querySelector('.takepicturecontainer')).then(canvas => {
      let img = convertCanvasToImage(canvas);
      img.className = 'picwithoutstickers';
      holdscreenshot[0].appendChild(img);
    });

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

  function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL('image/png');
    return image;
  }

});
