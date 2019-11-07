/**
 * Dynamically creates an article given the right informations
 *
 * @param title The title the article should have. Required
 * @param content The main subject of the article. Required
 * @param picture The picture to use for the article. Optional
 * @param category The main category under which this article falls. Required
 * @param link The source link. Required
 * @return {Element} The article element, ready to be added
 */
function createArticle(title, content, picture, category, link) {
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
    mainElt.setAttribute("class", "article");

    //Creating div
    let divElt = document.createElement("div");
    divElt.setAttribute("class","article_content");

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
    categLink.setAttribute("href", category);
    categLink.setAttribute("class", "ref_cat");
    let categNode = document.createTextNode(category);
    categLink.appendChild(categNode);

    //Creating img
    let imgLink = document.createElement("img");
    imgLink.setAttribute("src", picture);
    imgLink.setAttribute("alt", "Article picture");

    //Creating p
    let articleText = document.createElement("p");

    content.split("\n").forEach(function (line) {
        line = line.trim();
        if(line){
            console.log(line);
            articleText.appendChild(document.createTextNode(line));
            articleText.appendChild(document.createElement("br"));
        }

    });

    //Adding in the right order
    titleElt.appendChild(titleLink);
    divElt.appendChild(titleElt);
    divElt.appendChild(categLink);
    divElt.appendChild(imgLink);
    divElt.appendChild(articleText);
    mainElt.appendChild(divElt);

    return mainElt;
}

/**
 * Adds an article at the top of the list
 *
 * @param article The article to add
 */
function addArticleTop(article) {
    let articleList = document.getElementsByClassName("article");
    if(articleList.length === 0){
        document.getElementById("article_list").appendChild(article)
    }else{
        document.getElementById("article_list").insertBefore(article, articleList.item(0))
    }
}

//TODO: get a default picture corresponding to each of the main category
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

    return "#";
}

//STUB
window.onload = function () {

    let lorem = "\n" +
        "\n" +
        "Ideoque fertur neminem aliquando ob haec vel similia poenae addictum oblato de more elogio revocari iussisse, quod inexorabiles quoque principes factitarunt. et exitiale hoc vitium, quod in aliis non numquam intepescit, in illo aetatis progressu effervescebat, obstinatum eius propositum accendente adulatorum cohorte.\n" +
        "\n" +
        "Non ergo erunt homines deliciis diffluentes audiendi, si quando de amicitia, quam nec usu nec ratione habent cognitam, disputabunt. Nam quis est, pro deorum fidem atque hominum! qui velit, ut neque diligat quemquam nec ipse ab ullo diligatur, circumfluere omnibus copiis atque in omnium rerum abundantia vivere? Haec enim est tyrannorum vita nimirum, in qua nulla fides, nulla caritas, nulla stabilis benevolentiae potest esse fiducia, omnia semper suspecta atque sollicita, nullus locus amicitiae.\n" +
        "\n" +
        "Itaque tum Scaevola cum in eam ipsam mentionem incidisset, exposuit nobis sermonem Laeli de amicitia habitum ab illo secum et cum altero genero, C. Fannio Marci filio, paucis diebus post mortem Africani. Eius disputationis sententias memoriae mandavi, quas hoc libro exposui arbitratu meo; quasi enim ipsos induxi loquentes, ne 'inquam' et 'inquit' saepius interponeretur, atque ut tamquam a praesentibus coram haberi sermo videretur.\n" +
        "\n" +
        "Alii summum decus in carruchis solito altioribus et ambitioso vestium cultu ponentes sudant sub ponderibus lacernarum, quas in collis insertas cingulis ipsis adnectunt nimia subtegminum tenuitate perflabiles, expandentes eas crebris agitationibus maximeque sinistra, ut longiores fimbriae tunicaeque perspicue luceant varietate liciorum effigiatae in species animalium multiformes.\n" +
        "\n" +
        "Ex his quidam aeternitati se commendari posse per statuas aestimantes eas ardenter adfectant quasi plus praemii de figmentis aereis sensu carentibus adepturi, quam ex conscientia honeste recteque factorum, easque auro curant inbracteari, quod Acilio Glabrioni delatum est primo, cum consiliis armisque regem superasset Antiochum. quam autem sit pulchrum exigua haec spernentem et minima ad ascensus verae gloriae tendere longos et arduos, ut memorat vates Ascraeus, Censorius Cato monstravit. qui interrogatus quam ob rem inter multos... statuam non haberet malo inquit ambigere bonos quam ob rem id non meruerim, quam quod est gravius cur inpetraverim mussitare.\n" +
        "\n" +
        "Utque aegrum corpus quassari etiam levibus solet offensis, ita animus eius angustus et tener, quicquid increpuisset, ad salutis suae dispendium existimans factum aut cogitatum, insontium caedibus fecit victoriam luctuosam.\n" +
        "\n" +
        "Hacque adfabilitate confisus cum eadem postridie feceris, ut incognitus haerebis et repentinus, hortatore illo hesterno clientes numerando, qui sis vel unde venias diutius ambigente agnitus vero tandem et adscitus in amicitiam si te salutandi adsiduitati dederis triennio indiscretus et per tot dierum defueris tempus, reverteris ad paria perferenda, nec ubi esses interrogatus et quo tandem miser discesseris, aetatem omnem frustra in stipite conteres summittendo.\n" +
        "\n" +
        "Horum adventum praedocti speculationibus fidis rectores militum tessera data sollemni armatos omnes celeri eduxere procursu et agiliter praeterito Calycadni fluminis ponte, cuius undarum magnitudo murorum adluit turres, in speciem locavere pugnandi. neque tamen exiluit quisquam nec permissus est congredi. formidabatur enim flagrans vesania manus et superior numero et ruitura sine respectu salutis in ferrum.\n" +
        "\n" +
        "Alii nullo quaerente vultus severitate adsimulata patrimonia sua in inmensum extollunt, cultorum ut puta feracium multiplicantes annuos fructus, quae a primo ad ultimum solem se abunde iactitant possidere, ignorantes profecto maiores suos, per quos ita magnitudo Romana porrigitur, non divitiis eluxisse sed per bella saevissima, nec opibus nec victu nec indumentorum vilitate gregariis militibus discrepantes opposita cuncta superasse virtute.\n" +
        "\n" +
        "Omitto iuris dictionem in libera civitate contra leges senatusque consulta; caedes relinquo; libidines praetereo, quarum acerbissimum extat indicium et ad insignem memoriam turpitudinis et paene ad iustum odium imperii nostri, quod constat nobilissimas virgines se in puteos abiecisse et morte voluntaria necessariam turpitudinem depulisse. Nec haec idcirco omitto, quod non gravissima sint, sed quia nunc sine teste dico.\n" +
        "\n" +
        "Ipsam vero urbem Byzantiorum fuisse refertissimam atque ornatissimam signis quis ignorat? Quae illi, exhausti sumptibus bellisque maximis, cum omnis Mithridaticos impetus totumque Pontum armatum affervescentem in Asiam atque erumpentem, ore repulsum et cervicibus interclusum suis sustinerent, tum, inquam, Byzantii et postea signa illa et reliqua urbis ornanemta sanctissime custodita tenuerunt.\n" +
        "\n" +
        "Ac ne quis a nobis hoc ita dici forte miretur, quod alia quaedam in hoc facultas sit ingeni, neque haec dicendi ratio aut disciplina, ne nos quidem huic uni studio penitus umquam dediti fuimus. Etenim omnes artes, quae ad humanitatem pertinent, habent quoddam commune vinculum, et quasi cognatione quadam inter se continentur.\n" +
        "\n" +
        "Et quoniam apud eos ut in capite mundi morborum acerbitates celsius dominantur, ad quos vel sedandos omnis professio medendi torpescit, excogitatum est adminiculum sospitale nequi amicum perferentem similia videat, additumque est cautionibus paucis remedium aliud satis validum, ut famulos percontatum missos quem ad modum valeant noti hac aegritudine colligati, non ante recipiant domum quam lavacro purgaverint corpus. ita etiam alienis oculis visa metuitur labes.\n" +
        "\n" +
        "Post haec indumentum regale quaerebatur et ministris fucandae purpurae tortis confessisque pectoralem tuniculam sine manicis textam, Maras nomine quidam inductus est ut appellant Christiani diaconus, cuius prolatae litterae scriptae Graeco sermone ad Tyrii textrini praepositum celerari speciem perurgebant quam autem non indicabant denique etiam idem ad usque discrimen vitae vexatus nihil fateri conpulsus est.\n" +
        "\n" +
        "Quid? qui se etiam nunc subsidiis patrimonii aut amicorum liberalitate sustentant, hos perire patiemur? An, si qui frui publico non potuit per hostem, hic tegitur ipsa lege censoria; quem is frui non sinit, qui est, etiamsi non appellatur, hostis, huic ferri auxilium non oportet? Retinete igitur in provincia diutius eum, qui de sociis cum hostibus, de civibus cum sociis faciat pactiones, qui hoc etiam se pluris esse quam collegam putet, quod ille vos tristia voltuque deceperit, ipse numquam se minus quam erat, nequam esse simularit. Piso autem alio quodam modo gloriatur se brevi tempore perfecisse, ne Gabinius unus omnium nequissimus existimaretur.\n";

    addArticleTop(createArticle("Article 4", lorem, null, "French Community", "http://www.google.fr"));
    addArticleTop(createArticle("Article 3", lorem, null, "News", "http://www.google.fr"));
    addArticleTop(createArticle("Article 2", lorem, null, "CERT", "http://www.google.fr"));
    addArticleTop(createArticle("Article 1", lorem, null, "Risks", "http://www.google.fr"));
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