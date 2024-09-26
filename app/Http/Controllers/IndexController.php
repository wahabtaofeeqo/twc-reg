<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Mail\QrMail;
use Mail;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;

class IndexController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request)
    {
        $models = User::where('type', 'User')
            ->latest()->paginate(10);

        return Inertia::render('Dashboard', [
            'models' => $models,
            'status' => session('status'),
        ]);
    }

    private function createQr($user) {

        $path = public_path('qrcode');
        $code = str_pad(strval($user->id), 4, "0");
        if(!file_exists($path)) mkdir($path, 0777, true);

        try {

            $file = $code . ".png";
            $filename = $path . "/" . $file;
            $realPath = "qrcode/" . $code . ".png";
            
            \QrCode::color(255, 0, 127)->format('png')
                ->size(500)->generate(strval($code), $filename);
            
            $user->code = $code;
            $user->is_sent = true;
            $user->save();

            //
            $this->sendEmail($user);
        } 
        catch (\Exception $e) {
            info($e->getMessage());
        }
    }

    public function sendQR(Request $request) {

        $IDs = $request->ids ?? [];
        foreach ($IDs as $key => $id) {
            $this->createQr(User::find($id));
        }

        //
        return redirect()->back();
    }

    private function sendEmail($user) {
        Mail::to($user)->send(new QrMail($user));
    }

    public function exportQR() {
        return Excel::download(new UsersExport, 'rsvps.xlsx');
    }
}
