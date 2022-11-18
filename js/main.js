function preview(event) {
  var photoUrl = event.target.value;
  $firstImage.setAttribute('src', photoUrl);
}

function save(event) {
  event.preventDefault();
  var entryObject = {};
  entryObject.entryId = data.nextEntryId;
  entryObject.title = $submit.elements.title.value;
  entryObject.photoUrl = $submit.elements.photoUrl.value;
  entryObject.text = $submit.elements.notes.value;
  data.entries.unshift(entryObject);
  $list.prepend(entry(entryObject));
  data.nextEntryId += 1;
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
  $delete.className = 'delete visitibility-hidden';
  $submit.reset();
  onClick();
}

function editEntry(event) { // assigns the clicked entry to the editing property of data
  if (event.target.tagName !== 'I') {
    return;
  }
  if (event.target && event.target.tagName === 'I') {
    for (let i = 0; i < data.entries.length; i++) { // loop through data entries and find matching entry id
      if (data.entries[i].entryId === parseInt(event.target.closest('li').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];
      }
    }
  } onClick();
  $titleEntry.textContent = 'Edit Entry';
  $delete.className = 'delete visible';
  $submit.elements.title.value = data.editing.title;
  $submit.elements.photoUrl.value = data.editing.photoUrl;
  $submit.elements.notes.value = data.editing.text;
  $firstImage.setAttribute('src', data.editing.photoUrl);
}

function handleEditSubmit(event) { // handles the submit event for editing an entry
  event.preventDefault();
  data.editing.title = $submit.elements.title.value;
  data.editing.photoUrl = $submit.elements.photoUrl.value;
  data.editing.text = $submit.elements.notes.value;
  var $nodeToReplace = document.querySelector(`li[data-entry-id="${data.editing.entryId}"]`);
  $nodeToReplace.replaceWith(entry(data.editing));
  onClick2();
  // data.editing = null;
}

function showModal(event) {
  myModal.className = 'modal-content row justify-center';
  modalBox.className = 'modal';
}

function hideModal(event) {

  myModal.className = 'modal-content hidden row justify-center';
  modalBox.className = 'modal hidden';
  event.preventDefault();
}

function deleteConfirm(event) {

  var entryDataId = data.editing.entryId;
  var entryNodeList = document.querySelectorAll('.entry');

  for (var i = 0; i < entryNodeList.length; i++) {
    if (entryNodeList[i].getAttribute('data-entry-id') === entryDataId.toString()) {
      entryNodeList[i].remove();
    }
    if (entryDataId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }
  if (data.entries.length === 0) {
    $paragraph.textContent = 'No entries have been recorded';
  }
  myModal.className = 'modal-content hidden row justify-center';
  modalBox.className = 'modal hidden';
  event.preventDefault();
  onClick2();
}

var $firstImage = document.querySelector('.first-image');

var $submit = document.querySelector('.form');
var $newButton = document.querySelector('.new');
var $firstForm = document.querySelector('.first');
var $secondForm = document.querySelector('.second');

var $list = document.querySelector('ul');
var $paragraph = document.querySelector('.text-center');

document.addEventListener('DOMContentLoaded', contentLoad);
$submit.addEventListener('submit', function (event) {
  if (data.editing) {
    return handleEditSubmit(event);
  } else {
    return save(event);
  }
});
$list.addEventListener('click', editEntry);

var $photo = document.querySelector('.photo');
$photo.addEventListener('input', preview);

$newButton.addEventListener('click', createEntry);
var $entries = document.querySelector('.entry-link');
$entries.addEventListener('click', onClick2);

var $titleEntry = document.querySelector('.entry-title');

var $delete = document.querySelector('.delete');

var myModal = document.querySelector('.modal-content');
var modalBox = document.querySelector('.modal');
$delete.addEventListener('click', showModal);

var $cancelBtn = document.querySelector('.cancel');
$cancelBtn.addEventListener('click', hideModal);

var confirmBtn = document.querySelector('.confirm');
confirmBtn.addEventListener('click', deleteConfirm);
