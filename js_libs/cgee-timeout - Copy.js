var inactivityTimer = undefined;
var keypadtimer;
var keypadTime;

var oysterStatsObject;

//TODO: see if localStorage is available

if(localStorage.getItem("CGEE-OysterStats") == null){
    //first run; create this object and store it in local storage
    oysterStatsObject  = { connectDots: 0, wordSearch: 0, sheldon: 0, concentration: 0, credits:0, meetsTheEye:0 };
    localStorage.setItem("CGEE-OysterStats", JSON.stringify(oysterStatsObject));
} else {
    //retrieve object from local storage
    oysterStatsObject  = JSON.parse(localStorage.getItem("CGEE-OysterStats"));
}


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


function createTimer(){
    inactivityTimer  = setInterval(function(){ checkVideoEnded() }, 1000);
}
    
function killTimer(){
    clearInterval(inactivityTimer);
    console.log("CGEE inactivity timer deleted");
}
            
function checkVideoEnded(){
    console.log("video ended = " + document.getElementsByTagName("video")[0].ended);
        if(document.getElementsByTagName("video")[0].ended){
                    //video has finished playing; return to main menu
                    cpCmndGotoSlideAndResume = 0
                    //delete inactivityTimer
                    killTimer();
                    }
                }

//get tracking data from LocalStorage
function getLifetimeStats(whichItem) {
    var theVal = "";
    var kioskArray = [];
    		if(whichItem){
                //get and return the value for whichItem only
                var theItem = "CGEE-OysterStats" + whichItem;
                theVal = localStorage.getItem(theItem);
                    if(!theVal){ 
                        localStorage.setItem(theItem, "0");
                        theVal = localStorage.getItem(theItem);
                    }
                    //return theVal;
                    window.whichItem = theVal;
                } else {
                //get and return an array with values for all items
                theVal = localStorage.getItem("kioskStatsVideo01");
                if(!theVal){
                    theVal = localStorage.setItem("kioskStatsVideo01","0");
                    theVal = "0";
                }
                kioskArray.push(theVal);
                window.Video01 = theVal;
                theVal = localStorage.getItem("kioskStatsVideo02");
                if(!theVal){
                    theVal = localStorage.setItem("kioskStatsVideo02","0");
                    theVal = "0";
                }
                kioskArray.push(theVal);
                window.Video02 = theVal;
                
                theVal = localStorage.getItem("kioskStatsVideo03");
                
                if(!theVal){
                    theVal = localStorage.setItem("kioskStatsVideo03","0");
                    theVal = "0";
                }
                kioskArray.push(theVal); 
                window.Video03 = theVal;
                
                theVal = localStorage.getItem("kioskStatsVideo04");
                if(!theVal){
                    theVal = localStorage.setItem("kioskStatsVideo04","0");
                    theVal = "0";
                }
                    kioskArray.push(theVal);
                    window.Video04 = theVal;
                    console.log(kioskArray);
                    }
                }
        
function createKeypadTimer(){
    keypadtimer  = setInterval(function(){ checkKeypadTimer() }, 1000);
    keypadTime = 0;
}

function killKeypadTimer(){
    clearInterval(keypadtimer);
    keypadtimer = "";
    console.log("keypad timer deleted");
}

function checkKeypadTimer(){
    keypadTime ++; 
    //add one to keypad timer
    if(keypadTime >= 60 ){
        //one minute or more has passed on this screen; return to main menu
        cpCmndGotoSlideAndResume = 0
        //delete keypad timer
        killKeypadTimer();
        keypadTime = 0;
    }
}

