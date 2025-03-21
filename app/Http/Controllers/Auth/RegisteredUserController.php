<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $clinics = Clinic::all();

        return Inertia::render('Auth/Register' , ['clinics' => $clinics]);
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
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'is_clinic' => 'required|boolean',
        ]);

        if ($request->is_clinic) {
            $clinic = Clinic::create([
                'name' => $request->name,
                'email' => $request->email,
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'is_clinic' => $request->is_clinic,
                'clinic_id' => $request->clinic,
            ]);

            $clinic->owner_id = $user->id;
            $clinic->save();


        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
        }

        else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'is_clinic' => $request->is_clinic,
                'clinic_id' => $request->clinic,
            ]);


        event(new Registered($user));

        Auth::login($user);

        return redirect(route('cdk-calculator', absolute: false));
        }

    }
}
