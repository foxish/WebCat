// Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php) 

var bgp = chrome.extension.getBackgroundPage();//all function calls to background page are done thru this variable
var duration; 
var genreEl;
  
document.addEventListener('DOMContentLoaded', function () {//wait till DOM loads before referencing any elements
  document.getElementById('header').addEventListener('click', openUrl);
});


function openUrl(){
	var thisUrl = "chrome://bookmarks";
	//chrome.tabs.create({url: thisUrl});
	
	var bookmarks = new Bookmarks();
	bookmarks.getAllCat();
}
function getCurrentUrl(){
	 chrome.tabs.getSelected(null, function(tab) {
        var tabId = tab.id;
        var tabUrl = tab.url;
        alert(tabUrl);
    });
}