<?php
require 'go_db.php';

#TODO, enter in a waiting state, waiting for 1) a user asking for articles refreshing
#2) the periodical refresh
#3) wait for the admin to connect 
#4) wait for an user to connect
# --> all of this should be made through $_POST/$_GET requests.
# the isset has to be taken in account to avoid data leaks/ crash 

#TODO replace this function to pull the feeds url from the database
#Function used to load the file and remove all CR and/or LF from the resulting strings
function load_file($file) {
    $tmp = file($file);
    $result = [];
    foreach($tmp as $link) {
        $result[] = trim($link);
    }
    print_r($result);
    return $result;
}

# Function parsing article from the feeds and the different fields in it
#TODO: Handle errors in the url and items + xml object (is the object unserialized?)
function read_rss($url){
    #XML feed loading as an XMLObject
    $rss = simplexml_load_file($url);
    $result = [];
    $i=0;
    #Loop taking each item from the channel and parsing the fields within it
    foreach($rss->channel->item as $item) {
        $datetime = date_create($item->pubDate);
	// $date = date_format($datetime,'d M Y, H\hi');
	echo($i);
	$i=$i+1;
        $date = $datetime->getTimestamp();
        $title = utf8_decode($item->title);
        $link = strval($item->link);
        $desc = addslashes(strval($item->description));
        #Putting the fields in an array and appending it to a bigger array containing all the articles of this feed
        $article = ["title"=>$title,"link"=>$link,"desc"=>$desc,"pubDate"=>$date];
        $result[] = $article;
    }
    return [$url=>$result];
}


# Function fetching all the feed from each source
function fetch_all_feeds($feeds) {
    $news=[];

    #Take each feed from the list and append it to the news board.
    foreach($feeds as $feed) {
    $tmp = read_rss($feed);
        // print_r($tmp);
        $news[]=$tmp;
    }

    return $news;
}

#Function used to sort articles according to categories
function category_sorting($feeds,$dict) {
    #TODO implementing the sorting with a dictionnary for each category


    return ;
}


#Function used to push the feeds in the database so they are available to display
function push_articles($feeds) {
    #TODO call category sorting to sort articles according to the categories
    # then push it using insert_category from go_db.php
    
}

#Function used to add new sites to the database in order to fetch them later on 
function push_site($url,$name) {
    #TODO parsing vars from any js or php possible code
    insert_feed($url,$name);
}

#Loading the feeds list
$flux = load_file("feeds.txt");
#Fetching all the feeds
$news = fetch_all_feeds($flux);

?>
