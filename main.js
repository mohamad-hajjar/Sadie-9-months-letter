$(document).ready(function () {
  var envelope = $("#envelope");
  var btn_open = $("#open");
  var btn_reset = $("#reset");
  // NEW ELEMENTS
  var btn_read_more = $("#read-more-btn");
  var btn_close_letter = $("#close-letter-btn");
  var full_letter = $("#full-letter-container");
  var music = document.getElementById("bg-music");

  // Function to open the envelope and start music
  function open() {
    envelope.addClass("open").removeClass("close");
    // Attempt to play music on envelope open click
    if (music && music.paused) {
      music.volume = 0.3; // Low volume
      music.play().catch(function (error) {
        console.log("Autoplay prevented on envelope click:", error);
      });
    }
  }

  // Function to close the envelope AND stop the music
  function close() {
    envelope.addClass("close").removeClass("open");
    // NEW LOGIC: Stop the music only when the "Close" button is pressed
    if (music) {
      music.pause();
      music.currentTime = 0; // Reset to the start of the song
    }
  }

  // Envelope and button handlers
  envelope.click(function () {
    open();
  });
  btn_open.click(function () {
    open();
  });
  btn_reset.click(function () {
    close(); // This now stops the music
  });

  // Click "Read More" to show full letter
  btn_read_more.click(function (e) {
    e.stopPropagation(); // Prevents the envelope from closing
    
    full_letter.removeClass("hidden");
    setTimeout(function () {
      full_letter.addClass("show");
    }, 10);
  });

  // Click to close the full letter
  btn_close_letter.click(function () {
    full_letter.removeClass("show");
    setTimeout(function () {
      full_letter.addClass("hidden");
    }, 1000); // Wait for transition to finish before adding 'hidden'
    
    // REMOVED: Music pause/stop logic is now handled exclusively by the 'Close' button
    // The music will continue playing as they return to the envelope preview.
  });
});