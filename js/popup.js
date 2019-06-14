//get modal elemnent
var modal = document.getElementById('simpleModal');
// get open modal Button
var foo = document.getElementById("caleandar-wrapper");
// get close Button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

// listen for open click
foo.addEventListener("dblclick", function(e){
var modalDay = e.target.dataset.day;
if (!modalDay){
  return false;
}
if (modalDay) {
  modal.style.display = 'block';
}

e.preventDefault();
})
// listen for close lclick
closeBtn.addEventListener('click', closeModal);
// listen for  outside click
window.addEventListener('click', outsideClick);

//function to open modal
function openModal() {
  modal.style.display = 'block';
}
//function to close modal if outside click
function closeModal() {
  modal.style.display = 'none';
}
function outsideClick(e) {
  if (e.target == modal) {      //e.target
    modal.style.display = 'none';
  }


}
