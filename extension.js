/*this is for calling the currency API every hor to update currency exchange rates*/
const Mainloop = imports.mainloop;
// this function will be called every hour (3600 seconds)
let timeout = Mainloop.timeout_add_seconds(3600, () => {

});
// remove mainloop
Mainloop.source_remove(timeout);

//Here we are defining the search provider that will be added to the shell
const Main = imports.ui.main;
const Search;
var coverterSearchProvider = null;

function init () {

}
function enable () {

}
function disable() {

}
