<?php

function init_client($username) {
    $client = new MongoDB\Driver\Manager("mongodb://${username}:".trim(file_get_contents(".pwd"))."@localhost/SecNews");
    echo "Client Started \n";
    return $client;
}

function push_to_db($website,$data) {
    $m = init_client("phpClient");
    // $collection = $m->$website;
    // $collection->insertMany($data);
}


?>