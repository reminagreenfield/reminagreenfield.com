document.getElementById("mobile-nav-trigger").addEventListener("click", function(){
    if(this.closest("#mobile").classList.contains('open')){
        this.closest("#mobile").classList.remove('open');
    }else{
        this.closest("#mobile").classList.add('open');
    }
})


// Get the button:
let mybutton = document.getElementById("back-to-top");
mybutton.addEventListener("click",topFunction)
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if ((document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) && window.outerWidth < 900) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  window.scrollTo({
    top: 0,
    behavior: "smooth"
});
}