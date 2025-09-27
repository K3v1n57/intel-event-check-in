// === JavaScript for Teams ===
let attendeeCount = 0;
let teamCounts = { water: 0, zero: 0, power: 0 };
let attendees = [];
const goal = 50;

const attendeeCountEl = document.getElementById("attendeeCount");
const greetingEl = document.getElementById("greeting");
const progressBarEl = document.getElementById("progressBar");
const waterCountEl = document.getElementById("waterCount");
const zeroCountEl = document.getElementById("zeroCount");
const powerCountEl = document.getElementById("powerCount");
const checkInForm = document.getElementById("checkInForm");

let attendeeListEl = document.getElementById("attendeeList");
if (!attendeeListEl) {
  attendeeListEl = document.createElement("ul");
  attendeeListEl.id = "attendeeList";
  attendeeListEl.style.marginTop = "20px";
  attendeeListEl.style.textAlign = "left";
  document.querySelector(".container").appendChild(attendeeListEl);
}

// === Load progress ===
function loadProgress() {
  const saved = JSON.parse(localStorage.getItem("summitData"));
  if (saved) {
    attendeeCount = saved.attendeeCount || 0;
    teamCounts = saved.teamCounts || { water: 0, zero: 0, power: 0 };
    attendees = saved.attendees || [];
    updateUI();
  }
}

// === Save progress ===
function saveProgress() {
  localStorage.setItem(
    "summitData",
    JSON.stringify({ attendeeCount, teamCounts, attendees })
  );
}

// === Update ===
function updateUI() {
  attendeeCountEl.textContent = attendeeCount;
  waterCountEl.textContent = teamCounts.water;
  zeroCountEl.textContent = teamCounts.zero;
  powerCountEl.textContent = teamCounts.power;

  let percent = Math.min((attendeeCount / goal) * 100, 100);
  progressBarEl.style.width = percent + "%";

  attendeeListEl.innerHTML = "";
  attendees.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = `${a.name} → ${
      a.team === "water"
        ? "Team Water Wise 🌊"
        : a.team === "zero"
        ? "Team Net Zero 🌿"
        : "Team Renewables ⚡"
    }`;
    attendeeListEl.appendChild(li);
  });
}

// === Celebration ===
function celebrate() {
  const winningTeam = Object.keys(teamCounts).reduce((a, b) =>
    teamCounts[a] > teamCounts[b] ? a : b
  );

  greetingEl.textContent = `🎉 Congratulations, You have reached the attendance goal! 🎉  ${
    winningTeam === "water"
      ? "Team Water Wise 🌊"
      : winningTeam === "zero"
      ? "Team Net Zero 🌿"
      : "Team Renewables ⚡"
  }!`;
  greetingEl.className = "success-message";
  greetingEl.style.display = "block";
}

// === Check-in ===
checkInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("attendeeName").value.trim();
  const team = document.getElementById("teamSelect").value;

  if (!name || !team) return;

  // Update counts
  attendeeCount++;
  teamCounts[team]++;
  attendees.push({ name, team });

  // Greeting
  greetingEl.textContent = `Welcome to the Team ${name} 🎉. Go ${
    team === "water" 
      ? "Team Water Wise 🌊"
      : team === "zero"
      ? "Team Net Zero 🌿"
      : "Team Renewables ⚡"
  }!`;
  greetingEl.className = "success-message";
  greetingEl.style.display = "block";

  // Update + save progress
  updateUI();
  saveProgress();

  // Celebration check
   if (attendeeCount === goal) {
    celebrate();
  }

  // Reset form
  checkInForm.reset();
});

// === Initialize ===
loadProgress();
