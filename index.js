// יצירת אובייקט מוזיקת רקע גלובלי
let bgMusic = new Audio("./sounds/jungle.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

// ניסיון לנגן אוטומטית בטעינת העמוד
window.onload = function () {
  // האלמנט הבא לא נלמד בכיתה:
  // שימוש בפרמטר השלישי של addEventListener כאובייקט הגדרות, עם once:true.
  // פעולה זו מאזינה ללחיצה בדף אך רק פעם אחת בלבד – ולאחר מכן מסירה את עצמה אוטומטית.
  // זה מאפשר לנו להתמודד עם דפדפנים שחוסמים השמעה אוטומטית, ולנגן מוזיקת רקע בלחיצה הראשונה בלבד.
  bgMusic.play().catch(() => {
    document.addEventListener("click", () => {
      bgMusic.play();
    }, { once: true }); 
  });
};

// משתנה לשמירת הצליל של החיה הנוכחית
let currentAnimalAudio = null;

// האזנה ללחיצה על כפתור
document.querySelectorAll(".animal").forEach(button => {
  button.addEventListener("click", function () {
    const key = this.textContent.toLowerCase();
    makeSound(key);
    buttonAnimation(key);
  });
});

// האזנה למקלדת
document.addEventListener("keypress", function (event) {
  const key = event.key.toLowerCase();
  makeSound(key);
  buttonAnimation(key);
});

// השמעת צליל של חיה לפי מקש
function makeSound(key) {
  let soundFile = "";
  switch (key) {
    case "b": soundFile = "birds"; break;
    case "c": soundFile = "cat"; break;
    case "d": soundFile = "dolphin"; break;
    case "f": soundFile = "frogs"; break;
    case "o": soundFile = "owl"; break;
    case "s": soundFile = "sheep"; break;
    case "t": soundFile = "tzarzar"; break;
    default:
      alert("Oops! This key doesn't match any animal.");
      return;
  }

  // עצירת מוזיקת רקע אם פועלת
  if (!bgMusic.paused) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  // עצירת קול קודם של חיה אם קיים
  if (currentAnimalAudio && !currentAnimalAudio.paused) {
    currentAnimalAudio.pause();
    currentAnimalAudio.currentTime = 0;
  }

  // ניגון קול חדש
  currentAnimalAudio = new Audio(`./sounds/${soundFile}.mp3`);
  currentAnimalAudio.play();
}

// אפקט לחיצה
function buttonAnimation(currentKey) {
  const activeButton = document.querySelector("." + currentKey);
  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }
}
