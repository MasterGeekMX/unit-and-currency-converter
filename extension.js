/*Imports for different resources*/
const Main = imports.ui.main;
const Search = imports.ui.search;
const Lang = imports.lang;
const Misc = imports.misc;
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();

//this will gather the correct import for the searchResults class depending on the verion of GNOME Shell
//TODO test in in early and newer versions and see how far in the past I can go
//thanks raindrum for the snipet! https://github.com/raindrum/gnome-citeurl-search-provider
const shellVersion = Number.parseInt(Misc.config.PACKAGE_VERSION.split('.'));
var searchResults;
if (shellVersion >= 40) {
    searchResults = Main.overview._overview.controls._searchController._searchResults;
}
else {
    searchResults = main.overview.viewSelector._searchResults;
}

/*this is for calling the currency API every hor to update currency exchange rates*/
/*const Mainloop = imports.mainloop;
// this function will be called every hour (3600 seconds)
let timeout = Mainloop.timeout_add_seconds(3600, () => {

});
// remove mainloop
Mainloop.source_remove(timeout);*/

/*
Here we are defining the search provider that will be added to the shell as a class extending SearchProvider2
docs (that I could find): https://developer.gnome.org/shell/unstable/gdbus-org.gnome.Shell.SearchProvider2.html
*/
const ConverterSearchProvider = new Lang.Class({
	Name: "ConverterSearchProvider",
	Extends: Search.SearchProvider2,

	//function to be called then the search provider is created
	//apparently it sets up the name of the search provider
	_init: function(){
		this.parent("Unit and Currency Converter");
	},

	//function called when the user first begins a search
	getInitialResultSet: function(terms, callback) {
		log(terms);
	},

	//function called when a search is performed which is a "subsearch" of the previous search,
	//e.g. the method may return less results, but not more or different results.
	getSubsearchResultSet: function(terms, callback) {
        return this.getInitialResultSet(terms, callback);
    },

    //called when a user selects a search result. It will copy the result to the clipboard(TODO)
    activateResult: function(){
    },
});

var converterSearchProvider = null;

/*
called when the extension is loaded by GNOME Shell.
According to guidelines no major thing should be done here.

We will just log the start of the extension for now
*/
function init () {
	log(`Initializing ${Extension.metadata.name} extension`);
}
/*
called when the extension is turned on.

We will create the instance of the search provider and then add it to the shell,
with a little bit of loggin for that (visible in journalctl)
*/
function enable () {
	log(`Enabling ${Extension.metadata.name} extension`);
	converterSearchProvider = new ConverterSearchProvider();
	searchResults._registerProvider(converterSearchProvider);
}
/*
Called when the extension is manually disabled (or in logout, screen lock, uninstall/update of the extension)

We will remove the instance of the search provider from the shell, and then free the memory of the search provider.
And also loggin of it.
*/
function disable() {
	log(`Disabling ${Extension.metadata.name} extension`);
	searchResults._unregisterProvider(converterSearchProvider);
	converterSearchProvider = null;
}
