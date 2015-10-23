<?php
// get the keyword
$keyword = isset($_GET['keyword'])? $_GET['keyword'] : '';

// get country list (in real life you will likely want to fetch from database)
$country_list = json_decode(file_get_contents('country.txt'));
// define the data based on keyword
$data = array();
foreach($country_list as $country){
    if( ($keyword == '' || stripos($country, $keyword) !== FALSE) && count($data)<20){
        $data[] = array('value' => $country, 'caption' => $country);
    }else if(count($data) >= 20){
        break;
    }
}

echo json_encode($data);
