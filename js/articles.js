/**
 * Dynamically creates an article given the right informations
 *
 * @param title The title the article should have. Required
 * @param content The main subject of the article. Required
 * @param picture The picture to use for the article. Optional
 * @param category The main category under which this article falls. Required
 * @param link The source link. Required
 * @param id The received id of the article. Required
 * @param showAsNew Defaults to true. If the article should have a color effect on arrival or not
 * @return {Element} The article element, ready to be added
 */
function createArticle(title, content, picture="", category, link, id, showAsNew=true) {
    if(link == null || title == null || content == null  || category == null){
        console.log("Missing required parameter to create article.");
        return null;
    }

    if(title === "" || content === "" || category === "" || link === ""){
        console.log("Missing required parameter to create article.");
        return null;
    }

    if(picture === "" || picture == null){
        picture = getPicByCateg(category);
    }

    //Creating li
    let mainElt = document.createElement("li");
    if(showAsNew === true){
        mainElt.setAttribute("class", "new_article");
    }else{
        mainElt.setAttribute("class", "article");
    }
    mainElt.setAttribute("article_id", id);

    //Creating div
    let divElt = document.createElement("div");
    divElt.setAttribute("class","article_content");

    //Creating title div
    let titleDiv = document.createElement("div");
    titleDiv.setAttribute("id", "title_div")
    titleDiv.style.backgroundImage = 'url("' + picture + '")';

    //Creating title h2
    let titleElt = document.createElement("h2");

    //Creating title <a>
    let titleLink = document.createElement("a");
    titleLink.setAttribute("href", link);
    titleLink.setAttribute("class", "title");
    let titleNode = document.createTextNode(title);
    titleLink.appendChild(titleNode);

    //Creating category <a>
    let categLink = document.createElement("a");
    categLink.setAttribute("href", "#");
    categLink.setAttribute("class", "ref_cat");
    categLink.setAttribute("onclick", "displayCateg(\"" + category + "\");return false;");
    let categNode = document.createTextNode(category);
    categLink.appendChild(categNode);

    //Creating p
    let articleText = document.createElement("p");

    content.split("\n").forEach(function (line) {
        line = line.trim();
        line = line.replace(/<[^>]*>?/gm, '').replace(/\\/, "");;
        if(line){
            articleText.appendChild(document.createTextNode(line));
            articleText.appendChild(document.createElement("br"));
        }

    });

    //Adding in the right order
    titleElt.appendChild(titleLink);
    titleDiv.appendChild(titleElt);
    titleDiv.appendChild(categLink);
    divElt.appendChild(titleDiv);
    divElt.appendChild(articleText);
    mainElt.appendChild(divElt);

    if(showAsNew === true){
        let promiseNew = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(mainElt);
            }, 300);
        });

        promiseNew.then(function (elt) {
            elt.setAttribute("class","article");
        });
    }

    return mainElt;
}

function hideToast() {
    if (document.getElementsByClassName("notification").item(0).style.opacity === "1"
        || document.getElementsByClassName("notification").item(0).style.opacity === "") {
        document.getElementsByClassName("notification").item(0).style.opacity='0';
    } else {
        document.getElementsByClassName("notification").item(0).style.opacity='1';
    }
}

/**
 * Adds an article at the top of the list
 *
 * @param article The article to add
 */
function addArticleTop(article) {
    console.assert(article != null, "Received null parameter");

    let articleList = document.getElementsByClassName("article");
    if(articleList.length === 0){
        document.getElementById("article_list").appendChild(article)
    }else{
        document.getElementById("article_list").insertBefore(article, articleList.item(0))
    }
}

/**
 * Adds an article at the bottom of the list
 *
 * @param article The article to add
 */
function addArticleBottom(article) {
    console.assert(article != null, "Received null parameter");

    let articleList = document.getElementById("article_list");
    articleList.appendChild(article);
}

/**
 * Periodically rotate the top level articles
 * @deprecated
 * @unused
 */
function rotateArticles() {
    let articleList = document.getElementsByClassName("article");
    let stackTop = document.getElementById("article_list");
}

/**
 * Triggered when there's a click on a category
 * @param categ A string that is the name of the category
 */
function displayCateg(categ){
    fetch("../php/run.php",{
        method : 'POST',
        body : 'initial=true&cat=' + categ,
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        parseResponse(response);
    });
}

/**
 * Returns the default picture of a category in case one wasn't given
 *
 * @param category The category to get the picture for
 * @returns {string} The link to the default picture
 */
function getPicByCateg(category) {
    if(category === "" || category == null){
        console.log("Missing required parameter to get default picture.");
        return "";
    }

    if(category === "Risks"){
        return "../img/categ/risks.jpg"
    }else if(category === "News"){
        return "../img/categ/news.jpg"
    }else if(category === "French Community"){
        return "../img/categ/fr_community.jpg"
    }else if(category === "CERT"){
        return "../img/categ/cert alerts.jpg"
    }

    return "#";
}

function parseCateg(id) {
    if(isNaN(id) || id < 1 || id > 10){
        console.log("Bad param for parseCateg");
    }

    if(parseInt(id) === 1){
        return "News"
    }else if(parseInt(id) === 4 || parseInt(id) === 9){
        return "Risks"
    }else if(parseInt(id) === 3){
        return "French Community"
    }else{
        return "CERT"
    }
}
/**
 * Analyzes a fetch request response and creates the according articles
 * @param response The response to analyze
 */
function parseResponse(response){
    //Wiping content
    let list = document.getElementById("article_list");
    while (list.firstChild) {
        list.firstChild.remove();
    }
    //TODO: Wipe all content, parse response, create the articles with showAsNew = false
    response.forEach(function (article) {
        addArticleBottom(createArticle(article.Title, article.content, null, parseCateg(article.id_cat), article.link, article.Id, false));
    })
}

//TODO: move inital load of articles here instead of refreshContent
/**
 * Launch the initial load of the articles, then the
 * callback function
 */
window.onload = function () {
    refreshContent();
};

/**
 * Call me, maybe
 * Callback function for
 */
function callback() {
    console.log("Callback");
    refreshContent();
}

/**
 * Called every 30 minutes, fetches new articles and displays them
 */
function refreshContent() {
    console.log("Content wiping");
    fetch("../php/run.php",{
        method : 'POST',
        body : 'initial=true',
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    }).then( response => response.json()).then( responseJSON => parseResponse(responseJSON));
    fetch("../js/test.json")
        .then( response => response.json() )
        .then( text => parseResponse(text) );
    setTimeout('callback()', (1 * 5 * 1000));
}

/**
 * Builds the category string for the POST request according the checked boxes
 * @returns {string} the 'cat=' string
 */
function getChecked(){
    let catStr = "cat=";

    let checkedCert = document.querySelector('#cat1');
    let checkedRisks = document.querySelector('#cat2');
    let checkedNews = document.querySelector('#cat3');
    let checkedFrench = document.querySelector('#cat4');

    if(checkedCert.checked === true){
        if(catStr.length > 4){
            catStr += ",cert";
        }else {
            catStr += "cert";
        }
    }

    if(checkedRisks.checked === true){
        if(catStr.length > 4){
            catStr += ",risks";
        }else {
            catStr += "risks";
        }
    }

    if(checkedNews.checked === true){
        if(catStr.length > 4){
            catStr += ",news";
        }else {
            catStr += "news";
        }
    }

    if(checkedFrench.checked === true){
        if(catStr.length > 4){
            catStr += ",french";
        }else{
            catStr += "french";
        }
    }

    return catStr;
}


/**
 * First looks up if the media query is met, then
 * applies an opacity of 0, which triggers the transition defined
 * in the css file
 */
function hideOnClick() {
    //Hiding the text
    if (document.getElementById("motto").style.opacity === "1"
        || document.getElementById("motto").style.opacity === "") {
        document.getElementById("motto").style.opacity='0';
    } else {
        document.getElementById("motto").style.opacity='1';
    }

    //Hiding the search bar if needed
    if(window.matchMedia("(max-width: 900px)").matches){
        if (document.getElementById("search-container").style.opacity === "1"
            || document.getElementById("search-container").style.opacity === "") {
            document.getElementById("search-container").style.opacity='0';
        } else {
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

/**
 * When the user clicks on the button, scroll to the top of the document
 */
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    hideToast();
}

//TODO: animer une popup, visible uniquemt en cas de nouvel article qui ne soit pas dans la vue du user
//TODO: fetch des articles vers le bas: Envoi d'un id vers back-end -> Stocker le plus petit
//      et le plus gd id
