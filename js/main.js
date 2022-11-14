// global data
function preview(event) {
  var photoUrl = event.target.value;
  $firstImage.setAttribute('src', photoUrl);
}

function save(event) {
  event.preventDefault();

  if (data.editing === null) {
    var entryObject = {};
    entryObject.entryId = data.nextEntryId;
  } else {
    var entryListElement = data.editing;

    entryObject = getObject(entryListElement);
  }
  entryObject.title = $submit.elements.title.value;
  entryObject.photoUrl = $submit.elements.photoUrl.value;
  entryObject.text = $submit.elements.notes.value;
  var renderedEntry = entry(entryObject);
  if (data.editing === null) {
    $list.prepend(renderedEntry);
    data.entries.unshift(entryObject);
    data.nextEntryId += 1;
  } else {
    entryListElement.replaceWith(renderedEntry);
  }
  $titleEntry.textContent = 'New Entry';
  onClick2();

}

// create dom tree
function entry(object) {
  var item = document.createElement('li');
  item.className = 'entry';

  var newContent = document.createElement('div');
  newContent.className = 'row';
  item.append(newContent);

  var imageList = document.createElement('img');
  imageList.className = 'image-list col-3';
  imageList.setAttribute('src', object.photoUrl);
  imageList.setAttribute('alt', 'Entry Image');
  newContent.append(imageList);

  var textContent = document.createElement('div');
  textContent.className = 'margin-text-entry text-content';
  newContent.append(textContent);

  var title = document.createElement('div');
  title.className = 'space-around';

  var titleList = document.createElement('h2');
  titleList.textContent = object.title;
  titleList.className = 'row';
  textContent.append(titleList);

  var icon = document.createElement('i');
  icon.className = 'fa-solid fa-pencil fa-xl edit-icon';

  var textList = document.createElement('p');
  textList.textContent = object.text;
  textContent.append(textList);

  textContent.prepend(title);
  title.append(titleList);
  title.append(icon);

  $paragraph.textContent = '';
  item.setAttribute('data-entry-id', object.entryId);
  return item;
}

function contentLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = entry(data.entries[i]);
    $list.append(renderedEntry);
  }
  return $list;
}

function onClick(event) {
  $secondForm.className = 'second hidden';
  $firstForm.className = 'first';
  data.view = 'entry-form';
}

function onClick2(event) {
  $secondForm.className = 'second';
  $firstForm.className = 'first hidden';
  data.view = 'entries';
  data.editing = null;
}

function createEntry(event) {
  $titleEntry.textContent = 'New Entry';
  $firstImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  $submit.reset();
  onClick();
}

function editEntry(event) {
  if (event.target.tagName !== 'I') {
    return;
  }
  onClick();
  var entryListElement = event.target.closest('li');
  data.editing = entryListElement;
  var entryObject = getObject(entryListElement);

  $submit.elements.title.value = entryObject.title;
  $submit.elements.photoUrl.value = entryObject.photoUrl;
  $firstImage.setAttribute('src', entryObject.photoUrl);
  $submit.elements.notes.value = entryObject.text;
  $titleEntry.textContent = 'Edit Entry';

}

function getObject(entryListElement) {
  var entryId = entryListElement.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    if (parseInt(entryId) === data.entries[i].entryId) {
      var entryObject = data.entries[i];
      return entryObject;
    }

  }
}

var $firstImage = document.querySelector('.first-image');

var $submit = document.querySelector('.form');
var $newButton = document.querySelector('.new');
var $firstForm = document.querySelector('.first');
var $secondForm = document.querySelector('.second');

var $list = document.querySelector('ul');
var $paragraph = document.querySelector('.text-center');

document.addEventListener('DOMContentLoaded', contentLoad);
$submit.addEventListener('submit', save);
$list.addEventListener('click', editEntry);

var $photo = document.querySelector('.photo');
$photo.addEventListener('input', preview);

$newButton.addEventListener('click', createEntry);
var $entries = document.querySelector('.entry-link');
$entries.addEventListener('click', onClick2);

var $saveButton = document.querySelector('.button-save');
$saveButton.addEventListener('click', save);
var $titleEntry = document.querySelector('.entry-title');
