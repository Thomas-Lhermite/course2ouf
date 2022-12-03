<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImportController extends AbstractController
{
    #[Route('/import', name: 'app_import', methods: ['GET', 'POST'])]
    public function index(): Response
    {
        return $this->render('import/index.html.twig', [
            'controller_name' => 'ImportController',
        ]);
    }
}
