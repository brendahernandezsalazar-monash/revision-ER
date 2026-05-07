const STORAGE_KEY = "escape_room_player_name";

function getSavedName() {
  return localStorage.getItem(STORAGE_KEY) || "";
}

function saveName(name) {
  localStorage.setItem(STORAGE_KEY, name);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("startForm");
  const input = document.getElementById("playerName");
  const error = document.getElementById("errorMsg");

  // Prefill if they've been here before
  input.value = getSavedName();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    error.textContent = "";

    const name = input.value.trim();

    if (!name) {
      error.textContent = "Please enter your name to begin.";
      input.focus();
      return;
    }

    saveName(name);

    // Go to next page
    window.location.href = "room1.html";
  });
});

