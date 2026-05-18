/*

  ___        _                 _           _   _    _      _       _____                               
 / _ \      (_)               | |         | | | |  | |    | |     /  __ \                              
/ /_\ \_ __  _ _ __ ___   __ _| |_ ___  __| | | |  | | ___| |__   | /  \/_   _ _ __ ___  ___  _ __ ___ 
|  _  | '_ \| | '_ ` _ \ / _` | __/ _ \/ _` | | |/\| |/ _ \ '_ \  | |   | | | | '__/ __|/ _ \| '__/ __|
| | | | | | | | | | | | | (_| | ||  __/ (_| | \  /\  /  __/ |_) | | \__/\ |_| | |  \__ \ (_) | |  \__ \
\_| |_/_| |_|_|_| |_| |_|\__,_|\__\___|\__,_|  \/  \/ \___|_.__/   \____/\__,_|_|  |___/\___/|_|  |___/ (full version)
                                                                                                       
                                 by @alienmelon (tetrageddon.com)
*/

//---------------PATHS & VARIABLES---------------//

//default path to the folder where the cursors are
//if you change where they are located, be sure to change this...
var str_pathToImageFolder = "/cursorImages/";
//
var int_cursorAnimationInterval; //animation interval id
var num_cursorAnimationFrame = 0; //the animation frame (counts through arrays)
var num_animationSpeed = 100; //interval speed

//---------------CALL THESE---------------//

//animateCursor = an animated cursor for the page's body
//call these for a custom animation set
//animateCursor(["image1.png", "image2.png"...])
//make sure to pass an array of images nested in the images/ folder
function animateCursor(arr_animation) {
  //restart first
  num_cursorAnimationFrame = 0;
  clearInterval(int_cursorAnimationInterval);
  //start animation...
  int_cursorAnimationInterval = setInterval(function () {
    animateCursorDefault(arr_animation, "body");
  }, num_animationSpeed);
}

//animateCursorForElement = an animated cursor for specific elements
//same as above but pass it a tag name as well as desired array of images
//see https://www.w3schools.com/tags/
function animateCursorForElement(arr_animation, str_tagName) {
  //restart first
  //use dynamic variables because tag names aren't predictable
  num_cursorAnimationFrame = 0;
  clearInterval(window["int_cursorAnimationInterval_" + str_tagName]);
  var arr = arr_animation;
  //make variable for each tag element (so frame numbers aren't shared or overwritten)
  window["num_cursorAnimationFrame_" + str_tagName] = 0;
  //start animation...
  window["int_cursorAnimationInterval_" + str_tagName] = setInterval(function () {
    animatedCursorForElement(arr, str_tagName, "num_cursorAnimationFrame_" + str_tagName);
  }, num_animationSpeed);
}

//call this to set a static (non moving) cursor
function staticCursor(str_image) {
  //clear incase the previous cursor was set to an animation...
  num_cursorAnimationFrame = 0;
  clearInterval(int_cursorAnimationInterval);
  //
  setCursor(str_image);
}

//call this to set a static cursor to a tag
function staticCursorForElement(str_image, str_tagName) {
  // //clear incase the previous cursor was set to an animation...
  // num_cursorAnimationFrame = 0;
  // clearInterval(window["int_cursorAnimationInterval_" + str_tagName]);
  // //
  // setCursorToTag(str_image, str_tagName);

  //next frame

  animateCursorForElement([str_image], str_tagName);
}

//---------------------------------------------//
//CURSOR PLAYHEAD//
//Functions to manage movement (do not call these)

//special cursor for elements (buttons and links)
//pass it the tag name of element and the desired animation array
function animatedCursorForElement(arr_animation, str_tagName, str_frameVar) {
  //next frame
  window[str_frameVar] += 1;
  //loop through current array
  if (window[str_frameVar] > arr_animation.length - 1) {
    window[str_frameVar] = 0;
  }
  //apply to all elements
  setCursorToTag(arr_animation[window[str_frameVar]], str_tagName);
}

function animateCursorDefault(arr_animation) {
  //next frame
  num_cursorAnimationFrame += 1;
  //loop through current array
  if (num_cursorAnimationFrame > arr_animation.length - 1) {
    num_cursorAnimationFrame = 0;
  }
  //set animation...
  setCursor(arr_animation[num_cursorAnimationFrame]);
  //
}

//set the cursor graphic
function setCursor(str_image) {
  document.documentElement.style.cursor = "url(" + str_pathToImageFolder + str_image + "), auto";
  //document.documentElement.style.cursor = 'url(' + str_pathToImageFolder + arr_animation[num_cursorAnimationFrame] + '), auto';
  //document.getElementsByTagName("body")[0].style.cursor = 'url(' + str_pathToImageFolder + arr_animation[num_cursorAnimationFrame] + '), auto';
}
//set the cursor graphic to a specific element
function setCursorToTag(str_image, str_tagName) {
  //apply to all elements
  var _element = document.getElementsByTagName(str_tagName);
  for (var i = 0; i < _element.length; ++i) {
    _element[i].style.cursor = "url(" + str_pathToImageFolder + str_image + "), auto";
  }
}

//---------------ANIMATED CURSORS (Call these for a specific classic cursor)---------------//

//call all of these for a classic cursor animation
//the first = an animated cursor for the page's body
//the second (_tag) = an animated cursor for individual elements like buttons or links

function hourgla2ani() {
  animateCursor(arr_hourgla2ani);
}
function hourgla2ani_tag(str_tag) {
  animateCursorForElement(arr_hourgla2ani, str_tag);
}
//
function appstar2ani() {
  animateCursor(arr_appstar2ani);
}
function appstar2ani_tag(str_tag) {
  animateCursorForElement(arr_appstar2ani, str_tag);
}
//
function hourgla3ani() {
  animateCursor(arr_hourgla3ani);
}
function hourgla3ani_tag(str_tag) {
  animateCursorForElement(arr_hourgla3ani, str_tag);
}
//
function appstar3ani() {
  animateCursor(arr_appstar3ani);
}
function appstar3ani_tag(str_tag) {
  animateCursorForElement(arr_appstar3ani, str_tag);
}
//
function metronomani() {
  animateCursor(arr_metronomani);
}
function metronomani_tag(str_tag) {
  animateCursorForElement(arr_metronomani, str_tag);
}
//
function pianoani() {
  animateCursor(arr_pianoani);
}
function pianoani_tag(str_tag) {
  animateCursorForElement(arr_pianoani, str_tag);
}
//
function drumani() {
  animateCursor(arr_drumani);
}
function drumani_tag(str_tag) {
  animateCursorForElement(arr_drumani, str_tag);
}
//
function dinosau2ani() {
  animateCursor(arr_dinosau2ani);
}
function dinosau2ani_tag(str_tag) {
  animateCursorForElement(arr_dinosau2ani, str_tag);
}
//
function bananaani() {
  animateCursor(arr_bananaani);
}
function bananaani_tag(str_tag) {
  animateCursorForElement(arr_bananaani, str_tag);
}
//
function dinosaurani() {
  animateCursor(arr_dinosaurani);
}
function dinosaurani_tag(str_tag) {
  animateCursorForElement(arr_dinosaurani, str_tag);
}
//
function handani() {
  animateCursor(arr_handani);
}
function handani_tag(str_tag) {
  animateCursorForElement(arr_handani, str_tag);
}
//
function handapstani() {
  animateCursor(arr_handapstani);
}
function handapstani_tag(str_tag) {
  animateCursorForElement(arr_handapstani, str_tag);
}
//
function handwaitani() {
  animateCursor(arr_handwaitani);
}
function handwaitani_tag(str_tag) {
  animateCursorForElement(arr_handwaitani, str_tag);
}
//
function handnwseani() {
  animateCursor(arr_handnwseani);
}
function handnwseani_tag(str_tag) {
  animateCursorForElement(arr_handnwseani, str_tag);
}
//
function handneswani() {
  animateCursor(arr_handneswani);
}
function handneswani_tag(str_tag) {
  animateCursorForElement(arr_handneswani, str_tag);
}
//
function handweani() {
  animateCursor(arr_handweani);
}
function handweani_tag(str_tag) {
  animateCursorForElement(arr_handweani, str_tag);
}
//
function handnoani() {
  animateCursor(arr_handnoani);
}
function handnoani_tag(str_tag) {
  animateCursorForElement(arr_handnoani, str_tag);
}
//
function handnsani() {
  animateCursor(arr_handnsani);
}
function handnsani_tag(str_tag) {
  animateCursorForElement(arr_handnsani, str_tag);
}
//
function barberani() {
  animateCursor(arr_barberani);
}
function barberani_tag(str_tag) {
  animateCursorForElement(arr_barberani, str_tag);
}
//
function coinani() {
  animateCursor(arr_coinani);
}
function coinani_tag(str_tag) {
  animateCursorForElement(arr_coinani, str_tag);
}
//
function horseani() {
  animateCursor(arr_horseani);
}
function horseani_tag(str_tag) {
  animateCursorForElement(arr_horseani, str_tag);
}
//
function counterani() {
  animateCursor(arr_counterani);
}
function counterani_tag(str_tag) {
  animateCursorForElement(arr_counterani, str_tag);
}
//
function sizeneswani() {
  animateCursor(arr_sizeneswani);
}
function sizeneswani_tag(str_tag) {
  animateCursorForElement(arr_sizeneswani, str_tag);
}
//
function sizenwseani() {
  animateCursor(arr_sizenwseani);
}
function sizenwseani_tag(str_tag) {
  animateCursorForElement(arr_sizenwseani, str_tag);
}
//
function sizeweani() {
  animateCursor(arr_sizeweani);
}
function sizeweani_tag(str_tag) {
  animateCursorForElement(arr_sizeweani, str_tag);
}
//
function fillitupani() {
  animateCursor(arr_fillitupani);
}
function fillitupani_tag(str_tag) {
  animateCursorForElement(arr_fillitupani, str_tag);
}
//
function wagtailani() {
  animateCursor(arr_wagtailani);
}
function wagtailani_tag(str_tag) {
  animateCursorForElement(arr_wagtailani, str_tag);
}
//
function raindropani() {
  animateCursor(arr_raindropani);
}
function raindropani_tag(str_tag) {
  animateCursorForElement(arr_raindropani, str_tag);
}
//
function hourglasani() {
  animateCursor(arr_hourglasani);
}
function hourglasani_tag(str_tag) {
  animateCursorForElement(arr_hourglasani, str_tag);
}
//
function appstartani() {
  animateCursor(arr_appstartani);
}
function appstartani_tag(str_tag) {
  animateCursorForElement(arr_appstartani, str_tag);
}
//
function sizensani() {
  animateCursor(arr_sizensani);
}
function sizensani_tag(str_tag) {
  animateCursorForElement(arr_sizensani, str_tag);
}

//---------------NON-ANIMATED CURSORS---------------//

function _winxpnormal() {
  staticCursor("XPcursors/WindowsDefault/NormalSelect.png");
}
function _winxpnormal_tag(str_tag) {
  staticCursorForElement("XPcursors/WindowsDefault/NormalSelect.png", str_tag);
}
function _winxphand() {
  staticCursor("XPcursors/WindowsDefault/LinkSelect.png");
}
function _winxphand_tag(str_tag) {
  staticCursorForElement("XPcursors/WindowsDefault/LinkSelect.png", str_tag);
}

//---------------ON PAGE LOAD, CUSTOMIZE THIS...---------------//

//customize this with your desired functions
//this starts the cursor when the page loads...
//if you want to have the cursor start another way, then comment this out
window.addEventListener("load", function () {
  _winxpnormal();
  _winxphand_tag("button");
  _winxphand_tag("li");
  _winxphand_tag("a");
});
