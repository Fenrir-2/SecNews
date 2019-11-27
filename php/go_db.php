<?php
#TODO: Test the queries, then test its security. 

#Function used to establish connection with the MariaDB server
function db_connect($user = 'phpClient',$path = '.pwd'){

    $client = new mysqli('localhost',$user,trim(file_get_contents($path)),'SecNews');
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
function query_articles_by_category($category) {
    $client = db_connect();
    #preparing the query and binding the vars
    $prepared = $client->prepare("SELECT * FROM CATEGORIES, ARTICLES 
                  WHERE CATEGORIES.nom = ? AND (CATEGORIES.Id = ARTICLES.id_cat OR CATEGORIES.Id = ARTICLES.id_subcat) ORDER BY ARTICLES.pub_date DESC;");
    $prepared->bind_param("s",$category);
    #execute the query and close the prepared statement
    $result = $prepared->execute();
    $prepared->close();

    return $result;
}

#Function used to query articles after a certain date
function query_articles_after_date($timestamp) {
    $client = db_connect("frontFetcher",".pwd2");

    $prepared = $client->prepare("SELECT * FROM ARTICLES WHERE pub_date > ? ORDER BY Id DESC;");

    $prepared->bind_param("i",$timestamp);

    $result = $prepared->execute();

    $prepared->close();

    return $result;
}

#Fucntion used to query an article searching in the title
function query_articles_by_title($title){
    $client = db_connect("frontFetcher",".pwd2");

    $prepared = $client->prepare("SELECT * FROM ARTICLES WHERE title=? ORDER BY Id DESC;");

    $prepared->bind_param("s","%".$title."%");

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
    // $id_site = NULL;
    $id_site = key($articles);
    $id_cat = NULL;
    $id_subcat = NULL;

    #Binding parameters to the prepared query
    $prepared->bind_param("sissiii",$title,$date,$content,$link,$id_site,$id_cat,$id_subcat);
   foreach($articles as $list){
    foreach($list as $sample) {
#	echo "\n\n\n SAMPLE \n\n\n";
#        print_r($sample);

        $title = $sample["title"];
        $date = $sample["pubDate"];
        $content = $sample["desc"];
        $link = $sample["link"];
        // $id_site = key($articles);
        $id_cat = $sample["id_cat"];
        $id_subcat = $sample["id_subcat"];
	if (is_null($date)) {time();}
	if (is_null($id_cat)){$id_cat = 1;}
	if (is_null($id_subcat)){$id_subcat = 1;}
	if(is_null($title) or is_null($date) or is_null($content) or is_null($link) or is_null($id_cat) or is_null($id_subcat)){ echo "one or more is null";
	}
	else{
	#	print_r($prepared);
		$prepared->execute();
		echo "Insertion successful \n";
	#	echo $title;
    }
    }
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

#Function used to fetch all the articles ordered by id
function fetch_articles(){
    $client = db_connect("frontFetcher",".pwd2");

    $result = $client->query("SELECT * FROM ARTICLES ORDER BY Id DESC;");
    
    $client->close();

    return $result;
}

?>
