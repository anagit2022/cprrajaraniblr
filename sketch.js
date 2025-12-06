// ----------------- GLOBAL STATE -----------------
let genderState = null;   // 1 = Raja, 0 = Rani
let mic;
let listeningForResponse = false;
let responseTimeout = null;
let breath_no;
let dialedNumber = '';
let t1, t2, t3, t4, t5;
let canvas;
let canvasActive = false;
let count = 0;
let currentState = "blank";
let compression_count = 0;
let now, interval;
let lastTouchTime = 0;

// play screen visual vars
let cheekOpacity = 40;
let lipOpacity = 120;
let play_start_time, play_elapsed = 0;

// active blood fill
let goodfillRate = 100;
let badfillRate = 50;
let progress = 0;

// bpm meter
let angle = 0;
let bpm = 0;
let numberToDisplay;
let decayRate = 10;
let decay_normal = 90;

// compressions
let maxTotalCompressions = 0;
let task_time;
let timeleft;
let good_compression = 0;
let diffGoal = 0;
let fastcount = 0;
let slowcount = 0;

// track inactivity
let pressed_time = 0;
let lastTouchElapsed = 0;

// play screen images
let playimg, heartimg, meterimg, arrowimg;

// DOM refs that will be set after DOMContentLoaded
let begin1, gender, intro, checkdanger, checkresponse, checkresponseq, checkbreathing;
let awake, checkbreathingq, checkbreathingtypeq, normalbreathing;
let dnotsafeq, dcantsafe;
let promisedraja, promisedrajapress, promisesealedraja;
let promisedrani, promisedranipress, promisesealedrani;
let responded, promiserrani, promiserranipress, promiserraja, promiserrajapress;
let promisebraja, promisebrajapress, promisebrani, promisebranipress;
let requestaed, dial112blank, dial112, addspeaker, addedspeaker;
let victiminca, cpr1, cpr2, cpr3, cpr4, cpr5, p5Screen, win;
let promisewraja, promisewrajapress, promisewrani, promisewranipress;
let latefast, lateslow, lateinactive, aed;
let promiseaedraja, promiseaedrajapress, promiseaedrani, promiseaedranipress;
let amb, promiseambraja, promiseambrajapress, promiseambrani, promiseambranipress;
let promiselateinactiveraja, promiselateinactiverajapress;
let promiselateinactiverani, promiselateinactiveranipress;
let promiselatefastraja, promiselatefastrajapress;
let promiselatefastrani, promiselatefastranipress;
let promiselateslowraja, promiselateslowrajapress;
let promiselateslowrani, promiselateslowranipress;

// ----------------- P5: preload & setup -----------------
function preload() {
  // play screen
  playimg = loadImage("eyes+ (2).png");
  heartimg = loadImage("heart.png");
  meterimg = loadImage("bpm meter86.png");
  arrowimg = loadImage("arrow2.png");
}

function setup() {
  // NOTE: no canvas, no mic.start() here – keep mobile happy
  breath_no = floor(random(11));
  console.log("breath_no:", breath_no);
  maxTotalCompressions = floor(random(30, 50));
  task_time = 600 * maxTotalCompressions + 3000;
  imageMode(CENTER);
}

// ----------------- MIC HELPER (start only on user gesture) -----------------
function ensureMicStarted() {
  if (!mic) {
    mic = new p5.AudioIn();
    // This will now be called inside a click handler (mobile-safe)
    mic.start();
  }
}

// ----------------- CANVAS HELPERS -----------------
function startCanvas() {
  if (!canvasActive) {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("p5Screen");
    canvasActive = true;
  }
}

function removeCanvas() {
  if (canvasActive) {
    canvas.remove();
    canvasActive = false;
  }
}

// ----------------- DOM SETUP & BUTTON HANDLERS -----------------
window.addEventListener("DOMContentLoaded", () => {
  // Screens
  begin1 = document.getElementById("begin1");
  gender = document.getElementById("gender");
  intro = document.getElementById("intro");
  checkdanger = document.getElementById("checkdanger");
  checkresponse = document.getElementById("checkresponse");
  checkresponseq = document.getElementById("checkresponseq");
  checkbreathing = document.getElementById("checkbreathing");
  awake = document.getElementById("awake");
  checkbreathingq = document.getElementById("checkbreathingq");
  checkbreathingtypeq = document.getElementById("checkbreathingtypeq");
  normalbreathing = document.getElementById("normalbreathing");
  dnotsafeq = document.getElementById("dnotsafeq");
  dcantsafe = document.getElementById("dcantsafe");
  promisedraja = document.getElementById("promisedraja");
  promisedrajapress = document.getElementById("promisedrajapress");
  promisesealedraja = document.getElementById("promisesealedraja");
  promisedrani = document.getElementById("promisedrani");
  promisedranipress = document.getElementById("promisedranipress");
  promisesealedrani = document.getElementById("promisesealedrani");
  responded = document.getElementById("responded");
  promiserrani = document.getElementById("promiserrani");
  promiserranipress = document.getElementById("promiserranipress");
  promiserraja = document.getElementById("promiserraja");
  promiserrajapress = document.getElementById("promiserrajapress");
  promisebraja = document.getElementById("promisebraja");
  promisebrajapress = document.getElementById("promiserrajapress");
  promisebrani = document.getElementById("promisebrani");
  promisebranipress = document.getElementById("promisebranipress");
  requestaed = document.getElementById("requestaed");
  dial112blank = document.getElementById("dial112blank");
  dial112 = document.getElementById("dial112");
  addspeaker = document.getElementById("addspeaker");
  addedspeaker = document.getElementById("addedspeaker");
  victiminca = document.getElementById("victiminca");
  cpr1 = document.getElementById("cpr1");
  cpr2 = document.getElementById("cpr2");
  cpr3 = document.getElementById("cpr3");
  cpr4 = document.getElementById("cpr4");
  cpr5 = document.getElementById("cpr5");
  p5Screen = document.getElementById("p5Screen");
  win = document.getElementById("win");
  promisewraja = document.getElementById("promisewraja");
  promisewrajapress = document.getElementById("promisewrajapress");
  promisewrani = document.getElementById("promisewrani");
  promisewranipress = document.getElementById("promisewranipress");
  latefast = document.getElementById("latefast");
  lateslow = document.getElementById("lateslow");
  lateinactive = document.getElementById("lateinactive");
  aed = document.getElementById("aed");
  promiseaedraja = document.getElementById("promiseaedraja");
  promiseaedrajapress = document.getElementById("promiseaedrajapress");
  promiseaedrani = document.getElementById("promiseaedrani");
  promiseaedranipress = document.getElementById("promiseaedranipress");
  amb = document.getElementById("amb");
  promiseambraja = document.getElementById("promiseambraja");
  promiseambrajapress = document.getElementById("promiseambrajapress");
  promiseambrani = document.getElementById("promiseambrani");
  promiseambranipress = document.getElementById("promiseambranipress");
  promiselateinactiveraja = document.getElementById("promiselateinactiveraja");
  promiselateinactiverajapress = document.getElementById("promiselateinactiverajapress");
  promiselateinactiverani = document.getElementById("promiselateinactiverani");
  promiselateinactiveranipress = document.getElementById("promiselateinactiveranipress");
  promiselatefastraja = document.getElementById("promiselatefastraja");
  promiselatefastrajapress = document.getElementById("promiselatefastrajapress");
  promiselatefastrani = document.getElementById("promiselatefastrani");
  promiselatefastranipress = document.getElementById("promiselatefastranipress");
  promiselateslowraja = document.getElementById("promiselateslowraja");
  promiselateslowrajapress = document.getElementById("promiselateslowrajapress");
  promiselateslowrani = document.getElementById("promiselateslowrani");
  promiselateslowranipress = document.getElementById("promiselateslowranipress");

  // Buttons
  const beginBtn = document.getElementById("beginBtn");
  const rajaBtn = document.getElementById("rajaBtn");
  const raniBtn = document.getElementById("raniBtn");
  const startBtn = document.getElementById("startBtn");
  const dyesBtn = document.getElementById("dyesBtn");
  const dnoBtn = document.getElementById("dnoBtn");
  const ryesBtn = document.getElementById("ryesBtn");
  const rnoBtn = document.getElementById("rnoBtn");
  const byesBtn = document.getElementById("byesBtn");
  const bnoBtn = document.getElementById("bnoBtn");
  const normalBtn = document.getElementById("normalBtn");
  const abnormalBtn = document.getElementById("abnormalBtn");
  const nowsafeBtn = document.getElementById("nowsafeBtn");
  const cantsafeBtn = document.getElementById("cantsafeBtn");
  const nextpBtn = document.getElementById("nextpBtn");
  const promiseBtn = document.getElementById("promiseBtn");
  const dpromisepress = document.getElementById("dpromisepress");
  const dranipromisepress = document.getElementById("dranipromisepress");
  const rranipromisepress = document.getElementById("rranipromisepress");
  const rrajapromisepress = document.getElementById("rrajapromisepress");
  const nextBtn = document.getElementById("nextBtn");
  const nextprBtn = document.getElementById("nextprBtn");
  const nextvBtn = document.getElementById("nextvBtn");
  const branipromisepress = document.getElementById("branipromisepress");
  const bpromisepress = document.getElementById("bpromisepress");
  const nextaBtn = document.getElementById("nextaBtn");
  const callBtn = document.getElementById("callBtn");
  const speakerbtn = document.getElementById("speakerbtn");
  const nextc1 = document.getElementById("nextc1");
  const nextc2 = document.getElementById("nextc2");
  const nextc3 = document.getElementById("nextc3");
  const nextc4 = document.getElementById("nextc4");
  const startcpr = document.getElementById("startcpr");
  const nextwinBtn = document.getElementById("nextwinBtn");
  const nextaedBtn = document.getElementById("nextaedBtn");
  const nextambBtn = document.getElementById("nextambBtn");
  const nextlateinactiveBtn = document.getElementById("nextlateinactiveBtn");
  const nextlateslowBtn = document.getElementById("nextlateslowBtn");
  const nextlatefastBtn = document.getElementById("nextlatefastBtn");
  const practiceagainbtnraja = document.getElementById("practiceagainbtnraja");
  const practiceagainbtnrani = document.getElementById("practiceagainbtnrani");
  const practiceagainbtn = document.getElementById("practiceagainbtn");
  const wpromisepress = document.getElementById("wpromisepress");
  const wranipromisepress = document.getElementById("wranipromisepress");

  // --------- BUTTON LOGIC (unchanged behaviour) ---------
  beginBtn.onclick = () => {
    begin1.style.display = "none";
    gender.style.display = "flex";
  };

  rajaBtn.onclick = () => {
    genderState = 1;
    console.log("Gender:", genderState);
    introAudio.play();
    gender.style.display = "none";
    intro.style.display = "flex";
  };

  raniBtn.onclick = () => {
    genderState = 0;
    console.log("Gender:", genderState);
    introAudio.play();
    gender.style.display = "none";
    intro.style.display = "flex";
  };

  startBtn.onclick = () => {
    intro.style.display = "none";
    checkdanger.style.display = "flex";
    introAudio.pause();
    introAudio.currentTime = 0;
    checkdAudio.play();
  };

  // ---- Danger yes → start voice check ----
  dyesBtn.onclick = () => {
    checkdAudio.pause();
    checkdAudio.currentTime = 0;
    checkrAudio.play();
    checkdanger.style.display = "none";
    checkresponse.style.display = "flex";

    // 🔊 mic only starts now (inside click)
    ensureMicStarted();

    listeningForResponse = true;

    responseTimeout = setTimeout(() => {
      listeningForResponse = false;
      checkresponse.style.display = "none";
      checkresponseq.style.display = "flex";
      checkrAudio.pause();
      checkrAudio.currentTime = 0;
      did_spongy_respond.play();
    }, 8000);
  };

  dnoBtn.onclick = () => {
    checkdAudio.pause();
    checkdAudio.currentTime = 0;
    dnotsafeAudio.play();
    checkdanger.style.display = "none";
    dnotsafeq.style.display = "flex";
  };

  nowsafeBtn.onclick = () => {
    dnotsafeAudio.pause();
    dnotsafeAudio.currentTime = 0;
    dnotsafeq.style.display = "none";
    checkresponse.style.display = "flex";

    ensureMicStarted();
    listeningForResponse = true;

    responseTimeout = setTimeout(() => {
      listeningForResponse = false;
      checkresponse.style.display = "none";
      checkresponseq.style.display = "flex";
    }, 4000);
  };

  cantsafeBtn.onclick = () => {
    dnotsafeAudio.pause();
    dnotsafeAudio.currentTime = 0;
    cantdsafe.play();
    dnotsafeq.style.display = "none";
    dcantsafe.style.display = "flex";
  };

  nextpBtn.onclick = () => {
    cantdsafe.pause();
    cantdsafe.currentTime = 0;
    promisedaud.play();
    dcantsafe.style.display = "none";
    if (genderState === 1) {
      promisedraja.style.display = "flex";
      setTimeout(() => {
        promisedraja.style.display = "none";
        promisedrajapress.style.display = "flex";
      }, 2000);
    } else if (genderState === 0) {
      promisedrani.style.display = "flex";
      setTimeout(() => {
        promisedrani.style.display = "none";
        promisedranipress.style.display = "flex";
      }, 2000);
    }
  };

  dpromisepress.onclick = () => {
    promisedaud.pause();
    promisedaud.currentTime = 0;
    promisejingle.play();
    test.play();
    promisedrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  };

  dranipromisepress.onclick = () => {
    promisedaud.pause();
    promisedaud.currentTime = 0;
    promisejingle.play();
    test.play();
    promisedranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  };

  nextBtn.onclick = () => {
    awake.style.display = "none";
    responded.style.display = "flex";
  };

  nextprBtn.onclick = () => {
    responded.style.display = "none";
    if (genderState === 1) {
      promiserraja.style.display = "flex";
      setTimeout(() => {
        promiserraja.style.display = "none";
        promiserrajapress.style.display = "flex";
      }, 2000);
    } else if (genderState === 0) {
      promiserrani.style.display = "flex";
      setTimeout(() => {
        promiserrani.style.display = "none";
        promiserranipress.style.display = "flex";
      }, 2000);
    }
  };

  rranipromisepress.onclick = () => {
    promisedranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  };

  rrajapromisepress.onclick = () => {
    promiserrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  };

  rnoBtn.onclick = () => {
    did_spongy_respond.pause();
    did_spongy_respond.currentTime = 0;
    check_if_breathing.play();
    checkresponseq.style.display = "none";
    awake.style.display = "none";
    checkbreathing.style.display = "flex";
    console.log(breath_no);
    if (breath_no % 3 === 0) {
      gaspAudio.play();
    } else if (breath_no % 5 === 0) {
      normalbreathAudio.play();
    }
    setTimeout(() => {
      checkbreathing.style.display = "none";
      checkbreathingq.style.display = "flex";
      could_you_see_breathing.play();
    }, 10000);
  };

  bnoBtn.onclick = () => {
    could_you_see_breathing.pause();
    could_you_see_breathing.currentTime = 0;
    requestaedaud.play();
    checkbreathingq.style.display = "none";
    requestaed.style.display = "flex";
  };

  byesBtn.onclick = () => {
    breathingtype.play();
    could_you_see_breathing.pause();
    could_you_see_breathing.currentTime = 0;
    checkbreathingq.style.display = "none";
    checkbreathingtypeq.style.display = "flex";
  };

  
