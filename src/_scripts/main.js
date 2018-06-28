// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import './jquery-1.7.2.min';
import './jquery-ui.min';
import './jquery.ui.touch-punch.min'; // for touch and drag
import Webcam from './webcam.min';
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

    // Webcam.attach('.camera');
    timer = setInterval(function() {
      handleTimer(count);
    }, 1000);

    takepicturecontainer.addClass('show');
    citytoshow.addClass('show');
  });

  let stickerimage = $('.sticker').find('img');

  stickerimage.on('click touchstart', function() {
    let clone = $(this).clone();
    clone.addClass('dragme').css({
      'position': 'absolute'
      // 'top': '50%',
      // 'left': '50%',
      // 'transform': 'translate(-50%,-50%)'
    }).appendTo('.holdscreenshot');

    $('.dragme').draggable();
  });


  let stickers = $('.sticker'),
    addstickerpage = $('#addsticker'),
    holdscreenshot = $('.holdscreenshot'); // holder to score screenshot

  // helper functions

  function endCountdown() {

    // take snapshot
    html2canvas(document.querySelector('.takepicturecontainer')).then(canvas => {
      let img = convertCanvasToImage(canvas);
      img.className = 'picwithoutstickers';
      holdscreenshot[0].appendChild(img);
    });

    // play sound
    audio[0].play();


    // wait for 1.5 seconds then change
    setTimeout(function() {
      // 1) hide container for snap countries
      takepicturecontainer.removeClass('show');
      // 2) hide all countries
      snap.removeClass('show');

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
