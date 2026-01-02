// ==================================================
// 🔐 ADMIN SETTING (GANTI KODE DI SINI JIKA PERLU)
// ==================================================
let ADMIN_CODE = "0000"; // ⬅️ GANTI KODE BARU DI SINI
// ==================================================

// Cek apakah kode ini sudah pernah dipakai
let usedCode = localStorage.getItem("USED_CODE");

// DAFTAR HADIAH (URUTAN HARUS SAMA DENGAN PAPAN)
const prizes = [
  "Gopud 20rb",
  "Zonk",
  "Dapet limalibu",
  "Post foto WA 6 jam",
  "Dapet selibu",
  "Dapet dualibu",
  "Boleh login Netplik",
  "Gopud sepuluh ribu",
  "Seharian engga chat cabul",
  "Zonk",
  "Main ke Gunung Kelud",
  "Zonk"
];

// STATE GAME
let chances = 2;
let userPrizes = [];
let canSpin = false;
let rotation = 0;

// ELEMENT
const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const chanceText = document.getElementById("chance");

// AUDIO
const spinSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3"
);
const winSound = new Audio(
  "https://assets.mixkit.co/active_storage/sfx/2063/2063-preview.mp3"
);

// ==================================================
// 🔐 MODAL KODE
// ==================================================
document.getElementById("codeModal").style.display = "flex";

function verifyCode() {
  const input = document.getElementById("secretCode").value;
  const errorText = document.getElementById("codeError");

  // Jika kode sudah pernah dipakai
  if (usedCode === ADMIN_CODE) {
    errorText.innerText =
      "Kode ini sudah dipakai 💔\nMinta kode baru ke ayang dwiky ya 😘";
    return;
  }

  // Jika kode salah
  if (input !== ADMIN_CODE) {
    errorText.innerText = "Kode salah ya ayang 😢";
    return;
  }

  // Kode valid & belum dipakai
  canSpin = true;
  document.getElementById("codeModal").style.display = "none";
}

// ==================================================
// 🎡 LOGIKA SPIN
// ==================================================
spinBtn.onclick = () => {
  if (!canSpin || chances <= 0) return;

  chances--;
  chanceText.innerText = chances;

  // Play sound spin
  spinSound.currentTime = 0;
  spinSound.play();

  // Tentukan hadiah
  const index = Math.floor(Math.random() * prizes.length);
  const prize = prizes[index];
  userPrizes.push(prize);

  // Hitung rotasi
  const angle = 360 / prizes.length;
  rotation += 360 * 4 + index * angle;
  wheel.style.transform = `rotate(${rotation}deg)`;

  // Setelah spin selesai
  setTimeout(() => {
    spinSound.pause();
    winSound.play();

    document.getElementById("resultText").innerText =
      `Cie ayang dapet "${prize}" 💖`;

    document.getElementById("resultModal").style.display = "flex";

    // Jika token habis → kunci kode
    if (chances === 0) {
      localStorage.setItem("USED_CODE", ADMIN_CODE);
    }

    document.getElementById("continueBtn").style.display =
      chances > 0 ? "inline-block" : "none";

    document.getElementById("redeemBtn").style.display =
      chances === 0 ? "inline-block" : "none";
  }, 4200);
};

// ==================================================
// ▶️ LANJUT MAIN
// ==================================================
document.getElementById("continueBtn").onclick = () => {
  document.getElementById("resultModal").style.display = "none";
};

// ==================================================
// 🎁 TUKARKAN HADIAH (WHATSAPP)
// ==================================================
document.getElementById("redeemBtn").onclick = () => {
  const message = encodeURIComponent(
    "Hadiah Spin Ayang 💖:\n\n" +
    userPrizes.map((p, i) => `${i + 1}. ${p}`).join("\n")
  );

  window.location.href =
    `https://wa.me/6285379504992?text=${message}`;
};
