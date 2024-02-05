<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	header('Content-Type: application/json');
	echo '{"ok":false}';
	die;
}

$errors = [];
if(!isset($_POST['name']) || empty($_POST['name'])){
	$errors['name'] = 'required';
}
if(!isset($_POST['phone']) || empty($_POST['phone'])){
	$errors['phone'] = 'required';
}

if(!empty($errors)){
	header('Content-Type: application/json');
	echo json_encode([
	'ok'=> false,
	'errors' => $errors
	]);
	die;
}

$request = [
	'entry.290945519'=>$_POST['discount'],
	'entry.571897291'=>$_POST['count'],
	'entry.1299913222'=>$_POST['name'],
	'entry.707170541'=>$_POST['phone'],
	'entry.610796962'=>$_POST['city'],
	'entry.1792062587'=>$_POST['address'],
	'entry.274202371'=>$_POST['comment'],
];
$curl = curl_init();

curl_setopt_array($curl, array(
	CURLOPT_URL => 'https://docs.google.com/forms/u/2/d/e/1FAIpQLSexaIiMDw_Vu0V6dThnCOQs48BXpsdzM5zhsjDnTEtxmnnw0Q/formResponse',
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_ENCODING => '',
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 0,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => 'POST',
	CURLOPT_POSTFIELDS => http_build_query($request),
	CURLOPT_HTTPHEADER => array(
		'Content-Type: application/x-www-form-urlencoded'
	),
));

$response = curl_exec($curl);

curl_close($curl);

header('Content-Type: application/json');
echo '{"ok": true}';
	die;