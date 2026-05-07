const STORAGE_KEY = "escape_room_player_name";

document.addEventListener("DOMContentLoaded", () => {
  const name = (localStorage.getItem(STORAGE_KEY) || "").trim();
  const intro = document.getElementById("introLine");

  const safeName = name ? name : "Traveler";

  intro.textContent =
    `${safeName}, you have to decide how to face the asylum's torment. ` +
    `Choose wisely, as your decision is final.`;
});
