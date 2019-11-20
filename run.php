<?php
require 'feed_reader.php';

#Main loop used to periodically fetch articles
while(TRUE){
    push_articles(fetch_all_feeds());
    sleep(30*60*60);
}


?>