searchBarState="visible";

function hideSearchBar() {
    if (window.searchBarState === "visible") {
        document.getElementById("search-container").style.display='none';
        window.searchBarState = "hidden";
        console.log("Changed state");
    } else {
        sleep(300).then(() => {
            window.searchBarState = "visible";
            document.getElementById("search-container").style.display='';
        });
    }
}

function opacityGradient(elt, time, steps, direction) {
    opacityStep = Number(steps)/Number(time);
    opacityTiming = Number(time)/Number(steps);
    if(direction === "up"){
        for(i = 0; i<steps; i++){

        }
    }else{

    }
}

function search() {
    console.log(document.getElementById("search-bar").value);
}

// sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
