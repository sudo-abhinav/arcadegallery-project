function playsong() {
    var myAudio = document.getElementById("myaudi");
    if (myaudi.paused) {
      myaudi.play();
    } else {
      myaudi.pause();
    }
  }