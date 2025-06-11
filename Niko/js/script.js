const veyronGroup = document.querySelector('.group.relative');
const veyronVideo = document.getElementById('veyronVideo');
const veyronImg = document.getElementById('veyronImg');
const veyronOverlay = document.getElementById('veyronOverlay');
let veyronLoaded = false;
if (veyronGroup && veyronVideo && veyronImg && veyronOverlay) {
  veyronGroup.addEventListener('mouseenter', () => {
    if (!veyronLoaded) {
      veyronOverlay.style.opacity = 0.7;
      veyronVideo.load();
      veyronLoaded = true;
      veyronVideo.addEventListener('canplay', function handler() {
        veyronOverlay.style.opacity = 0;
        veyronVideo.currentTime = 0;
        veyronVideo.play();
        veyronVideo.style.opacity = 1;
        veyronImg.style.opacity = 0;
        veyronVideo.removeEventListener('canplay', handler);
      });
    } else {
      veyronVideo.currentTime = 0;
      veyronVideo.play();
      veyronVideo.style.opacity = 1;
      veyronImg.style.opacity = 0;
    }
  });
  veyronGroup.addEventListener('mouseleave', () => {
    veyronVideo.pause();
    veyronVideo.style.opacity = 0;
    veyronImg.style.opacity = 1;
    veyronOverlay.style.opacity = 0;
  });
}

 document.addEventListener('DOMContentLoaded', function() {
      const video = document.querySelector('video');
      if (video) {
        video.playbackRate = 0.8;
      }
    });