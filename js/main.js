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
});
