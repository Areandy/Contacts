<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Psy\Util\Json;
use App\Contact;

class ContactsController extends Controller
{
    public function index()
    {
        // $arr = ['name' => 'Max', 'age' => 12];
        $arr = Contact::all();

        return json_encode($arr);
    }

    public function add(Request $req)
    {
        $data = $req->all();

        $new_contact = new Contact();
        $new_contact->name = $data['name'];
        $new_contact->phone = $data['phone'];
        $new_contact->info = ($data['info'] === null) ? '' : $data['info'];
        $new_contact->save();
        return 'OK';
    }

    public function delete(Request $req)
    {
        $contact = Contact::find($req->id);
        $contact->delete();

        return 'OK';
    }

    public function test()
    {
        // $data = {
        //     name: 
        // };

        $new_contact = new Contact();
        $new_contact->name = 'QQQ';
        $new_contact->phone = 'QWEQWE';
        $new_contact->info = 'ASDASD';
        $new_contact->save();

         var_dump($new_contact);
    }
}
