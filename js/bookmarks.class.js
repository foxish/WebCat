//maintain reference to it?
//FixMe: Globals
var bookmarkArray = new Array();

//Class Bookmarks
function Bookmarks(){
	/*
	*	categories data structure is an array of category names
	*	if one category contains other categories, it nests itself, within
	*/
	//this.initialize();
}

//add functions to its prototype
Bookmarks.prototype.getRecent = function(){
	//FixMe: 10 recent hardcoded now
	var bookmarkTreeNodes = chrome.bookmarks.getRecent(10,
    function(bookmarkTreeNodes) {
		dumpTreeNodes(bookmarkTreeNodes)
    });
	return bookmarkArray;
};

Bookmarks.prototype.checkCatExists = function(){
  //stub
  alert ('checkCatExists');
};

Bookmarks.prototype.getBmarksInCat = function(){
  //stub
  alert ('getBmarksInCat');
};

Bookmarks.prototype.addBmark = function(){
  //stub
  alert ('addBmark');
};

Bookmarks.prototype.searchBmarks = function(){
  //stub
  alert ('searchBmarks');
};

function dumpTreeNodes(bookmarkNodes) {
	var i;
	for (i = 0; i < bookmarkNodes.length; i++) {
		var bookmarkNode = bookmarkNodes[i];
		if (bookmarkNode.children && bookmarkNode.children.length > 0) {
			dumpTreeNodes(bookmarkNode.children);
		}
		else{
			bookmarkArray.push(bookmarkNode.title)
			//document.write();
		}
	}
}
