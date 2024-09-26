<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Mail\QrMail;
use Mail;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            // 'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $payload = $request->all();
        $user = User::create($payload);

        // event(new Registered($user));
        $this->createQr($user);       

        return back()->with([
            'message' => 'Account created successfully',
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
            Mail::to($user)->send(new QrMail($user));
        } 
        catch (\Exception $e) {
            info($e->getMessage());
        }
    }
}
