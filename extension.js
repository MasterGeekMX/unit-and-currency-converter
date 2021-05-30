/*
GNOME Shell extension: Unit and Currency conveter

By MasterGeek.MX

This programm is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.
*/


/*Imports for different resources*/
const Main = imports.ui.main;
const Search = imports.ui.search;
const Lang = imports.lang;
const Misc = imports.misc;
const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();
const Gi = imports.gi;
const {Gio, St} = imports.gi;

//this will gather the correct import for the searchResults class depending on the version of GNOME Shell
//TODO test in in early and newer versions and see how far in the past I can go
//thanks raindrum for the snipet! https://github.com/raindrum/gnome-citeurl-search-provider
const shellVersion = Number.parseInt(Misc.config.PACKAGE_VERSION.split('.'));
var searchResults;
if (shellVersion >= 40) {
    searchResults = Main.overview._overview.controls._searchController._searchResults;
}
else {
    searchResults = Main.overview.viewSelector._searchResults;
}

/*TODO this is for calling the currency API every hor to update currency exchange rates*/
/*const Mainloop = imports.mainloop;
// this function will be called every hour (3600 seconds)
let timeout = Mainloop.timeout_add_seconds(3600, () => {

});
// remove mainloop
Mainloop.source_remove(timeout);*/

//measuring units prefixes that the extension can convert from/to
const lengthUnits = ["cm","m","km","in","ft","mi"];
const timeUnits = ["ms","s","min","h","d","m","y"];
const weightUnits = ["mg","g","kg","t","oz","lb",""];
const temperatureUnits = ["k","c","f"];
const volumeUnits = ["l","cm3","m3","gal","pt","fl oz","ft3","in3"];
const currencyUnits = ["usd","eur","gbp","mxn","jpy","btc"];

//variables that will hold the unit amount we want to convert and in which units they are
var quantity;
var unit;

/*
Here we are defining the search provider that will be added to the shell as a class extending SearchProvider2
docs (that I could find):
https://developer.gnome.org/shell/unstable/gdbus-org.gnome.Shell.SearchProvider2.html
https://developer.gnome.org/SearchProvider/ (meant for "real" apps, but at least defines the methods)
*/
const ConverterSearchProvider = new Lang.Class({
	Name: "ConverterSearchProvider",
	Extends: Search.SearchProvider2,

	//function to be called then the search provider is created
	_init: function(){
		this._title = "Unit and Currency Converter";
		this._id = "Unit and Currency Converter";
	},

	//function called when the user first begins a search.
	//terms is an array of the terms put into the search
	//we will do the bulk of work here, converting units coming from searchTerms
	getInitialResultSet: function(searchTerms, callback){
		log("searchTerms: " + searchTerms);
		results = [];
		/*if (searchTerms.length == 2){
			quantity = searchTerms[0];
			unit = searchTerms[1];
			results.push(quantity);
		}*/
		for (x in searchTerms){
			results.push(x);
		}
		callback(results)
	},

	//function called when a search is performed which is a "subsearch" of the previous search,
	//e.g. the method may return less results, but not more or different results.
	//this is for when we keep typing in the search we are still on the same search
	getSubsearchResultSet: function(_, searchTerms, callback){
        return this.getInitialResultSet(searchTerms, callback);
    },

    getResultMetas: function(results, callback){
		log("results: " + results);
		var metas = [];
		for (x in results){
			metas.push({
				id: x,
				name: x,
				description: "something " + x,
				createIcon: function(){
					let gicon = new Gio.ThemedIcon({
						name: "object-flip-horizontal-symbolic",
						'use-default-fallbacks': true,
					});
					let icon = new St.Icon({
						gicon: gicon,
					})
					return icon;
				},
			})
		}
		callback(metas);
	},

    //called when a user selects a search result. It will copy the selected conversion to the clipboard.
    //Thanks https://stackoverflow.com/questions/9737280/gnome-shell-extension-copy-text-to-clipboard
    activateResult: function(result){
    	log("selecting " + result);
		//Gi.Clipboard.get_default().set_text(St.ClipboardType.PRIMARY, "apetecan");
    },

    filterResults: function(results, maxResults){
        return results.slice(0, maxResults);
    },
});

var converterSearchProvider = null;

/*
called when the extension is loaded by GNOME Shell.
According to guidelines no major thing should be done here.

We will just log the start of the extension for now
*/
function init () {
	log('Initializing "Unit and Currency Converter" shell extension');
}
/*
called when the extension is turned on.

We will create the instance of the search provider and then add it to the shell,
with a little bit of loggin for that (visible in journalctl)
*/
function enable () {
	log('Enabling "Unit and Currency Converter" shell extension');
	converterSearchProvider = new ConverterSearchProvider();
	searchResults._registerProvider(converterSearchProvider);
}
/*
Called when the extension is manually disabled (or in logout, screen lock, uninstall/update of the extension)

We will remove the instance of the search provider from the shell, and then free the memory of the search provider.
And also loggin of it.
*/
function disable() {
	log('Disabling "Unit and Currency Converter" shell extension');
	searchResults._unregisterProvider(converterSearchProvider);
	converterSearchProvider = null;
}
