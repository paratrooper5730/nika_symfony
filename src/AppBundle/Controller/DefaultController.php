<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/la/{modelname}/{actionname}", name="legacy")
     */

    public function legacyAction(Request $request, $modelname, $actionname)
    {
        global $su, $dblocation, $dbname, $dbpass, $dbuser, $db, $USER, $siteroot, $approot, $dataobject, $stored;
        $_GET['route'] = $modelname.'/'.$actionname;
        $path = realpath($this->getParameter('old_app_dir').DIRECTORY_SEPARATOR.'index.php');
        ob_start();
                require $path;
                //echo $modelname."/".$actionname;
        $old_app_response = ob_get_clean();
        // replace this example code with whatever you need
        return new Response($old_app_response);
    }
}
