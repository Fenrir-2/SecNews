<?php
#TODO: Test the queries, then test its security. 
#
#Function used to establish connection with the MariaDB server
function db_connect(){

    $client = new mysqli('localhost','phpClient',trim(file_get_contents(".pwd")),'SecNews');
    if($client->connect_errno) {
        echo "Connection failed.";
        echo "Errno: " . $mysqli->connect_errno . "\n";
        echo "Error: " . $mysqli->connect_error . "\n";
        return NULL;
    }
    else {
        echo "Connection established \n";
        return $client;
    }
}

#Function used to query the wordlist for each category from the database
function query_wordlists() {

    $client = db_connect();
    $categories = $client->query("SELECT nom,wordlist FROM CATEGORIES ;");

    if($categories) {        
        return $categories;
    }
    else {
        echo "Unable to fetch categories.";
    }
}

#Function querying the content of a category after a date
function query_articles_by_category($category,$date) {
    $client = db_connect();
    #preparing the query and binding the vars
    $prepared = $client->prepare("SELECT * FROM categories,articles 
                    WHERE categories.nom_categorie = ? AND categories.id_cat = articles.id_cat AND CAST(articles.pub_date AS INTEGER) >= ?;");  
    $prepared->bind_param("si",$category,$date);
    #execute the query and close the prepared statement
    $result = $prepared->execute();
    $prepared->close();

    return $result;
}

#Function inserting freshly fetched articles into the database
function insert_articles($articles) {
    $client = db_connect();

    $prepared = $client->prepare("INSERT INTO ARTICLES (Title,pub_date,content,link,id_site,id_cat,id_subcat) VALUES (?,?,?,?,?,?,?)");

    $title = NULL;
    $date = NULL;
    $content = NULL;
    $link = NULL;
    $id_site = NULL;
    $id_cat = NULL;
    $id_subcat = NULL;

    #Binding parameters to the prepared query
    $prepared->bind_param("sissiii",$title,$date,$content,$link,$id_site,$id_cat,$id_subcat);
    
    foreach($articles as $sample) {
        print_r($sample);

        $title = $sample["title"];
        $date = $sample["pubDate"];
        $content = $sample["desc"];
        $link = $sample["link"];
        // $id_site = 
        $id_cat = $sample["id_cat"];
        $id_subcat = $sample["id_subcat"];
        if (is_null($date)) {time();}

        $prepared->execute();
    }

    $prepared->close();
}

#Funtion loading feeds urls from the database
function load_feeds() {
    $client = db_connect();
    $result = $client->query("SELECT Id,url FROM SITES;");
    $client->close();
    // print_r($result);
    return $result;
}

#Function used to insert a new feed source in the database
function insert_feed($url,$name) {
    $client = db_connect();
    #we need to specify names of the columns because of the auto increment on the ID
    $query = $client-> prepare("INSERT INTO SITES (Url,nom) VALUES (?,?)");
    $query->bind_param("ss",$url,$name);
    $query->execute();
}



?>
