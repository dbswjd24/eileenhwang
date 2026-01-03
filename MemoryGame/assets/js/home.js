document.addEventListener('DOMContentLoaded', (event) => {
    const container = document.querySelector('.container');
    container.classList.add('fade-in');
  
    const playButton = document.querySelector('.play-button');
    if (playButton) {
      playButton.addEventListener('click', function(e) {
        e.preventDefault();
        container.classList.add('fade-out');
        setTimeout(() => {
          window.location.href = this.href;
        }, 1000);
      });
    }
  });