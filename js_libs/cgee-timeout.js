//edit line 141 of index.htm to include:
//var lJSFiles = [  'assets/js/jquery-3.3.1.min.js','assets/js/CPM.js','assets/playbar/playbarScript.js','../analytics/cgee-timeout.js'];
var inactivityTimer = undefined;
var keypadtimer = "";
var keypadTime;

var oysterStatsObject;

//see if localStorage is available
function testForLocalStorage(){
   
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }
    
var canUseLocalStorage = testForLocalStorage();

function createLocalStorageObject(){

    if(localStorage.getItem("CGEE-OysterStats") == null){
         //first run; create this object and store it in local storage
        oysterStatsObject  = { connectDots: 0, wordSearch: 0, sheldon: 0, concentration: 0, credits:0, meetsTheEye:0 };
        localStorage.setItem("CGEE-OysterStats", JSON.stringify(oysterStatsObject));
    } else {
        //retrieve object from local storage
        oysterStatsObject  = JSON.parse(localStorage.getItem("CGEE-OysterStats"));
    }
}

createLocalStorageObject()





function incrementLifetimeStats(whichStat) {
    var theItem = oysterStatsObject[whichStat];
    if(theItem != undefined) {
       var tempVal = parseInt(theItem);
       //number of times this item has been viewed
       tempVal ++; //add one to the number
       oysterStatsObject[whichStat] = tempVal;
       localStorage.setItem("CGEE-OysterStats", JSON.stringify(oysterStatsObject));
    }

}
//EXAMPLE OF HOW TO USE IN CAPTIVATE: EXECUTE THE FOLLOWING JAVASCRIPT WHEN THE SLIDE LOADS
//incrementLifetimeStats("credits");


//get tracking data from LocalStorage
function getLifetimeStats(whichItem="CGEE-OysterStats") {
    //create object from local storage entry
    var allStats = JSON.parse(localStorage.getItem(whichItem));
    //create multidimensional array from object
    var statsArray = Object.entries(allStats)
    console.log(statsArray);

//loop through array and get the value of each entry
    for(var i=0; i<statsArray.length;i++){
        var theItem = statsArray[i];
        //returns an array such as: ["connectTheDots", 0]
        if(window.cpAPIInterface.getVariableValue(theItem[0]) != undefined){
            //set the value of this variable in Captivate
            window.cpAPIInterface.setVariableValue(theItem[0],theItem[1]);
        } else {
            console.log("variable not found in Captivate object: " + theItem[0]);
        }
    }

}


function resetTimer(evt){
    keypadtime = 0;
}


function createKeypadTimer(){
   if(keypadtimer ==""){
       keypadtimer  = setInterval(function(){ checkKeypadTimer() }, 1000);
       keypadTime = 0;
    }
}

function killKeypadTimer(){
    clearInterval(keypadtimer);
    keypadtimer = "";
    keypadTime = 0;
    console.log("keypad timer deleted");
}

function checkKeypadTimer(){
    keypadTime ++; 
    //add one to keypad timer
        // console.log(keypadTime);
    if(keypadTime >= 60 ){
        //one minute or more has passed on this screen; return to main menu
        killKeypadTimer();
        cpCmndGotoSlideAndResume = 0
        keypadTime = 0;
    }
}

/*
function checkKeypadTimer(){
    keypadTime ++; 
    //add one to keypad timer
    console.log(keypadtime);
    if(keypadTime >= 60 ){
        //one minute or more has passed on this screen; return to main menu
        cpCmndGotoSlideAndResume = 0
        //delete keypad timer
        killKeypadTimer();
        keypadTime = 0;
    }
}
*/

