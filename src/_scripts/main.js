// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
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
  title = $('.title', snap),
  stewards = $('.stewards', snap),
  building = $('.building', snap),
  plane = $('.plane', snap),
  takepicture = $('.takepicture', snap),
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

    // Webcam.attach('.camera');
    timer = setInterval(function() { handleTimer(count); }, 1000);
  });


  let stickers = $('.sticker'),
  addstickerpage = $('#addsticker');

  // takepicture.on('click touchstart', function() {
  //   snap.removeClass('show');
  //
  //   addstickerpage.addClass('show');
  //
  //   stickers.removeClass('show');
  //
  //   $(`.sticker-${currentcity}`).addClass('show');
  // });







  // testing only

  // let takescreenshot = $('#screenshot');
  //
  // takescreenshot.click(function() {
  //   html2canvas(document.querySelector("#start")).then(canvas => {
  //     let img = convertCanvasToImage(canvas);
  //     img.className = 'doggie2';
  //     document.body.appendChild(img);
  //   });
  // });
  //
  //


  //// helper functions

  function endCountdown() {
    // logic to finish the countdown here
    console.log('finish countdown');

    // hide container for snap countries
    takepicturecontainer.removeClass('show');
    // hide all countries
    snap.removeClass('container');

    addstickerpage.addClass('show');

    stickers.removeClass('show');

    $(`.sticker-${currentcity}`).addClass('show');

    // play audio
    audio[0].play();
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
    image.src = canvas.toDataURL("image/png");
    return image;
  }

});
