<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Mail\QrMail;
use App\Models\Registration;
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
        $search = $request->input('search');
        $models = \App\Models\Registration::latest()
            ->when($search, fn($query) =>
                $query->where(function($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
            )
            ->paginate(10);

        $virtualCount = Registration::where('attendance', 'virtually')->count();
        $masterclassQuery = \App\Models\Registration::whereNotNull('masterclass');
        $masterclassCount = $masterclassQuery->count();
        $masterclassVirtualCount = $masterclassQuery
            ->where('masterclass', 'virtually')->count();

        return Inertia::render('Dashboard', [
            'models' => $models,
            'status' => session('status'),
            'virtualCount' => $virtualCount,
            'masterclass' => [
                'all' => $masterclassCount,
                'virtual' => $masterclassVirtualCount,
            ],
        ]);
    }

    /**
     * Show success page
     */
    public function success(Request $request)
    {
        return Inertia::render('Success', [
            'status' => session('status'),
        ]);
    }

    /**
     * Register user for event
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email',
            'industry' => 'required|string',
            'attendance' => 'required|string',
            'designation' => 'required|string',
        ]);

        $payload = $request->all();
        $user = \App\Models\Registration::create($payload);
        $this->createQr($user);

        //
        return to_route('rsvp.success');
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
        foreach ($IDs as $id) {
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
        return Excel::download(new UsersExport, 'rsvps.xlsx');
    }

    public function trigger()
    {
        // \Mail::to([
        //     // 'ugo_ebeniro@yahoo.com',
        //     'taofeekolamilekan218@gmail.com'
        // ])->send(new \App\Mail\MasterclassLinkMail());
        // dispatch(new \App\Jobs\ForumLinkJob());
        dispatch(new \App\Jobs\SendReminderEmailJob());

        return response()->json(['Done']);
    }

    public function sendNotice() {
        $query = Registration::whereNotNull('masterclass');
        foreach ($query->get() as $user) {
            try {
                \Mail::to($user)->send(new \App\Mail\NoticeMail($user));
                $user->notified = true;
                $user->save();
            } catch (\Throwable $e) {
                info($e->getMessage());
                //throw $th;
            }
        }

        return response()->json([
            'status' => true,
            'All' => $query->count(),
            'Notified' => $query->where('notified', true)->count()
        ]);
    }
}
