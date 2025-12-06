let genderState = null;   // 1 = Raja, 0 = Rani
let mic;
let listeningForResponse = false;
let responseTimeout = null;
let breath_no ;
let dialedNumber = '';
let t1, t2, t3, t4, t5;
let canvas;
let canvasActive = false;
let count=0;
let currentState = "blank";
let compression_count = 0;
let now,interval;
let lastTouchTime = 0;
// play screen
let cheekOpacity = 40;
let lipOpacity = 120;
let play_start_time,play_elapsed = 0;
// for active blood fill
let goodfillRate = 100;
let badfillRate = 50;
let progress = 0;
//bpm meter
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
let fastcount =0;
let slowcount = 0;
// track inactivity
let pressed_time = 0 ;
lastTouchElapsed = 0;
// play screen
let playimg,heartimg,meterimg,arrowimg;
function preload(){
  // play screen
  playimg = loadImage("eyes+ (2).png");
  heartimg = loadImage("heart.png");
  meterimg = loadImage("bpm meter86.png");
  arrowimg = loadImage("arrow2.png");
}
function setup() {
  breath_no = floor(random(11));
  console.log(breath_no);
  maxTotalCompressions = floor(random(30, 50));
  task_time = 600 * maxTotalCompressions+3000;
  mic = new p5.AudioIn();
  mic.start();
  imageMode(CENTER);
}

window.onload = () => {
  // Screens
  const begin1 = document.getElementById("begin1");
  const gender = document.getElementById("gender");
  const intro = document.getElementById("intro");
  const checkdanger = document.getElementById("checkdanger");
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
  promiselateinactiverajapress =document.getElementById("promiselateinactiverajapress");
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
  const practiceagainbtnraja =document.getElementById("practiceagainbtnraja");
  const practiceagainbtnrani =document.getElementById("practiceagainbtnrani");
  const practiceagainbtn = document.getElementById("practiceagainbtn");
  const wpromisepress = document.getElementById("wpromisepress");
  const wranipromisepress = document.getElementById("wranipromisepress");

  
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
  beginBtn.onclick = () => {
    begin1.style.display = "none";
    gender.style.display = "flex";
  };

  rajaBtn.onclick = () => {
    genderState = 1;           // ✔ Raja
    console.log("Gender:", genderState);
    introAudio.play();
    gender.style.display = "none";
    intro.style.display = "flex";
  };

  raniBtn.onclick = () => {
    genderState = 0;           // ✔ Rani
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
  dyesBtn.onclick = () => {
     checkdAudio.pause();
    checkdAudio.currentTime = 0;
    checkrAudio.play();
    checkdanger.style.display = "none";
    checkresponse.style.display = "flex";
    listeningForResponse = true;
    // After 10 seconds → go to breathing screen
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
  }
  nowsafeBtn.onclick = () => {
    dnotsafeAudio.pause();
    dnotsafeAudio.currentTime = 0;
    dnotsafeq.style.display = "none";
    checkresponse.style.display = "flex";
    listeningForResponse = true;
    // After 10 seconds → go to breathing screen
  responseTimeout = setTimeout(() => {
    listeningForResponse = false;
    checkresponse.style.display = "none";
    checkresponseq.style.display = "flex";
  }, 4000);
  }
  cantsafeBtn.onclick = () => {
    dnotsafeAudio.pause();
    dnotsafeAudio.currentTime = 0;
    cantdsafe.play();
    dnotsafeq.style.display = "none";
    dcantsafe.style.display = "flex";
  }
  nextpBtn.onclick = () => {
    cantdsafe.pause();
    cantdsafe.currentTime = 0;
    promisedaud.play();
    dcantsafe.style.display = "none";
    if(genderState === 1){
    promisedraja.style.display = "flex";
   setTimeout(() => {
    promisedraja.style.display = "none";
    promisedrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promisedrani.style.display = "flex";
    setTimeout(() => {
    promisedrani.style.display = "none";
    promisedranipress.style.display = "flex";
   },2000); 
  }
    
  }
  dpromisepress.onclick = () => {
    promisedaud.pause();
    promisedaud.currentTime = 0;
    promisejingle.play();
    test.play();
    promisedrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  }
  dranipromisepress.onclick = () => {
    promisedaud.pause();
    promisedaud.currentTime = 0;
    promisejingle.play();
    test.play();
   
    promisedranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
  // if spongy responded
  nextBtn.onclick = () => {
    awake.style.display = "none";
    responded.style.display = "flex";
  }
  nextprBtn.onclick = () => {
    responded.style.display = "none";
    if(genderState === 1){
    promiserraja.style.display = "flex";
   setTimeout(() => {
    promiserraja.style.display = "none";
    promiserrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promiserrani.style.display = "flex";
    setTimeout(() => {
    promiserrani.style.display = "none";
    promiserranipress.style.display = "flex";
   },2000);
  }
  }
  rranipromisepress.onclick = () => {
    promisedranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
  rrajapromisepress.onclick = () => {
    promiserrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  }
  rnoBtn.onclick = () => {
    did_spongy_respond.pause();
    did_spongy_respond.currentTime = 0;
    check_if_breathing.play();
    checkresponseq.style.display = "none";
    awake.style.display = "none";
    checkbreathing.style.display = "flex";
    console.log(breath_no);
    if(breath_no % 3 === 0)
       {
         gaspAudio.play();
         console.log(10);
       }else if (breath_no % 5 === 0){
         normalbreathAudio.play();
         console.log(20);
       }
      setTimeout(() => {
    checkbreathing.style.display = "none";
    checkbreathingq.style.display = "flex";
    could_you_see_breathing.play();
   },10000); 
}
  bnoBtn.onclick = () => {
    could_you_see_breathing.pause();
    could_you_see_breathing.currentTime=0;
    requestaedaud.play();
    checkbreathingq.style.display = "none";
    requestaed.style.display = "flex";
  };
  
  byesBtn.onclick = () => {
    breathingtype.play();
    could_you_see_breathing.pause();
    could_you_see_breathing.currentTime=0;
    checkbreathingq.style.display = "none";
    checkbreathingtypeq.style.display = "flex";
  };
  

   normalBtn.onclick = () => {
    breathingtype.pause();
    breathingtype.currentTime = 0;
    
   checkbreathingtypeq.style.display = "none";
   normalbreathing.style.display = "flex";
   };
   abnormalBtn.onclick = () => {
     breathingtype.pause();
    breathingtype.currentTime = 0;
    requestaedaud.play();
    checkbreathingtypeq.style.display = "none";
    requestaed.style.display = "flex";
  };
   nextvBtn.onclick = () => {
      
   normalbreathing.style.display = "none";
   if(genderState === 1){
    promisebraja.style.display = "flex";
   setTimeout(() => {
    promisebraja.style.display = "none";
    promisebrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promisebrani.style.display = "flex";
    setTimeout(() => {
    promisebrani.style.display = "none";
    promisebranipress.style.display = "flex";
   },2000);
  }
   };
  branipromisepress.onclick = () => {
    promisebranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
  bpromisepress.onclick = () => {
    promisebrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  }
  // call for help and aed
  nextaBtn.onclick = () => {
    call112.play();
    requestaedaud.pause();
    requestaedaud.currentTime = 0;
    requestaed.style.display = "none";
    //dial112blank.style.display = "flex";
    dial112.style.display = "flex";
  }
  callBtn.onclick = () => {
     call112.pause();
    call112.currentTime = 0;
    dial112.style.display = "none";
    //dial112blank.style.display = "flex";
    addspeaker.style.display = "flex";
  }
  speakerbtn.onclick = () => {
  call112.pause();
  call112.currentTime = 0;
  addspeaker.style.display = "none";
  addedspeaker.style.display = "flex";

  // Step 1: After 10s → show victiminca
 t1 = setTimeout(() => {
  addedspeaker.style.display = "none";
  victiminca.style.display = "flex";

  t2 = setTimeout(() => {
    victiminca.style.display = "none";
    cpr1.style.display = "flex";

    t3 = setTimeout(() => {
      cpr1.style.display = "none";
      cpr2.style.display = "flex";

      t4 = setTimeout(() => {
        cpr2.style.display = "none";
        cpr3.style.display = "flex";

        t5 = setTimeout(() => {
          cpr3.style.display = "none";
          cpr4.style.display = "flex";
        }, 5000);

      }, 5000);

    }, 5000);

  }, 4000);

}, 10000);

nextc1.onclick = () => {
  clearTimeout(t1);
  
    cpr1.style.display = "none";
    cpr2.style.display = "flex";

  }
nextc2.onclick = () => {
  clearTimeout(t1);
  clearTimeout(t2);
    cpr2.style.display = "none";
    cpr3.style.display = "flex";

  }
nextc3.onclick = () => {
  clearTimeout(t1);
  clearTimeout(t2);
    clearTimeout(t3);
    cpr3.style.display = "none";
    cpr4.style.display = "flex";

  }
nextc4.onclick = () => {
  clearTimeout(t1);
  clearTimeout(t2);
    clearTimeout(t3);
   clearTimeout(t4);
    cpr4.style.display = "none";
    cpr5.style.display = "flex";

  }
    
};

startcpr.onclick = () => {

    clearTimeout(t1);
  clearTimeout(t2);
    clearTimeout(t3);
   clearTimeout(t4);
    clearTimeout(t5);
    cpr5.style.display = "none";
    p5Screen.style.display = "flex";
    startCanvas();
  currentState = "play";
   play_start_time = millis();

  }   
 nextwinBtn.onclick = () => {
   win.style.display = "none";
   if(genderState === 1){
    promisewraja.style.display = "flex";
   setTimeout(() => {
    promisewraja.style.display = "none";
    promisewrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promisewrani.style.display = "flex";
    setTimeout(() => {
    promisewrani.style.display = "none";
    promisewranipress.style.display = "flex";
   },2000);
  }
   };
  wranipromisepress.onclick = () => {
    promisewranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
   wpromisepress.onclick = () => {
    promisewrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  } 
   
   
   practiceagainbtnraja.onclick = () => {
     console.log("genderState is:", genderState);
    if(genderState === 1){
      console.log("raja.....");
    promisesealedraja.style.display = "none";
    begin1.style.display = "flex";
      reset();
    }
   }
     practiceagainbtnrani.onclick = () => {
    
    if(genderState === 0){
      console.log("rani.....");
    promisesealedrani.style.display = "none";
    begin1.style.display = "flex";
    reset();
  }
  } 
    
  

   //
 nextambBtn.onclick = () => {
   amb.style.display = "none";
   if(genderState === 1){
    promiseambraja.style.display = "flex";
   setTimeout(() => {
    promiseambraja.style.display = "none";
    promiseambrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promiseambrani.style.display = "flex";
    setTimeout(() => {
    promiseambrani.style.display = "none";
    promiseambranipress.style.display = "flex";
   },2000);
  }
   };
  promiseambranipress.onclick = () => {
    promiseambranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
   promiseambrajapress.onclick = () => {
    promiseambrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  }   
 //
   
  nextaedBtn.onclick = () => {
   aed.style.display = "none";
   if(genderState === 1){
    promiseaedraja.style.display = "flex";
   setTimeout(() => {
    promiseaedraja.style.display = "none";
    promiseaedrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promiseaedrani.style.display = "flex";
    setTimeout(() => {
    promiseaedrani.style.display = "none";
    promiseaedranipress.style.display = "flex";
   },2000);
  }
   };
  promiseaedranipress.onclick = () => {
    promiseaedranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
   promiseaedrajapress.onclick = () => {
    promiseaedrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  }  
   //late inactive next
   nextlateinactiveBtn.onclick = () => {
   lateinactive.style.display = "none";
   if(genderState === 1){
    promiselateinactiveraja.style.display = "flex";
   setTimeout(() => {
    promiselateinactiveraja.style.display = "none";
    promiselateinactiverajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promiselateinactiverani.style.display = "flex";
    setTimeout(() => {
    promiselateinactiverani.style.display = "none";
    promiselateinactiveranipress.style.display = "flex";
   },2000);
  }
   };
  promiselateinactiveranipress.onclick = () => {
    promiselateinactiveranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
   promiselateinactiverajapress.onclick = () => {
    promiselateinactiverajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  }   
   // latefast next
  nextlatefastBtn.onclick = () => {
   latefast.style.display = "none";
   if(genderState === 1){
    promiselatefastraja.style.display = "flex";
   setTimeout(() => {
    promiselatefastraja.style.display = "none";
    promiselatefastrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promiselatefastrani.style.display = "flex";
    setTimeout(() => {
    promiselatefastrani.style.display = "none";
    promiselatefastranipress.style.display = "flex";
   },2000);
  }
   };
  promiselatefastranipress.onclick = () => {
    promiselatefastranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
   promiselatefastrajapress.onclick = () => {
    promiselatefastrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  } 
   
   // lateslow
   
   nextlateslowBtn.onclick = () => {
   lateslow.style.display = "none";
   if(genderState === 1){
    promiselateslowraja.style.display = "flex";
   setTimeout(() => {
    promiselateslowraja.style.display = "none";
    promiselateslowrajapress.style.display = "flex";
   },2000); 
  }else if(genderState === 0){
    promiselateslowrani.style.display = "flex";
    setTimeout(() => {
    promiselateslowrani.style.display = "none";
    promiselateslowranipress.style.display = "flex";
   },2000);
  }
   };
  promiselateslowranipress.onclick = () => {
    promiselateslowranipress.style.display = "none";
    promisesealedrani.style.display = "flex";
  }
   promiselateslowrajapress.onclick = () => {
    promiselateslowrajapress.style.display = "none";
    promisesealedraja.style.display = "flex";
  } 
   
  
}
function addDigit(digit) {
    dialedNumber += digit;
    updateDisplay();
}

function deleteDigit() {
    dialedNumber = dialedNumber.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('dialDisplay');
    const callBtn = document.getElementById('callBtn');
    
    if (!display) return; // Safety check
    
    if (dialedNumber === '') {
        display.textContent = 'Dial a number';
        display.classList.add('empty');
        if (callBtn) callBtn.disabled = true;
    } else {
        display.textContent = dialedNumber;
        display.classList.remove('empty');
        if (callBtn) callBtn.disabled = false;
    }
}

function makeCall() {
    if (dialedNumber) {
        console.log('Calling', dialedNumber);
        alert('Calling ' + dialedNumber + '...');
        
        // Navigate to next screen after call
        // Uncomment when you have the next screen:
        // document.getElementById('dial112').style.display = 'none';
        // document.getElementById('nextScreen').style.display = 'flex';
    }
}

function draw() {
  if (listeningForResponse) {
    let vol = mic.getLevel();
    console.log("Volume:", vol);

    if (vol > 0.02) {
      console.log("hi");
      listeningForResponse = false;   // stop listening once detected
       clearTimeout(responseTimeout);
      responseTimeout = null;     
      document.dispatchEvent(new Event("voiceDetected"));
      checkresponse.style.display = "none";
      awake.style.display = "flex";
    }
   // listeningForResponse = false;   // stop listening once detected
  }
  if (!canvasActive) return;

  background("#FFC5B7");
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  //text(count, 300, 300);
  if(currentState === "play"){
    playScreen();
  }
}

function mousePressed(){
   pressed_time = millis() ;
  if(currentState == "play"){
    compression_count += 1;
    console.log(compression_count);
    //press_music.play();
    now = millis();
    if (lastTouchTime !== 0) {
      interval = now - lastTouchTime;
      let calculatedBPM = 60000 / interval;
      bpm = calculatedBPM;
      console.log(bpm);
  }
    lastTouchTime = now;
    handle_live();
  }
 
}

function playScreen(){
  image(playimg, width/2 ,height/2);
  image(heartimg,width * 0.9,height * 0.08);
 // static rect
  push();
  noStroke();
  fill("#EEEEEE");
  rect(122, 44, 210, 11, 11);
  pop();
  push();
  imageMode(CENTER);
  image(meterimg,78,48);
  pop();
  // show BPM text
  push();
  angleMode(RADIANS);
  translate(20, 48);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(23);
  // control the colour of bpm text
  fill(250,50,60);
  text(round(bpm), 0, 0);
  pop();
  
  //show compression count
  push();
  angleMode(RADIANS);
  translate(30,335);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(23);
  fill(0);
  // compression count display
  let numberToDisplay;
  if (compression_count === 0) 
  {
    numberToDisplay = 0;
  }else if (compression_count % 5 === 0) 
  {
    numberToDisplay = compression_count;
  }else {
  numberToDisplay = compression_count % 5;
  }
  text(numberToDisplay + " AND", 0, 0);
  pop();
  // live arrow
  push();
  translate(83,47);
  imageMode(CENTER);
  angleMode(DEGREES);
  rotate(angle);
  image(arrowimg,0,0);
  pop();
  //live rect
  progress-= 1;
  console.log(progress);
  progress = constrain(progress, 6, 210);
  push();
  noStroke();
  fill("#FF5058");
  rect(332, 44, -progress, 11, 11);
  pop();
  // controlling cheek and lip colour
  cheekOpacity = map(progress, 6, 210, 40, 255);
  lipOpacity = map(progress, 6, 210, 120, 255);
  // cheek circle1
  push();
  noStroke();
  fill(253, 175, 179, cheekOpacity);
  circle(width * 0.7, height * 0.2, 132);
  pop();
  // cheek circle1
  push();
  noStroke();
  fill(253, 175, 179, cheekOpacity);
  circle(width * 0.7, height * 0.8, 132);
  pop();
// DRAW MOUTH
  push();
  noStroke();
  fill(255, 124, 130, lipOpacity);
  ellipse(width * 0.82,height * 0.5,42,120);

  // learning about time passed since play started
 play_elapsed = millis()- play_start_time 
  // goodcompressions count
  diffGoal = maxTotalCompressions - good_compression;
  console.log(diffGoal);
   // display time left 
  push();
  angleMode(RADIANS);
  translate(30,600);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(20);
  fill(0)
  timeleft = task_time - play_elapsed;
  if(timeleft <0 )
    {
      timeleft = 0;
    }
  text(round((timeleft/1000),0)+"s",0,0);
  pop();
  push();
  angleMode(RADIANS);
  translate(52,600);
  rotate(-HALF_PI);
  textAlign(CENTER, TOP);
  textSize(18);
  fill(0)
  text("Time left",0,0);
  pop();
  // handle performance 
  handle_performance();
  // handle inactivity
  lastTouchElapsed = ((millis()-pressed_time ));
  console.log(lastTouchElapsed);
   handle_inactivity();
}
function handle_inactivity(){
 if( lastTouchElapsed >4000)
   {
     currentState = "lateinactive";
     p5Screen.style.display = "none";
    lateinactive.style.display = "flex";
    // lateaud.play();
     
   }
}
function handle_live()
{
  if(bpm<=120 && bpm>= 100){
    progress += goodfillRate;
    good_compression = good_compression+1;
    angle = 0;
  }else if(bpm>121){
    angle = 60;
    progress -=badfillRate;
    fastcount  = fastcount +1;
  }else if(bpm<100){
    angle = -60;
    progress -=badfillRate;
    slowcount  = slowcount +1;
  }
}
function handle_performance(){
  if(play_elapsed >= task_time)
    {

      if(diffGoal <= 5){
        currentState = "win";
        p5Screen.style.display = "none";
        win.style.display = "flex";

        //winaud.play();
        //win_music.play();
      }else if(diffGoal <= 8){
        currentState = "aed";
        p5Screen.style.display = "none";
        aed.style.display = "flex";
        //aedaud.play();
      }else if(diffGoal <= 10){
        currentState = "amb";
        p5Screen.style.display = "none";
        amb.style.display = "flex";
        //ambaud.play();
      }else if (diffGoal >= 20){
        if(fastcount>slowcount){
        currentState = "latefast";
        p5Screen.style.display = "none";
        late.style.display = "flex";
        }else
        if(slowcount>fastcount){
        currentState = "lateslow";
        p5Screen.style.display = "none";
        late.style.display = "flex";
        
        //lateaud.play();
        
      }
    }
}
}
function reset(){
  play_start_time = millis();
  good_compression = 0;
  compression_count =0;
  progress = 0;
  angle = 0;
  bpm = 0;
  lastTouchTime = 0;
  interval =0;
  response_time = 0;
  breathe_time = 0;
  cprtime = 0;
  cprtpass = 0;
  call_time = 0;
  breath_no = floor(random(11));
  //cpr2t = 0;
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function touchStarted() {
  mousePressed(); // Use the same logic
  return false; // Prevent default browser touch behavior
}
