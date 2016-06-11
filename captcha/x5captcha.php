<?php
include("../res/x5engine.php");
$nameList = array("nxn","gmm","dvd","87f","c7p","jvy","5fz","6ld","stu","ngh");
$charList = array("8","J","V","D","Z","2","M","T","N","C");
$cpt = new X5Captcha($nameList, $charList);
//Check Captcha
if ($_GET["action"] == "check")
	echo $cpt->check($_GET["code"], $_GET["ans"]);
//Show Captcha chars
else if ($_GET["action"] == "show")
	echo $cpt->show($_GET['code']);
// End of file x5captcha.php
