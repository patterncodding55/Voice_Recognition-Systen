// step four
// vars and elements
const turn_on = document.querySelector("#turn_on");
const jarvis_intro = document.querySelector("#j_intro");
const time = document.querySelector("#time");
const machine = document.querySelector(".machine");
const msgs = document.querySelector(".messages");
// whether the recognition is stopiing on my command or automatically
let stopingR = false;
// Controller commands
let ControllerCom = [];
ControllerCom.push("hi Controller");
ControllerCom.push("what are your commands");
ControllerCom.push("close this - to close opened popups");
ControllerCom.push(
  "change my information - information regarding your acoounts and you"
);
ControllerCom.push("whats the weather or temperature");
ControllerCom.push("show the full weather report");
ControllerCom.push("are you there - to check controller presence");
ControllerCom.push("shut down - stop voice recognition");
ControllerCom.push("open google");
ControllerCom.push('search for "your keywords" - to search on google ');
ControllerCom.push("open whatsapp");
ControllerCom.push("open youtube");
ControllerCom.push('play "your keywords" - to search on youtube ');
ControllerCom.push("close this youtube tab - to close opened youtube tab");
ControllerCom.push("open firebase");
ControllerCom.push("open netlify");
ControllerCom.push("open twitter");
ControllerCom.push("open my twitter profile");
ControllerCom.push("open instagram");
ControllerCom.push("open my instagram profile");
ControllerCom.push("open github");
ControllerCom.push("open my github profile");

// youtube window
let ytbWindow;

// create a new message
function createMsg(who, msg) {
  let newmsg = document.createElement("p");
  newmsg.innerText = msg;
  newmsg.setAttribute("class", who);
  msgs.appendChild(newmsg);
}

// show a warn to check for all the commands
console.warn('*to check for the commands speak "what are your commands"');

// step nine
// date and time
let date = new Date();
let hrs = date.getHours();
let mins = date.getMinutes();
let secs = date.getSeconds();

// this is what Controller tells about weather
let weatherStatement = "";
let charge,chargeStatus, connectivity, currentTime
chargeStatus = "unplugged"

// step twelve
// window to load properties and displays

 
window.onload = () => {
  turn_on.play();
  turn_on.addEventListener("onend", () => {
    setTimeout(() => { 
      autoJarvis();
      readOut("Ready to go sir");

      if (localStorage.getItem("jarvis_setup") === null) {
        readOut(
          "Sir, kindly fill out the form on your screen so that you could access most of my features and if you want to see my commands see a warning in the console"
        );
      }
    }, 200);
  });

  ControllerCom.forEach((e) => {
    document.querySelector(".commands").innerHTML += `<p>#${e}</p><br />`;
  });
  // step ten
  // battery setup
  let batteryPromise = navigator.getBattery();
  batteryPromise.then(batteryCallback);

  // step eleven
  // internet connectivity.  checking when am online

    if(navigator.onLine){
      document.querySelector("#internet").textContent = "online"
      connectivity = "online"
    } else {
      document.querySelector("#internet").textContent = "offline"
      connectivity = "offline"
    }

  setInterval(() => {
    if(navigator.onLine){
      document.querySelector("#internet").textContent = "online"
      connectivity = "online"
    } else {
      document.querySelector("#internet").textContent = "offline"
      connectivity = "offline"
    }  
  }, 60000);

  // setting up the battery objects
  function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject);
    setInterval(() => {
      printBatteryStatus(batteryObject);
    }, 5000);
  }
  function printBatteryStatus(batteryObject) {
    document.querySelector("#battery").textContent = `${
      (batteryObject.level * 100).toFixed(2)
    }%`;
    charge = batteryObject.level * 100
    if (batteryObject.charging === true) {
      document.querySelector(".battery").style.width = "200px";
      document.querySelector("#battery").textContent = `${
        (batteryObject.level * 100).toFixed(1)
      }% Charging`;
      chargeStatus = "plugged in"
    }
    if(batteryObject.charging == false){
      document.querySelector(".battery").style.width = "200px";
      document.querySelector("#battery").textContent = `${
        (batteryObject.level * 100).toFixed (0) 
      }% Not charging`;
      chargeStatus = "plugged in"
    }
  }

  // timer
  // setInterval(() => {
  //   let date = new Date();
  //   let hrs = date.getHours();
  //   let mins = date.getMinutes();
  //   let secs = date.getSeconds();
  //   time.textContent = `${hrs} : ${mins} : ${secs}`;
  // }, 1000);
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  currentTime = strTime
  time.textContent = strTime
}

formatAMPM(date)
setInterval(() => {
  formatAMPM(date)
}, 60000);

// auto Controller

function autoJarvis() {
  setTimeout(() => {
    recognition.start();
  }, 1000);
}

// step six
// staering controller
document.querySelector("#start_jarvis_btn").addEventListener("click", () => {
  recognition.start();
})

// step six
// stopping controller
document.querySelector("#stop_jarvis_btn").addEventListener("click", () => {
  stopingR = true;
  recognition.stop();
})  

// show waether
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}

// convert kelvin to celcius
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}

if (localStorage.getItem("jarvis_setup") !== null) {
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
}

// Controller information setup

const setup = document.querySelector(".jarvis_setup");
setup.style.display = "none";
if (localStorage.getItem("jarvis_setup") === null) {
  setup.style.display = "flex";
  setup.querySelector("button").addEventListener("click", userInfo);
}

function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    instagram: setup.querySelectorAll("input")[3].value,
    twitter: setup.querySelectorAll("input")[4].value,
    github: setup.querySelectorAll("input")[5].value,
  };

  let testArr = [];

  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

  if (testArr.includes("")) {
    readOut("sir enter your complete information");
  } else {
    localStorage.clear();
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    weather(JSON.parse(localStorage.getItem("jarvis_setup")).location);
  }
}

// step one
//setting up the speach recognition API found in the browser
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

  // step two
const recognition = new SpeechRecognition();
// step seven
// making the recognition to continue without stopping only supported in edge
recognition.continuous = true;

var synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance();

// step three
// recognition onstart
recognition.onstart = function () {
  console.log("voice recognition activated");
  readOut("I'm Controller created by Chinedu patterson. how may i help you");
  document.querySelector("#stop_jarvis_btn").style.display = "flex"
};

// arr of window
let windowsB = []

// step eight
// setup the speaking back oneresilt
recognition.onresult = function (event) {
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript;
  transcript = transcript.toLowerCase();
  let userData = localStorage.getItem("jarvis_setup");
  console.log(`my words : ${transcript}`);
  // adding the messages
  createMsg("usermsg", transcript)
  
// Searching and opening commands
        if (transcript.includes("hi controller")|| 
        (transcript.includes("hi kontrola") || 
        (transcript.includes("hi my project") || 
        (transcript.includes("hello controller")||
        (transcript.includes("hello control a")))))) {
            readOut("hello sir how may i help you");
        }
  // some casual commands
  if (transcript.includes("what is the current charge")) {
    readOut(`the current charge is ${charge}`);
  }
  if (transcript.includes("what's the charging status")) {
    readOut(`the current charging status is ${chargeStatus}`);
  }
  if (transcript.includes("what is the time")) {
    readOut(currentTime);
  }
  if (transcript.includes("connection status")) {
    readOut(`you are ${connectivity} sir`);
  }
  // jarvis commands
  if (transcript.includes("what are your commands")) {
    readOut("sir here's the list of commands i can follow");
    if(window.innerWidth <= 400 ){
      window.resizeTo(screen.width,screen.height)
    }
    document.querySelector(".commands").style.display = "block";
  }
  // jarvis bio
  if (transcript.includes("Tell about yourself")) {
    readOut(
   "sir, i am a controleer, a voice asistant made for browsers using javascript by Chinedum Patterson. I can do anything which can be done from a browser."
    );
  }

  // close popups
  if (transcript.includes("close this")) {
    readOut("closing the tab sir");
    document.querySelector(".commands").style.display = "none";
    // if(window.innerWidth >= 401 ){
    //   window.resizeTo(250,250)
    // }
    setup.style.display = "none";
  }

  // info change
  if (transcript.includes("change my information")) {
    readOut("Opening the information tab sir");
    localStorage.clear();
    
    if(window.innerWidth <= 400 ){
      window.resizeTo(screen.width,screen.height)
    }
    setup.style.display = "flex";
    setup.querySelector("button").addEventListener("click", userInfo);
  }

  
  // weather report
  if (
    transcript.includes("what is the temperature")
  ) {
    readOut(weatherStatement);
  }

  if (transcript.includes("full weather report")) {
    readOut("opening the weather report sir");
    let a = window.open(
      `https://www.google.com/search?q=weather+in+${
        JSON.parse(localStorage.getItem("jarvis_setup")).location
      }`
    );
    windowsB.push(a)
  }
  // availability check
  if (transcript.includes("are you there")) {
    readOut("yes sir, am always here for you sir, how may i help you");
  }
  // close voice recognition
  if (transcript.includes("shut down")) {
    readOut("Ok sir i will take a nap");
    stopingR = true;
    recognition.stop();
  }

// whatsapp

// if (transcript.includes("open my whatsapp account")) {
//   readOut("opening your whatsapp account sir");
//   let a = window.open("https://web.whatsapp.com/");
//   windowsB.push(a)
// }

  if (transcript.includes("open whatsapp")) {
    readOut("opening whatsapp");
    let a = window.open("https://web.whatsapp.com/");
    windowsB.push(a)
  }
// netlify
  if (transcript.includes("open netlify")) {
    readOut("opening netlify");
    let a = window.open("https://app.netlify.com/");
    windowsB.push(a)
  }
// spotify
  if (transcript.includes("open spotify")) {
    readOut("opening spotify");
    let a = window.open("https://open.spotify.com/");
    windowsB.push(a)
  }


  // firebase

  if (transcript.includes("open fire base") && transcript.includes("account")) {
    readOut("opening firebase console");
    let accId = transcript;
    accId = accId.split("");
    accId.pop();
    accId = accId[accId.length - 1];
    console.log(`accId: ${accId}`);
    // https://console.firebase.google.com/u/0/
    let a = window.open(`https://console.firebase.google.com/u/${accId}/`);
    windowsB.push(a)
  }

  // canva

  if (transcript.includes("open my canva designs")) {
    readOut("opening canva designs");
    window.open("https://www.canva.com/folder/all-designs");
  }

  if (transcript.includes("open canva") || transcript.includes("open camera")) {
    readOut("opening canva");
    window.open("https://www.google.com/");
  }

  // userdata access commands

  if (transcript.includes("what's my name")) {
    readOut(`Sir, I know that you are ${JSON.parse(userData).name}`);
  }
  if (transcript.includes("what's my bio")) {
    readOut(`Sir, I know that you are ${JSON.parse(userData).bio}`);
  }

  // google

  if (transcript.includes("open google")) {
    readOut("opening google");
    let a = window.open("https://www.google.com/");
    windowsB.push(a)
  }

  //   google searching command
  if(transcript.includes("search for")){
    readOut("here's the result sir")
    let input =  transcript.split("");
    // let's remove the saarch in the array functions
    input.splice(0,11);
    // removing the last fullstaop
    input.pop();
    // joining the rest
    // input = input.join("");
// perfect way to get short links on goole is:
// googl.com/search?qi+yoursearch+othersearc is there's any
    input = input.join("").split(" ").join("+")
    console.log(input);
    window.open(`https://www.google.com/search?q=${input}`)
}

  // if (transcript.includes("search for")) {
  //   readOut("here's your result");
  //   let input = transcript.split("");
  //   input.splice(0, 11);
  //   input.pop();
  //   input = input.join("").split(" ").join("+");
  //   let a = window.open(`https://www.google.com/search?q=${input}`);
  //   windowsB.push(a)
  // }

  // youtube
  if (transcript.includes("open youtube")) {
    readOut("opening youtube sir");
    let a = window.open("https://www.youtube.com/");
    windowsB.push(a)
  }

  if (transcript.includes("play")) {
    let playStr = transcript.split("");
    playStr.splice(0, 5);
    let videoName = playStr.join("");
    playStr = playStr.join("").split(" ").join("+");
    readOut(`searching youtube for ${videoName}`);
    let a = window.open(`https://www.youtube.com/search?q=${playStr}`
    );
    windowsB.push(a)
  }


  // instagram
  if (transcript.includes("open instagram")) {
    readOut("opening instagram sir");
    let a =window.open("https://www.instagram.com");
    windowsB.push(a)
  }
  if (transcript.includes("open my instagram profile")) {
    if (JSON.parse(userData).instagram) {
      readOut("opening your instagram profile");
      let a =window.open(
        `https://www.instagram.com/${JSON.parse(userData).instagram}/`
      );
      windowsB.push(a)
    } else {
      readOut("sir i didn't found your instagram information");
    }
  }
  // twitter
  if (transcript.includes("open my twitter profile")) {
    readOut("opening your twitter profile");
    let a=window.open(`https://twitter.com/${JSON.parse(userData).twitter}`);
    windowsB.push(a)
  }
  if (transcript.includes("open twitter")) {
    readOut("opening twitter sir");
    let a = window.open(`https://twitter.com/`);
    windowsB.push(a)
  }

  // github
  if (transcript.includes("open my github profile")) {
    readOut("opening your github profile");
    let a = window.open(`https://github.com/${JSON.parse(userData).github}`);
    windowsB.push(a)
  }
  if (transcript.includes("open github")) {
    readOut("opening github");
    let a = window.open("https://github.com/");
    windowsB.push(a)
  }
  // facebook
  if(transcript.includes("open facebook")){
    readOut("opening your facebook account sir");
    window.open("https://web.facebook.com/?_rdc=1&_rdr");
}

  // close all opened tabs
  if (transcript.includes("close all tabs")) {
    readOut("closing all tabs sir")
    windowsB.forEach((e) => {
      e.close()
    })

  }

}



// step four
// recognition onend
recognition.onend = function () {
  if (stopingR === false) {
    setTimeout(() => {
      recognition.start();
    }, 500);
  } else if (stopingR === true) {
    recognition.stop();
    document.querySelector("#stop_jarvis_btn").style.display = "none"
  }
};

// step seven
// controller speaking out
function readOut(message) {
 // API called speech ulterance. copy it and paste on console
  const speech = new SpeechSynthesisUtterance();
  // different voices
  const allVoices = speechSynthesis.getVoices()
  speech.text = message;
  // setting up the voice
  // speech.voice = allVoices[0];
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
  console.log("Speaking out");
  createMsg("jmsg", message);
}

// // for the voice to be permanent
// window.onload = function() {
//   readOut(" ")
// }


// small jarvis
const smallJarvis = document.querySelector("#small_jarvis")

smallJarvis.addEventListener("click", () => {
  window.open(`${window.location.href}`,"newWindow","menubar=true,location=true,resizable=false,scrollbars=false,width=200,height=200,top=0,left=0")
  window.close()
})



document.querySelector("#jarvis_start").addEventListener("click", () => {
  recognition.start()
})

