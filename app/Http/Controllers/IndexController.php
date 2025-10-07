<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Mail\QrMail;
use App\Mail\UserJoined;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Mail;

class IndexController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request)
    {
        $models = \App\Models\Registration::latest()->paginate(10);

        return Inertia::render('Dashboard', [
            'models' => $models,
            'status' => session('status'),
        ]);
    }

    /**
     * Register user for event
     */
    public function store(Request $request)
    {
        try {
            $payload = $request->all();
            $payload['name'] = $payload['firstname'].' '.$payload['lastname'];
            \App\Models\Registration::create($payload);

            try {
                Mail::to('goldawards@fmdqgroup.com')->send(new UserJoined);
            } catch (\Throwable $th) {
                //
            }

            return redirect()->back()->with([
                'message' => 'Account created successfully',
            ]);
        } catch (\Throwable $e) {
            info($e->getMessage());
        }

        return redirect()->back()->withErrors([
            'message' => 'Operation failed. Kindly try again.',
        ]);
    }

    public function acceptOrReject($id, $type)
    {
        $type = intval($type);
        $model = \App\Models\Registration::findOrFail($id);
        $model->confirmed = $type;
        $model->save();

        if ($type == 1) {
            $this->createQr($model);
        } else {
            try {
                Mail::to($model)->send(new QrMail($model, $type));
            } catch (\Throwable $e) {
                info($e->getMessage());
            }
        }

        return redirect()->back();
    }

    private function createQr($user)
    {
        $path = public_path('qrcode');
        $code = str_pad(strval($user->id), 4, '0');
        if (! file_exists($path)) {
            mkdir($path, 0777, true);
        }

        try {

            $file = $code.'.png';
            $filename = $path.'/'.$file;
            $realPath = 'qrcode/'.$code.'.png';

            \QrCode::color(255, 0, 127)->format('png')
                ->size(500)->generate(strval($code), $filename);

            $user->code = $code;
            $user->is_sent = true;
            $user->save();

            //
            $this->sendEmail($user);
        } catch (\Exception $e) {
            info($e->getMessage());
        }
    }

    public function sendQR(Request $request)
    {

        $IDs = $request->ids ?? [];
        foreach ($IDs as $key => $id) {
            $this->createQr(User::find($id));
        }

        //
        return redirect()->back();
    }

    private function sendEmail($user)
    {
        Mail::to($user)->send(new QrMail($user));
    }

    public function exportQR()
    {
        return Excel::download(new UsersExport, 'attendees.xlsx');
    }
}
