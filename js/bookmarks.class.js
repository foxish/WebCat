function Bookmarks(){
	/*
	*	categories data structure is an array of category names
	*	if one category contains other categories, it nests itself, within
	*/
	//this.initialize();
	this.categories = null;
	
	
}

//add functions to its prototype
Bookmarks.prototype.getAllCat = function(){
	var context = this;
	var bookmarkTreeNodes = chrome.bookmarks.getTree(
    function(bookmarkTreeNodes) {
		dumpTreeNodes(bookmarkTreeNodes, context)
    });
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

function dumpTreeNodes(bookmarkNodes, context) {
	var i;
	for (i = 0; i < bookmarkNodes.length; i++) {
		var bookmarkNode = bookmarkNodes[i];
		if (bookmarkNode.children && bookmarkNode.children.length > 0) {
			dumpTreeNodes(bookmarkNode.children);
		}
		else{
			console.log(bookmarkNode.title);
		}
	}
}
