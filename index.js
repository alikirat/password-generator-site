const suggestedP1 = document.getElementById("suggested-p-1");
const suggestedP2 = document.getElementById("suggested-p-2");

const lengthInput = document.getElementById("length-input");
const lengthValue = document.getElementById("length-value");
const numbersToggle = document.getElementById("numbers-toggle");
const symbolsToggle = document.getElementById("symbols-toggle");

const themeToggleBtn = document.getElementById("theme-toggle");
const copyHint = document.getElementById("copy-hint");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const symbols = "!@#$%^&*_-".split("");


function getCharacterSet() {
  let chars = [...letters];
  if (numbersToggle.checked) chars = chars.concat(numbers);
  if (symbolsToggle.checked) chars = chars.concat(symbols);
  return chars;
}

function generateRandomPassword() {
  let length = Number(lengthInput.value);
  if (length < 4) length = 4;

  const chars = getCharacterSet();
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  return password;
}

function generateRandomPasswords() {
  suggestedP1.textContent = generateRandomPassword();
  suggestedP2.textContent = generateRandomPassword();
  copyHint.textContent = "Tip: click a password to copy.";
}

// Copy with Scrimba-safe fallback
function selectText(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

async function copyToClipboard(text, el) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {}

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    return true;
  } catch {
    selectText(el);
    return false;
  }
}

suggestedP1.addEventListener("click", async () => {
  const ok = await copyToClipboard(suggestedP1.textContent, suggestedP1);
  copyHint.textContent = ok
    ? "Copied first password!"
    : "Selected. Press Ctrl/Cmd + C to copy.";
});

suggestedP2.addEventListener("click", async () => {
  const ok = await copyToClipboard(suggestedP2.textContent, suggestedP2);
  copyHint.textContent = ok
    ? "Copied second password!"
    : "Selected. Press Ctrl/Cmd + C to copy.";
});

// Slider label update
lengthInput.addEventListener("input", () => {
  lengthValue.textContent = lengthInput.value;
});

// Theme toggle
function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  localStorage.setItem("theme", theme);
}

themeToggleBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  setTheme(isLight ? "dark" : "light");
});

// Init
setTheme(localStorage.getItem("theme") || "dark");
generateRandomPasswords();
