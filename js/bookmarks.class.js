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

Bookmarks.prototype.addBmark = function(titleString, urlString, tags){
	titleString += "##" + tags;
	chrome.bookmarks.create({parentId: "2", title: titleString, url: urlString});
	//remove hardcoded reference to (Other Bookmarks: 2)
};

Bookmarks.prototype.getAllBmarks = function(query){
	this.query = query;
	var callback = function(bookmarkTreeNodes) {
		/** had to add the below 2 lines and pollute the class
		* unfortunately, the damn callback is an idiot
		* and multiple calls from the box are fired simultaneously, causing problems
		*/
		$('#result').empty();
		classContext.count = 0;
		dumpTreeNodes(bookmarkTreeNodes);
    }
	var MAXINTPOS =  2147483647;
	chrome.bookmarks.getRecent(MAXINTPOS, callback);
	/**
	*	Not doing getTree, because ordering by time descending is actually useful
	*/
};

Bookmarks.prototype.checkCatExists = function(){
  //stub
  alert ('checkCatExists');
};

Bookmarks.prototype.searchBmarks = function(){
  //stub
  alert ('searchBmarks');
};

function dumpTreeNodes(bookmarkNodes) {
	for (var i = 0; i < bookmarkNodes.length; i++) {
		var bookmarkNode = bookmarkNodes[i];
		if (bookmarkNode.children && bookmarkNode.children.length > 0) {
			dumpTreeNodes(bookmarkNode.children);
		}
		else{
			/** 
			* in case of multiple queries, separated by commas, look for each one separately
			*/
			if(checkMatch(classContext.query, bookmarkNode.title) || checkMatch(classContext.query, bookmarkNode.url)){
				var title;
				if(String(bookmarkNode.title).lastIndexOf('##')!= -1)
					title = String(bookmarkNode.title).substr(0, String(bookmarkNode.title).lastIndexOf('##'));
				else
					title = String(bookmarkNode.title);
				writeToDom(title, bookmarkNode.url, bookmarkNode.id);
				classContext.count++;
			}
		}
	}
	setResultCount(classContext.count);
}
//returns true/false based on whether the needle is in haystack
function checkMatch(needle, haystack){
	needle = needle.toString().toLowerCase();
	haystack = haystack.toString().toLowerCase();
	if(!needle.trim() || !haystack.trim()){
		return true;
	}
	if(haystack.indexOf(needle) != -1){
		return true;
	}
	return false;
}
