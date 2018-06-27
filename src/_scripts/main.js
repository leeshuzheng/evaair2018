// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
// import Frame from '../_modules/atoms/frame/frame';
// import Camera from '../_modules/molecules/camera/camera';
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
    frame = $('.frame'),
    header = $('.header', frame),
    stewards = $('.stewards', frame),
    foreground = $('.foreground', frame),
    plane = $('.plane', frame),
    takepicture = $('.takepicture', frame);

  selectcity.on('click touchstart', function() {

    // hide select page
    select.removeClass('show');
    // show frame
    frame.addClass('show');

    let city = $(this).data('select');
    currentcity = city;

    header.addClass(`header-${city}`);
    stewards.addClass(`stewards-${city}`);
    foreground.addClass(`foreground-${city}`);
    plane.addClass(`plane-${city}`);

    Webcam.attach('#camera');
  });

  // use currentcity value and let the div with class 'sticker-${currentcity}' show

  let stickers = $('.sticker'),
    addstickerpage = $('#addsticker');

  takepicture.on('click touchstart', function() {
    frame.removeClass('show');



    addstickerpage.addClass('show');

    stickers.removeClass('show');

    $(`.sticker-${currentcity}`).addClass('show');
  });

});
