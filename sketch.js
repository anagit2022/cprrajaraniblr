let genderState = null;   // 1 = Raja, 0 = Rani
let mic;
let listeningForResponse = false;
let responseTimeout = null;
let breath_no ;
let dialedNumber = ''; // <-- Dial Pad Variable
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
    // --- Screen Element Definitions (Kept as is) ---
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

    // --- Button Element Definitions (Kept as is) ---
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
    const wpromisepress = document.getElementById("wpromisepress");
    const wranipromisepress = document.getElementById("wranipromisepress");

    // ========================================
    // 📞 DIAL PAD LOGIC INSERTED HERE
    // ========================================

    // --- DIAL PAD Element Definitions ---
    const dialDisplay = document.getElementById("ambulance-number"); 
    const dialBtn0 = document.getElementById("dialBtn0");
    const dialBtn1 = document.getElementById("dialBtn1");
    const dialBtn2 = document.getElementById("dialBtn2");
    const dialBtn3 = document.getElementById("dialBtn3");
    const dialBtn4 = document.getElementById("dialBtn4");
    const dialBtn5 = document.getElementById("dialBtn5");
    const dialBtn6 = document.getElementById("dialBtn6");
    const dialBtn7 = document.getElementById("dialBtn7");
    const dialBtn8 = document.getElementById("dialBtn8");
    const dialBtn9 = document.getElementById("dialBtn9");
    const deleteBtnDial = document.getElementById("deleteBtnDial"); 

    // --- Core Dial Pad Functions ---

    /**
    * Checks the current dialed number and enables/disables the Call button.
    */
    const checkCallButtonState = () => {
        if (dialedNumber === "112") {
            callBtn.disabled = false;
            callBtn.style.opacity = 1.0; 
        } else {
            callBtn.disabled = true;
            callBtn.style.opacity = 0.5; 
        }
    };

    /**
    * Adds a digit to the dialed number string and updates the display.
    */
    const addDigit = (digit) => {
        // Limit to 3 digits for "112"
        if (dialedNumber.length < 3) { 
            dialedNumber += digit;
            dialDisplay.textContent = dialedNumber;
            dialDisplay.classList.remove("empty"); 
            checkCallButtonState(); 
        }
    };

    /**
    * Removes the last digit from the dialed number string and updates the display.
    */
    const deleteDigit = (e) => {
        if (e) e.preventDefault();
        dialedNumber = dialedNumber.slice(0, -1);
        
        if (dialedNumber.length === 0) {
            dialDisplay.textContent = "112"; // Placeholder text
            dialDisplay.classList.add("empty"); 
        } else {
            dialDisplay.textContent = dialedNumber;
        }
        checkCallButtonState(); 
    };

    /**
    * Sets up a button to call addDigit() on both 'click' and 'touchstart'.
    */
    const setupDialButton = (btnElement, digit) => {
        if (!btnElement) return;
        const handler = (e) => {
            if (e) e.preventDefault();
            addDigit(digit);
        };
        
        btnElement.addEventListener('click', handler);
        btnElement.addEventListener('touchstart', handler);
    };

    // --- Apply Listeners to All Digit Buttons ---
    setupDialButton(dialBtn0, '0');
    setupDialButton(dialBtn1, '1');
    setupDialButton(dialBtn2, '2');
    setupDialButton(dialBtn3, '3');
    setupDialButton(dialBtn4, '4');
    setupDialButton(dialBtn5, '5');
    setupDialButton(dialBtn6, '6');
    setupDialButton(dialBtn7, '7');
    setupDialButton(dialBtn8, '8');
    setupDialButton(dialBtn9, '9');

    // --- Apply Listeners to Delete Button ---
    deleteBtnDial.addEventListener('click', deleteDigit);
    deleteBtnDial.addEventListener('touchstart', deleteDigit);

    // --- Initialize Dial Pad State ---
    checkCallButtonState(); // Make sure the call button is disabled on load
    dialDisplay.textContent = "112"; // Set initial placeholder text
    dialDisplay.classList.add("empty"); 

    // ========================================
    // ⬆️ DIAL PAD LOGIC END
    // ========================================
    
    // --- P5.js Canvas Functions (Kept as is) ---
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
    
    // --- Corrected Event Listeners for Mobile Responsiveness (Your Existing Code) ---

    // Button: beginBtn
    const handleBegin = () => {
        begin1.style.display = "none";
        gender.style.display = "flex";
    };
    beginBtn.onclick = handleBegin;
    beginBtn.addEventListener('touchstart', handleBegin);

    // Button: rajaBtn
    const handleRaja = () => {
        genderState = 1; // ✔ Raja
        console.log("Gender:", genderState);
        introAudio.play();
        gender.style.display = "none";
        intro.style.display = "flex";
    };
    rajaBtn.onclick = handleRaja;
    rajaBtn.addEventListener('touchstart', handleRaja);

    // Button: raniBtn
    const handleRani = () => {
        genderState = 0; // ✔ Rani
        console.log("Gender:", genderState);
        introAudio.play();
        gender.style.display = "none";
        intro.style.display = "flex";
    };
    raniBtn.onclick = handleRani;
    raniBtn.addEventListener('touchstart', handleRani);

    // Button: startBtn
    const handleStart = () => {
        intro.style.display = "none";
        checkdanger.style.display = "flex";
        introAudio.pause();
        introAudio.currentTime = 0;
        checkdAudio.play();
    };
    startBtn.onclick = handleStart;
    startBtn.addEventListener('touchstart', handleStart);

    // Button: dyesBtn (Danger Yes)
    const handleDyes = () => {
        checkdAudio.pause();
        checkdAudio.currentTime = 0;
        checkrAudio.play();
        checkdanger.style.display = "none";
        checkresponse.style.display = "flex";
        listeningForResponse = true;
        // After 8 seconds → go to checkresponseq screen
        responseTimeout = setTimeout(() => {
            listeningForResponse = false;
            checkresponse.style.display = "none";
            checkresponseq.style.display = "flex";
            checkrAudio.pause();
            checkrAudio.currentTime = 0;
            did_spongy_respond.play();
        }, 8000);
    };
    dyesBtn.onclick = handleDyes;
    dyesBtn.addEventListener('touchstart', handleDyes);

    // Button: dnoBtn (Danger No)
    const handleDno = () => {
        checkdAudio.pause();
        checkdAudio.currentTime = 0;
        dnotsafeAudio.play();
        checkdanger.style.display = "none";
        dnotsafeq.style.display = "flex";
    };
    dnoBtn.onclick = handleDno;
    dnoBtn.addEventListener('touchstart', handleDno);

    // Button: nowsafeBtn
    const handleNowSafe = () => {
        dnotsafeAudio.pause();
        dnotsafeAudio.currentTime = 0;
        dnotsafeq.style.display = "none";
        checkresponse.style.display = "flex";
        listeningForResponse = true;
        // After 4 seconds → go to checkresponseq screen
        responseTimeout = setTimeout(() => {
            listeningForResponse = false;
            checkresponse.style.display = "none";
            checkresponseq.style.display = "flex";
        }, 4000);
    };
    nowsafeBtn.onclick = handleNowSafe;
    nowsafeBtn.addEventListener('touchstart', handleNowSafe);

    // Button: cantsafeBtn
    const handleCantSafe = () => {
        dnotsafeAudio.pause();
        dnotsafeAudio.currentTime = 0;
        cantdsafe.play();
        dnotsafeq.style.display = "none";
        dcantsafe.style.display = "flex";
    };
    cantsafeBtn.onclick = handleCantSafe;
    cantsafeBtn.addEventListener('touchstart', handleCantSafe);

    // Button: nextpBtn (from dcantsafe)
    const handleNextP = () => {
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
        } else if(genderState === 0){
            promisedrani.style.display = "flex";
            setTimeout(() => {
                promisedrani.style.display = "none";
                promisedranipress.style.display = "flex";
            },2000);
        }
    };
    nextpBtn.onclick = handleNextP;
    nextpBtn.addEventListener('touchstart', handleNextP);

    // Button: dpromisepress (Promise Sealed Raja - Danger)
    const handleDPromisePress = () => {
        promisedaud.pause();
        promisedaud.currentTime = 0;
        promisejingle.play();
        // Assuming 'test.play()' is another audio cue
        // test.play(); 
        promisedrajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    dpromisepress.onclick = handleDPromisePress;
    dpromisepress.addEventListener('touchstart', handleDPromisePress);

    // Button: dranipromisepress (Promise Sealed Rani - Danger)
    const handleDRaniPromisePress = () => {
        promisedaud.pause();
        promisedaud.currentTime = 0;
        promisejingle.play();
        // Assuming 'test.play()' is another audio cue
        // test.play();
        promisedranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    dranipromisepress.onclick = handleDRaniPromisePress;
    dranipromisepress.addEventListener('touchstart', handleDRaniPromisePress);
    
    // NOTE: ryesBtn is missing a definition in your original code, 
    // but the next screen (awake) is controlled by 'voiceDetected' event or timeout.

    // Button: nextBtn (from awake)
    const handleNext = () => {
        awake.style.display = "none";
        responded.style.display = "flex";
    };
    nextBtn.onclick = handleNext;
    nextBtn.addEventListener('touchstart', handleNext);

    // Button: nextprBtn (from responded)
    const handleNextPR = () => {
        responded.style.display = "none";
        if(genderState === 1){
            promiserraja.style.display = "flex";
            setTimeout(() => {
                promiserraja.style.display = "none";
                promiserrajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promiserrani.style.display = "flex";
            setTimeout(() => {
                promiserrani.style.display = "none";
                promiserranipress.style.display = "flex";
            },2000);
        }
    };
    nextprBtn.onclick = handleNextPR;
    nextprBtn.addEventListener('touchstart', handleNextPR);

    // Button: rranipromisepress (Promise Sealed Rani - Response)
    const handleRRaniPromisePress = () => {
        promiserranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    rranipromisepress.onclick = handleRRaniPromisePress;
    rranipromisepress.addEventListener('touchstart', handleRRaniPromisePress);

    // Button: rrajapromisepress (Promise Sealed Raja - Response)
    const handleRRajaPromisePress = () => {
        promiserrajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    rrajapromisepress.onclick = handleRRajaPromisePress;
    rrajapromisepress.addEventListener('touchstart', handleRRajaPromisePress);

    // Button: rnoBtn (Response No)
    const handleRno = () => {
        did_spongy_respond.pause();
        did_spongy_respond.currentTime = 0;
        check_if_breathing.play();
        checkresponseq.style.display = "none";
        awake.style.display = "none";
        checkbreathing.style.display = "flex";
        console.log(breath_no);
        if(breath_no % 3 === 0) {
            // Assuming gaspAudio is defined elsewhere
            // gaspAudio.play(); 
            console.log(10);
        } else if (breath_no % 5 === 0){
            // Assuming normalbreathAudio is defined elsewhere
            // normalbreathAudio.play(); 
            console.log(20);
        }
        setTimeout(() => {
            checkbreathing.style.display = "none";
            checkbreathingq.style.display = "flex";
            could_you_see_breathing.play();
        },10000);
    };
    rnoBtn.onclick = handleRno;
    rnoBtn.addEventListener('touchstart', handleRno);

    // Button: bnoBtn (Breathing No)
    const handleBno = () => {
        could_you_see_breathing.pause();
        could_you_see_breathing.currentTime=0;
        requestaedaud.play();
        checkbreathingq.style.display = "none";
        requestaed.style.display = "flex";
    };
    bnoBtn.onclick = handleBno;
    bnoBtn.addEventListener('touchstart', handleBno);

    // Button: byesBtn (Breathing Yes)
    const handleByes = () => {
        breathingtype.play();
        could_you_see_breathing.pause();
        could_you_see_breathing.currentTime=0;
        checkbreathingq.style.display = "none";
        checkbreathingtypeq.style.display = "flex";
    };
    byesBtn.onclick = handleByes;
    byesBtn.addEventListener('touchstart', handleByes);

    // Button: normalBtn (Normal Breathing)
    const handleNormal = () => {
        breathingtype.pause();
        breathingtype.currentTime = 0;
        checkbreathingtypeq.style.display = "none";
        normalbreathing.style.display = "flex";
    };
    normalBtn.onclick = handleNormal;
    normalBtn.addEventListener('touchstart', handleNormal);

    // Button: abnormalBtn (Abnormal Breathing)
    const handleAbnormal = () => {
        breathingtype.pause();
        breathingtype.currentTime = 0;
        requestaedaud.play();
        checkbreathingtypeq.style.display = "none";
        requestaed.style.display = "flex";
    };
    abnormalBtn.onclick = handleAbnormal;
    abnormalBtn.addEventListener('touchstart', handleAbnormal);

    // Button: nextvBtn (from normalbreathing)
    const handleNextV = () => {
        normalbreathing.style.display = "none";
        if(genderState === 1){
            promisebraja.style.display = "flex";
            setTimeout(() => {
                promisebraja.style.display = "none";
                promisebrajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promisebrani.style.display = "flex";
            setTimeout(() => {
                promisebrani.style.display = "none";
                promisebranipress.style.display = "flex";
            },2000);
        }
    };
    nextvBtn.onclick = handleNextV;
    nextvBtn.addEventListener('touchstart', handleNextV);

    // Button: branipromisepress (Promise Sealed Rani - Breathing)
    const handleBRaniPromisePress = () => {
        promisebranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    branipromisepress.onclick = handleBRaniPromisePress;
    branipromisepress.addEventListener('touchstart', handleBRaniPromisePress);

    // Button: bpromisepress (Promise Sealed Raja - Breathing)
    const handleBPromisePress = () => {
        promisebrajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    bpromisepress.onclick = handleBPromisePress;
    bpromisepress.addEventListener('touchstart', handleBPromisePress);

    // Button: nextaBtn (Call for help/AED)
    const handleNextA = () => {
        call112.play();
        requestaedaud.pause();
        requestaedaud.currentTime = 0;
        requestaed.style.display = "none";
        dial112.style.display = "flex";
    };
    nextaBtn.onclick = handleNextA;
    nextaBtn.addEventListener('touchstart', handleNextA);

    // Button: callBtn (on dial112 screen)
    // **UPDATED**: Checks if the button is disabled by the dial pad logic
    const handleCall = () => {
        if (callBtn.disabled) return; // Prevent action if 112 is not dialed
        call112.pause();
        call112.currentTime = 0;
        dial112.style.display = "none";
        addspeaker.style.display = "flex";
    };
    callBtn.onclick = handleCall;
    callBtn.addEventListener('touchstart', handleCall);

    // Button: speakerbtn (on addspeaker screen)
    const handleSpeaker = () => {
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
    };
    speakerbtn.onclick = handleSpeaker;
    speakerbtn.addEventListener('touchstart', handleSpeaker);


    // CPR Instructions Navigation

    // Button: nextc1
    const handleNextC1 = () => {
        clearTimeout(t1);
        cpr1.style.display = "none";
        cpr2.style.display = "flex";
    };
    nextc1.onclick = handleNextC1;
    nextc1.addEventListener('touchstart', handleNextC1);

    // Button: nextc2
    const handleNextC2 = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        cpr2.style.display = "none";
        cpr3.style.display = "flex";
    };
    nextc2.onclick = handleNextC2;
    nextc2.addEventListener('touchstart', handleNextC2);

    // Button: nextc3
    const handleNextC3 = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        cpr3.style.display = "none";
        cpr4.style.display = "flex";
    };
    nextc3.onclick = handleNextC3;
    nextc3.addEventListener('touchstart', handleNextC3);

    // Button: nextc4
    const handleNextC4 = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        cpr4.style.display = "none";
        cpr5.style.display = "flex";
    };
    nextc4.onclick = handleNextC4;
    nextc4.addEventListener('touchstart', handleNextC4);

    // Button: startcpr (Go to P5.js Play Screen)
    const handleStartCPR = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        cpr5.style.display = "none";
        p5Screen.style.display = "flex";
        startCanvas(); // Starts the p5.js sketch
        currentState = "play";
        play_start_time = millis();
    };
    startcpr.onclick = handleStartCPR;
    startcpr.addEventListener('touchstart', handleStartCPR);

    // --- End Screen Logic ---

    // Button: nextwinBtn (from win)
    const handleNextWin = () => {
        win.style.display = "none";
        if(genderState === 1){
            promisewraja.style.display = "flex";
            setTimeout(() => {
                promisewraja.style.display = "none";
                promisewrajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promisewrani.style.display = "flex";
            setTimeout(() => {
                promisewrani.style.display = "none";
                promisewranipress.style.display = "flex";
            },2000);
        }
    };
    nextwinBtn.onclick = handleNextWin;
    nextwinBtn.addEventListener('touchstart', handleNextWin);

    // Button: wranipromisepress (Promise Sealed Rani - Win)
    const handleWRaniPromisePress = () => {
        promisewranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    wranipromisepress.onclick = handleWRaniPromisePress;
    wranipromisepress.addEventListener('touchstart', handleWRaniPromisePress);

    // Button: wpromisepress (Promise Sealed Raja - Win)
    const handleWPromisePress = () => {
        promisewrajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    wpromisepress.onclick = handleWPromisePress;
    wpromisepress.addEventListener('touchstart', handleWPromisePress);

    // Button: practiceagainbtnraja (Go to Start)
    const handlePracticeAgainRaja = () => {
        console.log("raja.....");
        promisesealedraja.style.display = "none";
        begin1.style.display = "flex";
        reset();
    };
    practiceagainbtnraja.onclick = handlePracticeAgainRaja;
    practiceagainbtnraja.addEventListener('touchstart', handlePracticeAgainRaja);

    // Button: practiceagainbtnrani (Go to Start)
    const handlePracticeAgainRani = () => {
        console.log("rani.....");
        promisesealedrani.style.display = "none";
        begin1.style.display = "flex";
        reset();
    };
    practiceagainbtnrani.onclick = handlePracticeAgainRani;
    practiceagainbtnrani.addEventListener('touchstart', handlePracticeAgainRani);

    // Button: nextambBtn (from amb)
    const handleNextAmb = () => {
        amb.style.display = "none";
        if(genderState === 1){
            promiseambraja.style.display = "flex";
            setTimeout(() => {
                promiseambraja.style.display = "none";
                promiseambrajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promiseambrani.style.display = "flex";
            setTimeout(() => {
                promiseambrani.style.display = "none";
                promiseambranipress.style.display = "flex";
            },2000);
        }
    };
    nextambBtn.onclick = handleNextAmb;
    nextambBtn.addEventListener('touchstart', handleNextAmb);

    // Button: promiseambranipress
    const handleAmbRaniPromisePress = () => {
        promiseambranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    promiseambranipress.onclick = handleAmbRaniPromisePress;
    promiseambranipress.addEventListener('touchstart', handleAmbRaniPromisePress);

    // Button: promiseambrajapress
    const handleAmbRajaPromisePress = () => {
        promiseambrajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    promiseambrajapress.onclick = handleAmbRajaPromisePress;
    promiseambrajapress.addEventListener('touchstart', handleAmbRajaPromisePress);

    // Button: nextaedBtn (from aed)
    const handleNextAed = () => {
        aed.style.display = "none";
        if(genderState === 1){
            promiseaedraja.style.display = "flex";
            setTimeout(() => {
                promiseaedraja.style.display = "none";
                promiseaedrajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promiseaedrani.style.display = "flex";
            setTimeout(() => {
                promiseaedrani.style.display = "none";
                promiseaedranipress.style.display = "flex";
            },2000);
        }
    };
    nextaedBtn.onclick = handleNextAed;
    nextaedBtn.addEventListener('touchstart', handleNextAed);

    // Button: promiseaedranipress
    const handleAedRaniPromisePress = () => {
        promiseaedranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    promiseaedranipress.onclick = handleAedRaniPromisePress;
    promiseaedranipress.addEventListener('touchstart', handleAedRaniPromisePress);

    // Button: promiseaedrajapress
    const handleAedRajaPromisePress = () => {
        promiseaedrajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    promiseaedrajapress.onclick = handleAedRajaPromisePress;
    promiseaedrajapress.addEventListener('touchstart', handleAedRajaPromisePress);

    // Button: nextlateinactiveBtn (from lateinactive)
    const handleNextLateInactive = () => {
        lateinactive.style.display = "none";
        if(genderState === 1){
            promiselateinactiveraja.style.display = "flex";
            setTimeout(() => {
                promiselateinactiveraja.style.display = "none";
                promiselateinactiverajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promiselateinactiverani.style.display = "flex";
            setTimeout(() => {
                promiselateinactiverani.style.display = "none";
                promiselateinactiveranipress.style.display = "flex";
            },2000);
        }
    };
    nextlateinactiveBtn.onclick = handleNextLateInactive;
    nextlateinactiveBtn.addEventListener('touchstart', handleNextLateInactive);

    // Button: promiselateinactiveranipress
    const handleLateInactiveRaniPromisePress = () => {
        promiselateinactiveranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    promiselateinactiveranipress.onclick = handleLateInactiveRaniPromisePress;
    promiselateinactiveranipress.addEventListener('touchstart', handleLateInactiveRaniPromisePress);

    // Button: promiselateinactiverajapress
    const handleLateInactiveRajaPromisePress = () => {
        promiselateinactiverajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    promiselateinactiverajapress.onclick = handleLateInactiveRajaPromisePress;
    promiselateinactiverajapress.addEventListener('touchstart', handleLateInactiveRajaPromisePress);

    // Button: nextlatefastBtn (from latefast)
    const handleNextLateFast = () => {
        latefast.style.display = "none";
        if(genderState === 1){
            promiselatefastraja.style.display = "flex";
            setTimeout(() => {
                promiselatefastraja.style.display = "none";
                promiselatefastrajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promiselatefastrani.style.display = "flex";
            setTimeout(() => {
                promiselatefastrani.style.display = "none";
                promiselatefastranipress.style.display = "flex";
            },2000);
        }
    };
    nextlatefastBtn.onclick = handleNextLateFast;
    nextlatefastBtn.addEventListener('touchstart', handleNextLateFast);

    // Button: promiselatefastranipress
    const handleLateFastRaniPromisePress = () => {
        promiselatefastranipress.style.display = "none";
        promisesealedrani.style.display = "flex";
    };
    promiselatefastranipress.onclick = handleLateFastRaniPromisePress;
    promiselatefastranipress.addEventListener('touchstart', handleLateFastRaniPromisePress);

    // Button: promiselatefastrajapress
    const handleLateFastRajaPromisePress = () => {
        promiselatefastrajapress.style.display = "none";
        promisesealedraja.style.display = "flex";
    };
    promiselatefastrajapress.onclick = handleLateFastRajaPromisePress;
    promiselatefastrajapress.addEventListener('touchstart', handleLateFastRajaPromisePress);

    // Button: nextlateslowBtn (from lateslow)
    const handleNextLateSlow = () => {
        lateslow.style.display = "none";
        if(genderState === 1){
            promiselateslowraja.style.display = "flex";
            setTimeout(() => {
                promiselateslowraja.style.display = "none";
                promiselateslowrajapress.style.display = "flex";
            },2000);
        } else if(genderState === 0){
            promiselateslowrani.style.display = "flex";
            setTimeout(() => {
                promiselateslowrani.style.display = "none";
                promiselateslowranipress.style.display = "flex";
            },2000);
        }
    };
    nextlateslowBtn.onclick = handleNextLateSlow;
    nextlateslowBtn.addEventListener('touchstart', handleNextLateSlow);
}; // End of window.onload
