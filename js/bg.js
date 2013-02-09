
 // Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php)

var isTurnedOn = false;//manipulated only by popup.js, tells if player is turned on

var conskey = "447c9e9c4c57e6d07b73eac8b899bee6";//api-key
var audio = null; //to use globally as javascript audio
var playing;//current play state
var thisTrack; //current track's title and info
var thisIndex; //points to currently playing track within myList
var lastIndex; //points to total number of tracks in the list
var myList = new Array(); //array containing current playlist
var maxRand, minRand; //for random nummber generation and function getRandomInt()
var beginTime = 0;
var genresv;
var BPMv = 0;
var qv = "";
var isEmpty;

var tipArray = ["6", "Enter artist/title and hit enter to search","Clear search and hit enter to enable genre selection","Search and genre selection do not work together!", "This work is licensed under a <a rel='license' href='http://creativecommons.org/licenses/by/3.0/' target='_blank'>Creative Commons Attribution 3.0 Unported License</a>", "<a href='http://www.anirudhr.com/about.php' target='_blank'>http://www.anirudhr.com</a>", "Search artist + song: Example: 'David Guetta Time'"]; //  array

SC.initialize({
         client_id: conskey
});

function initRequest(){
                        hideControls(true);

                        if(typeof localStorage["search"] !== 'undefined')//sancheck
                        qv = localStorage["search"];
                        
                        if(typeof localStorage["genre"] !== 'undefined')//sancheck
                        genresv = localStorage["genre"];
                        
                        isEmpty = false;
                        
                        try{
							audio.pause();
                        }catch(exception){}
                        audio = null;
                        
                        //values demanded by API
                        var offsetv;
                        var limitv = 50;
                        console.log("wtfhit12");
                        if(qv.trim()!=""){ //correction for query being there, disabling genre
                        genresv = "";
                        offsetv = 0;
                        }else{
						console.log("wtfhit");
                        maxRand = 10000;
                        minRand = 1;
                        offsetv = getRandomInt();
                        }
                        
                        //END values demanded by API
                        SC.get('/tracks', { bpm: { from: BPMv }, limit: limitv, offset:offsetv, genres: genresv,  q: qv}, function(tracks) {
                        myList = tracks;
                        lastIndex = myList.length - 1;
                        
                        
                        if(lastIndex <= -1) //Never less than -1 but I like to be thorough :)                   
                        {
                                if(maxRand == 0){
                                        isEmpty = true;
                                        updatePopup();
                                        return;
                                }
                                
                                maxRand = offsetv/10;
                                initRequest();
                                return;
                        }
                        
                        //array has been successfully populated at this point
                        thisIndex = 0; //stream first url from array
                        changeTrack();
                });
}

function getRandomInt () {
    return Math.floor(Math.random() * (maxRand - minRand + 1)) + minRand;
}

function changeTrack(){
        audio = null;
        audio = new Audio(myList[thisIndex]['stream_url']+"?consumer_key="+conskey);
                audio.addEventListener("ended", function() {
                        next();
                });
        
        if(playing)
        audio.play();
        
        updatePopup();
        hideControls(false);
}


function play(){
        if(audio == null){
        initRequest()
        return null; //no audio loaded
        }
        
        if(playing)
                audio.pause();
        else
                audio.play();
        playing = !playing;//flip the playing variable
        return playing;
}

function next(){
    try{
                audio.pause();
        }catch(exception){}
        audio = null;
        if(thisIndex >= lastIndex)
                initRequest();
        else
        {
                thisIndex++;
                changeTrack();
        }
        return true;
}

function prev(){
        if(thisIndex > 0){
            try{
                audio.pause();
                }catch(exception){}
            audio = null;
                
                thisIndex--;
                changeTrack();
                return true;
        }
        else
        return false;
}
function getTotal() {
                        try{
                          return audio.duration;
                        }catch(exception){
                          return "N/A";
                        }
       }
           
function updatePopup(){
        var popups = chrome.extension.getViews({type: "popup"});
        if (popups.length != 0) {
          var popup = popups[0];
          //methods on popup
          if(!isEmpty){
                        try{
                          popup.document.getElementById('status').innerText = myList[thisIndex]['title'];
                          popup.document.getElementById('playlist').innerText = (thisIndex+1) + "/" + (lastIndex+1);
                          //popup.document.getElementById('duration').innerText = getTotal();
                          }catch(exception){}
                  }
          else{
                        try{
                          popup.document.getElementById('status').innerText = "N/A";
                          popup.document.getElementById('playlist').innerText = "N/A";
                          //popup.document.getElementById('duration').innerText = 0;
                          }catch(exception){}
          }

  }
}

function hideControls(hide){
var popups = chrome.extension.getViews({type: "popup"});
        if (popups.length != 0) {
          var popup = popups[0];
                if(hide){
                        popup.document.getElementById('status').innerText = "Loading..."
                        popup.document.getElementById('iconmenu').style.display = "none";
                }
                else{
                        popup.document.getElementById('iconmenu').style.display = "block";
                }
          }
}


function getPercentProg() {//NOT IN use
   var endBuf = audio.buffered.end(0);
   var soFar = parseInt(((endBuf / audio.duration) * 100));
   return soFar + '%';
}

function killAudio(){

 try{
	audio.src = "";
 }catch(exception){}
 audio = null;

}