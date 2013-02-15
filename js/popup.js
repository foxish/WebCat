// Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php) 

//constants (of sorts)
var LINEBREAK = "<br />";


$(function(){//wait till DOM loads before referencing any elements
	//setup event listeners for the search and add button
	

	//end
	getCurrentUrl(); //write current URL stuff, prepare to add bookmark
	
	//if search is empty, get recent bookmarks
	getRecent();
	
});
function getRecent(){
	$('#result').empty();
	var bookmarks = new Bookmarks();
	bookmarks.getRecent();
}
function getCurrentUrl(){
	 chrome.tabs.getSelected(null, function(tab) {
		$('#addName').val(tab.title);
		$('#currenturl').val(tab.url);
    });
}
function writeToDom(title, urlString){
	//create anchor
	var anchor = $('<a>');
	
	//set anchor attributes and click event handler
	anchor.attr('href', urlString);
	anchor.attr('class', 'metro-tile truncate resultlist');
	anchor.text(title);
	
	//create image tag
	var img = $('<img>');
	img.attr('src', 'chrome://favicon/' + urlString);
	img.attr('class', 'favicon');
	anchor.prepend(img);
	
	//attach handler to anchor
	anchor.click(function() {
		chrome.tabs.create({url: urlString});
    });
	$('#result').append(anchor);
}