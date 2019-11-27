<?php
require "go_db.php";

$result = fetch_articles();
print_r($result);

while ($row = $result->fetch_assoc()){
	foreach($row as $key => $value)
	{
		echo $row["Title"];
		$row[$key] = utf8_encode($value);
	}
	$row["Title"] = utf8_encode($row["Title"]);
	$articles[] = $row;
}

$kek = array_slice($articles,0,10);
print_r($kek);
$test = json_encode($kek,JSON_UNESCAPED_UNICODE);
#echo $test;
echo( json_encode($kek));
#echo strlen($test);
#echo json_last_error_msg();
