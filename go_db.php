<?php

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
        echo "Connection established";
        return $client;
    }
}

#Function querying the content of a category after a date
function query_category($category,$date) {
    $client = db_connect();
    #preparing the query and binding the vars
    $prepared = $client->prepare("SELECT * FROM categories,articles 
                    WHERE categories.nom_categorie = ? AND categories.id_cat = articles.id_cat AND articles.pub_date >= ?;");  
    $prepared->bind_param("si",$category,$date);
    #execute the query and close the prepared statement
    $result = $prepared->execute();
    $prepared->close();

    return $result;
}

#Function inserting freshly fetched articles into the database
function insert_category($client,$category, $articles) {
    $client = db_connect();

    $prepared = $client->prepare("INSERT INTO ? VALUES (?,?,?,?)");

}

?>