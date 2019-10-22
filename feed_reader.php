<?php
require 'go_db.php';


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
function read_rss($url){
    #XML feed loading as an XMLObject
    $rss = simplexml_load_file($url);
    $result = [];

    #Loop taking each item from the channel and parsing the fields within it
    foreach($rss->channel->item as $item) {
        $datetime = date_create($item->pubDate);
        $date = date_format($datetime,'d M Y, H\hi');
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

    #Take each feed from the list and fetch it
    foreach($feeds as $feed) {
    $tmp = read_rss($feed);
        // print_r($tmp);
        $news[]=$tmp;
    }

    return $news;
}

function push_feeds($feeds) {

    foreach($feeds as $feed) {
        
        // echo key($feed)."\n";
        push_to_db(key($feed),$feed);
    }
}

#Loading the feeds list
$flux = load_file("feeds.txt");
$news = fetch_all_feeds($flux);
push_feeds($news);

?>