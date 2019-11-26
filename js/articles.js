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

    //Creating img
    /*
    let imgLink = document.createElement("img");
    imgLink.setAttribute("src", picture);
    imgLink.setAttribute("alt", "Article picture");*/

    //Creating p
    let articleText = document.createElement("p");

    content.split("\n").forEach(function (line) {
        line = line.trim();
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
    //divElt.appendChild(imgLink);
    divElt.appendChild(articleText);
    mainElt.appendChild(divElt);

    if(showAsNew === true){
        let promise1 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve(mainElt);
            }, 300);
        });

        promise1.then(function (elt) {
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


//STUB
window.onload = function () {
    let lorem = "Lorem Ipsum";
    addArticleTop(createArticle("Article 4", lorem, null, "French Community", "http://www.google.fr", 4, false));
    addArticleTop(createArticle("Article 3", lorem, null, "News", "http://www.google.fr", 3, false));
    addArticleTop(createArticle("Article 2", lorem, null, "CERT", "http://www.google.fr", 2, false));
    addArticleTop(createArticle("Article 1", lorem, null, "Risks", "http://www.google.fr", 1, false));
};

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

//TODO: get a default picture corresponding to each of the main category
//TODO: animer une popup (style Twitter), qui fait un lien vers le haut de page, visible uniquemt en cas de nouvel
//      article qui ne soit pas dans la vue du user
//TODO: fetch des articles vers le bas: Envoi d'un id vers back-end -> Stocker le plus petit et le plus gd id
