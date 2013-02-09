// Adapt as you please! But do not remove this header
// Creative-Commons Attribution License (http://creativecommons.org/licenses/by/3.0/)
// Developer: Anirudh R (http://anirudhr.com/about.php) 

$(function(){//wait till DOM loads before referencing any elements
	openUrl();
	/*$('#search').click(openUrl);*/
});

function openUrl(){
	//var thisUrl = "chrome://bookmarks";
	//chrome.tabs.create({url: thisUrl});
	var resultArray =  [];
	var bookmarks = new Bookmarks();
	resultArray = bookmarks.getRecent();
	console.log(resultArray);
	//$('#result').text(resultArray[0]);  //inserts a string separated by what you pass as param
}
function getCurrentUrl(){
	 chrome.tabs.getSelected(null, function(tab) {
        var tabId = tab.id;
        var tabUrl = tab.url;
        alert(tabUrl);
    });
}
