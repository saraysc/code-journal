// global data
var $photo = document.querySelector('.photoUrl');
var $first = document.querySelector('.first-image');

// update the picture
$photo.addEventListener('input', preview);
function preview(event) {
  $first.setAttribute('src', $photo.value);
}

var $submit = document.querySelector('form');
var $name = document.getElementById('title');
var $link = document.getElementById('photo');
var $text = document.getElementById('notes');

var $list = document.querySelector('[data-view="entries"] ul');
var $paragraph = document.querySelector('.text-center');

$submit.addEventListener('submit', event => {
  event.preventDefault();
  var obj = {
    title: $name.value,
    photo: $link.value,
    text: $text.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId += 1;
  data.entries.unshift(obj);
  $first.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submit.reset();
  $secondForm.className = 'second';
  $firstForm.className = 'first hidden';
  $list.prepend(entry(obj));

});

// hide the 'entries' page and show the 'new entry' page
var $newButton = document.querySelector('.new');
var $firstForm = document.querySelector('.first');
var $secondForm = document.querySelector('.second');
$newButton.addEventListener('click', onClick);
function onClick(event) {
  $secondForm.className = 'second hidden';
  $firstForm.className = 'first';
  data.view = 'entry-form';
}

// show the 'entries' page and hide the 'new entry' page
var $entries = document.querySelector('.entry-link');
$entries.addEventListener('click', onClick2);
function onClick2(event) {
  $secondForm.className = 'second';
  $firstForm.className = 'first hidden';
  data.view = 'entries';
}

function contentLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = entry(data.entries[i]);
    $list.append(renderedEntry);
  }
  return $list;
}

// create dom tree
function entry(object) {
  var item = document.createElement('li');
  var newContent = document.createElement('div');
  var imageList = document.createElement('img');
  var textContent = document.createElement('div');
  var titleList = document.createElement('h2');
  var textList = document.createElement('p');

  imageList.setAttribute('src', object.photo);
  titleList.textContent = object.title;
  imageList.className = 'image-list col-3';
  titleList.className = 'row';
  textList.textContent = object.text;
  textContent.append(titleList);
  textContent.append(textList);
  textContent.className = 'margin-text-entry col-2 col-2-second';
  newContent.prepend(textContent);
  newContent.prepend(imageList);
  newContent.className = 'row';
  item.prepend(newContent);
  item.className = 'entry';
  $paragraph.textContent = '';
  return item;
}
document.addEventListener('DOMContentLoaded', contentLoad);
