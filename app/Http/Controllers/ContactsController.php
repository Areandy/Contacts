<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Psy\Util\Json;
use App\Contact;

class ContactsController extends Controller
{
    public function index()
    {
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
        $new_contact->img_url = ($data['img_url'] === null) ? '' : $data['img_url'];;
        $new_contact->save();

        return 'OK';
    }

    public function delete(Request $req)
    {
        $contact = Contact::find($req->id);
        $contact->delete();

        return 'OK';
    }


    public function update(Request $req)
    {
        $data = $req->all();
        $contact = Contact::find($data['id']);
        
        $contact->name = $data['name'];
        $contact->phone = $data['phone'];
        $contact->info = ($data['info'] === null) ? '' : $data['info'];
        $contact->img_url = ($data['img_url'] === null) ? '' : $data['img_url'];;
        $contact->save();
    
        return 'OK';
    }

    public function test()
    {
        $c =  new Contact();
        $c->name = "max";
        $c->phone = "max";
        $c->info = "max";
        $c->img_url = "asd";
        $c->save();
        return 'OK';
    }
}
