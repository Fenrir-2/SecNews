<?php
error_reporting(0);
ini_set('display_errors',0);
require 'feed_reader.php';


#Main loop used to periodically fetch articles
while (TRUE) {
    push_articles(fetch_all_feeds());
    sleep(5);
    #Initial represents the initial fetch, should it be true, we load the article like it never have been queried and reset everything
    # So we fetch 10 articles, else the arg is simply ignored

    if (/*$_POST["initial"]*/TRUE) {
        $tmp = fetch_articles();

	while ($row = $tmp->fetch_assoc()) {
		foreach($row as $key => $value){
			$row[$key] = utf8_encode($value);
		}
		$row["Title"] = utf8_encode($row["Title"]);

		$articles[] = $row;
        }
        
        if($_POST["fetch"]){
            foreach($articles as $article){
                if($article["Id"]===$_POST["fetch"]){$key = key($article);}
            }
            $first_articles = array_slice($article,$key,10);
        }
        else{
            $first_articles = array_slice($articles,0,10);
        }

        echo (json_encode($first_articles));
        unset($first_articles);
    } 
    else {
	
	    #param cat, takes five  args, five strings, allows sorting articles by categories to send only a few categories to the user.
	    #does not take in account subcategories, by default everything is set
        if ($_POST["cat"]) {
            $cat_names = explode(",", $_POST["cat"]);

            foreach ($cat_names as $cat) {
                $tmp = query_articles_by_category($cat);
		while ($row = $tmp->fetch_assoc()) {
			foreach($row as $key => $value){
			$row[$key] = utf8_encode($value);
		}
		$row["Title"] = utf8_encode($row["Title"]);



                    $articles[] = $row;
                }
            }

            usort($articles,"compare");

            #fetch = ID --> we fetch 10 more articles, going backward in the DB
            if($_POST["fetch"]){
                foreach($articles as $article){
                    if($article["Id"]===$_POST["fetch"]){$key = key($article);}
                }
                $articles = array_slice($articles,$key,10);
            }
            else{
                $articles = array_slice($articles,0,10);
            }

            echo (json_encode($articles));

            unset($articles);
            unset($cat_names);
        }
	#subcat works like categories (cat) but by default nothing is set, since we don't sort via subcategories, so none by default.
        elseif ($_POST["souscat"]) {
            $subcat_names = explode(",", $_POST["souscat"]);

            foreach ($subcat_names as $subcat) {
                $tmp = query_articles_by_category($subcat);
                while ($row = $tmp->fetch_assoc()) {
			foreach($row as $key => $value){
			$row[$key] = utf8_encode($value);
		}
		$row["Title"] = utf8_encode($row["Title"]);


                    $articles[] = $row;
                }
            }

            usort($articles,"compare");

            
            if($_POST["fetch"]){
                foreach($articles as $article){
                    if($article["Id"]===$_POST["fetch"]){$key = key($article);}
                }
                $articles = array_slice($articles,$key,10);
            }
            else{
                $articles = array_slice($articles,0,10);
            }

            echo (json_encode($articles));

            unset($articles);
            unset($cat_names);

        }
    }
}

#Function used to compare articles date
function compare($a,$b){
    return ($a["pub_date"]<$b["pub_date"]) ? 1:-1;
}
