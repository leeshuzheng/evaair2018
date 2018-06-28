// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import Webcam from './webcam.min';

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
    takepicture = $('.takepicture', snap);

  selectcity.on('click touchstart', function() {

    // hide select page
    select.removeClass('show');

    // get name of city
    let city = $(this).data('select');

    // store name of city in global variable
    currentcity = city;

    // show city with camera
    let citytoshow = $(`#${city}`);
    citytoshow.addClass('show');

    // Webcam.attach('.camera');
  });

  // use currentcity value and let the div with class 'sticker-${currentcity}' show

  let stickers = $('.sticker'),
    addstickerpage = $('#addsticker');

  takepicture.on('click touchstart', function() {
    snap.removeClass('show');

    addstickerpage.addClass('show');

    stickers.removeClass('show');

    $(`.sticker-${currentcity}`).addClass('show');
  });

});
