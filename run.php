<?php
require 'feed_reader.php';

#le comportement est ok?

#Main loop used to periodically fetch articles
while (TRUE) {
    push_articles(fetch_all_feeds());
    sleep(30 * 60 * 60);

    #initial = true  --> si true on fetch les 10 derniers articles sinon on ignore cet arg
    if ($_POST["initial"]) {
        $tmp = fetch_articles();

        while ($row = $tmp->fetch_assoc()) {
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

        #cat = "string",string,string,string,string --> trie les articles à envoyer par catégories (pas les sous cat) 
        #renvoie les catégories selectionnées, par défaut  toutes
        if ($_POST["cat"]) {
            $cat_names = explode(",", $_POST["cat"]);

            foreach ($cat_names as $cat) {
                $tmp = query_articles_by_category($cat);
                while ($row = $tmp->fetch_assoc()) {
                    $articles[$cat][] = $row;
                }
            }

            #fetch = ID --> on fetch 10 articles à partir de cet ID d'un pdv descendant
            if($_POST["fetch"]){
                foreach($articles as $article){
                    if($article["Id"]===$_POST["fetch"]){$key = key($article);}
                }
                $articles = array_slice($article,array_search($key,array_keys($articles)),10);
            }

            echo (json_encode($articles));

            unset($articles);
            unset($cat_names);
        }

        #souscat = "strings","string","string", --> comme pour cat mais par défaut on ne peut pas séléctionner aucune cat, 
        #donc si none on ne trie pas par souscat on envoie tout
        elseif ($_POST["souscat"]) {
            $subcat_names = explode(",", $_POST["souscat"]);

            foreach ($subcat_names as $subcat) {
                $tmp = query_articles_by_category($subcat);
                while ($row = $tmp->fetch_assoc()) {
                    $articles[$subcat][] = $row;
                }
            }

            #fetch = ID --> on fetch 10 articles à partir de cet ID d'un pdv descendant
            if($_POST["fetch"]){
                foreach($articles as $article){
                    if($article["Id"]===$_POST["fetch"]){$key = key($article);}
                }
                $articles = array_slice($article,$key,10);
            }

            echo (json_encode($articles));

            unset($articles);
            unset($cat_names);

        }
    }
}
