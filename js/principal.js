//Used for the seach bar hiding function
let searchBarState="visible";

/**
 * First looks up if the media query is met, then
 * applies an opacity of 0, which triggers the transition defined
 * in the css file
 */
function hideSearchBar() {
    if(window.matchMedia("(max-width: 900px)").matches){
        if (searchBarState === "visible") {
            document.getElementById("search-container").style.opacity='0';
            searchBarState = "hidden";
        } else {
            searchBarState = "visible";
            document.getElementById("search-container").style.opacity='1';
        }
    }
}

/**
 * Triggered when the search button is clicked
 */
function search() {
    console.log(document.getElementById("search-bar").value);
}