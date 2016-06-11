<?php
if(substr(basename($_SERVER['PHP_SELF']), 0, 11) == "imEmailForm") {
	include '../res/x5engine.php';
	$form = new ImForm();
	$form->setField('Nombre', $_POST['imObjectForm_13_1'], '', false);
	$form->setField('Teléfono Casa u Oficina', $_POST['imObjectForm_13_2'], '', false);
	$form->setField('Celular', $_POST['imObjectForm_13_3'], '', false);
	$form->setField('Correo', $_POST['imObjectForm_13_4'], '', false);
	$form->setField('Comentarios', $_POST['imObjectForm_13_5'], '', false);

	if(@$_POST['action'] != 'check_answer') {
		if(!isset($_POST['imJsCheck']) || $_POST['imJsCheck'] != 'jsactive' || (isset($_POST['imSpProt']) && $_POST['imSpProt'] != ""))
			die(imPrintJsError());
		$form->mailToOwner('contacto@previlife.mx', 'contacto@previlife.mx', 'Mensaje de Página Web PreviLife', '', false);
		$form->mailToCustomer('contacto@previlife.mx', $_POST['imObjectForm_13_4'], 'Previ Life ha recibido tu mensaje', 'Estimado usuario,

Hemos recibido su mensaje por correo electrónico, nos pondremos en contacto pronto.

Saludos!

PreviLife - Asesorarte no tiene costo,  no hacerlo si
www.previlife.mx
', false);
		@header('Location: ../gracias.html');
		exit();
	} else {
		echo $form->checkAnswer(@$_POST['id'], @$_POST['answer']) ? 1 : 0;
	}
}

// End of file