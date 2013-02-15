//maintain reference to it?
//FixMe: Globals
var classContext;

//Class Bookmarks
function Bookmarks(){
	/*
	*	categories data structure is an array of category names
	*	if one category contains other categories, it nests itself, within
	*/
	this.count = 0;
	this.query = "";
	classContext = this;
}

//add functions to its prototype
Bookmarks.prototype.getRecent = function(){
	//FixMe: 10 recent hardcoded now
	var callback = function(bookmarkTreeNodes) {
		dumpTreeNodes(bookmarkTreeNodes);
    }
	chrome.bookmarks.getRecent(10, callback);
};

Bookmarks.prototype.addBmark = function(titleString, urlString){
	chrome.bookmarks.create({parentId: "2", title: titleString, url: urlString});
	//remove hardcoded reference to (Other Bookmarks: 2)
};

Bookmarks.prototype.getAllBmarks = function(query){
	this.query = query;
	var callback = function(bookmarkTreeNodes) {
		dumpTreeNodes(bookmarkTreeNodes);
    }
	chrome.bookmarks.getTree(callback);
};

Bookmarks.prototype.checkCatExists = function(){
  //stub
  alert ('checkCatExists');
};

Bookmarks.prototype.searchBmarks = function(){
  //stub
  alert ('searchBmarks');
};

function dumpTreeNodes(bookmarkNodes, query) {
	for (var i = 0; i < bookmarkNodes.length; i++) {
		var bookmarkNode = bookmarkNodes[i];
		if (bookmarkNode.children && bookmarkNode.children.length > 0) {
			dumpTreeNodes(bookmarkNode.children);
		}
		else{
			if(String(bookmarkNode.title).indexOf(classContext.query) != -1 || String(bookmarkNode.url).indexOf(classContext.query) != -1){
				writeToDom(bookmarkNode.title, bookmarkNode.url, bookmarkNode.id);
				classContext.count++;
			}
		}
	}
	setResultCount(classContext.count);
}
