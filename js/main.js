// global data
var $photo = document.querySelector('.photoUrl');
var $first = document.querySelector('.first-image');

$photo.addEventListener('input', preview);

function preview(event) {
  $first.setAttribute('src', $photo.value);
}

var $submit = document.querySelector('form');
var $name = document.getElementById('title');
var $link = document.getElementById('photo');
var $text = document.getElementById('notes');

var $list = document.querySelector('ul');
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
  $paragraph.textContent = '';
  entry(obj);
});

var $newButton = document.querySelector('.new');
var $firstForm = document.querySelector('.first');
var $secondForm = document.querySelector('.second');
$newButton.addEventListener('click', onClick);
function onClick(event) {
  $secondForm.className = 'second hidden';
  $firstForm.className = 'first';
}

var $entries = document.querySelector('.entry-link');
$entries.addEventListener('click', onClick2);
function onClick2(event) {
  $secondForm.className = 'second';
  $firstForm.className = 'first hidden';
}

function contentLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = entry(data.entries[i]);
    $list.append(renderedEntry);
  }

}

function entry(object) {
  var item = document.createElement('li');
  var newContent = document.createElement('div');
  var imageList = document.createElement('img');
  var textContent = document.createElement('div');
  var titleList = document.createElement('h2');
  var textList = document.createElement('p');
  imageList.setAttribute('src', object.photo);
  titleList.textContent = object.title;
  imageList.className = 'image-list';
  titleList.className = 'row';
  textList.textContent = object.text;
  textContent.prepend(textList);
  textContent.prepend(titleList);
  textContent.className = 'margin-text-entry';
  newContent.prepend(textContent);
  newContent.prepend(imageList);
  newContent.className = 'row';
  item.prepend(newContent);
  item.className = 'entry';
  $list.prepend(item);
  document.addEventListener('DOMContentLoaded', contentLoad);
}
