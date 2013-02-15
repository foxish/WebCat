// Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php) 

//constants (of sorts)
var LINEBREAK = "<br />";

$(function(){//wait till DOM loads before referencing any elements
	//setup event listeners for the search and add button
	setEventListeners();


	//end
	getCurrentUrl(); //write current URL stuff, prepare to add bookmark
	
	//if search is empty, get recent bookmarks
	getRecent();
	
});

function setResultCount(count){
	$('#numresults').text(count);
}

function setEventListeners(){
	$('#search_button').click(function(){
		$('#result').empty();
		var bookmarks = new Bookmarks();
		var query = $('#search').val();
		bookmarks.getAllBmarks(query);
	});
	$('#add_button').click(function(){
		$('#result').empty();
		var bookmarks = new Bookmarks();
		var url = $('#currenturl').val();
		var title = $('#addName').val();
		var tags = $('#addTags').val();
		bookmarks.addBmark(title, url);
		
		//update the current dialog
		getRecent();
	});
}
function getRecent(){
	$('#result').empty();
	var bookmarks = new Bookmarks();
	bookmarks.getRecent();//getAllBmarks();//
}
function getCurrentUrl(){
	//get current tab name & url
	chrome.tabs.getSelected(null, function(tab) {
		$('#addName').val(tab.title);
		$('#currenturl').val(tab.url);
	});
}
function writeToDom(title, urlString, id){
	//create anchor
	var anchor = $('<a>');
	
	//set anchor attributes and click event handler
	//anchor.attr('href', urlString);
	anchor.attr('class', 'metro-tile resultlist truncate');
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
	
	var deleteLink = $('<a id="deletelink" href="#">Delete</a></span>');
	anchor.hover(function(){
		anchor.prepend(deleteLink);
		//take care of click on this delete
		$('#deletelink').click(function(){
			chrome.bookmarks.remove(String(id));
			getRecent();
		});
	},
	function() { //unhover
		deleteLink.remove();
	}).append(anchor);
	
	$('#result').append(anchor);
}