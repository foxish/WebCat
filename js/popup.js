// Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php) 

//constants (of sorts)
var LINEBREAK = "<br />";


$(function(){//wait till DOM loads before referencing any elements
	getRecent(); //get recent bookmarks
	
});

function getRecent(){
	var resultArray =  [];
	var bookmarks = new Bookmarks();
	resultArray = bookmarks.getRecent();
}

function getCurrentUrl(){
	 chrome.tabs.getSelected(null, function(tab) {
        var tabId = tab.id;
        var tabUrl = tab.url;
        alert(tabUrl);
    });
}

function writeToDom(title, urlString){
	var launchFunction = function(){
		;
	}	
	var anchor = $('<a>');
	anchor.attr('href', urlString);
	anchor.attr('class', 'metro-tile truncate resultlist');
	anchor.text(title);
	anchor.click(function() {
		chrome.tabs.create({url: urlString});
    });
	$('#result').append(anchor);
	/*
	"<a class='metro-tile truncate' style=''>" + title + "</a>"
	*/
}