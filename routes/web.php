<?php

use App\Http\Controllers\ProfileController;
use App\Models\Clinic;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

        if (auth()->user()) {
            return redirect()->route('cdk-calculator');
        }

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    $clinic = Clinic::where('owner_id', auth()->id())->first();
    $clients = $clinic->users()->get();

    $final = $clients->map(function ($client) {
        $cdk = $client->c_d_ks()->get();
        $client->cdk = $cdk;
        return $client;
    });

    //dd($final);

    return Inertia::render('Dashboard' , ["clients" => $clients]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/history', function () {
    $user = auth()->user();
    $cdk = $user->c_d_ks()->get();
    //dd($cdk);
    return Inertia::render('History' , ["cdk" => $cdk]);
})->middleware(['auth', 'verified'])->name('history');

Route::get('/cdk-calculator', function () {
    return Inertia::render('Ckd-cal');
})->middleware(['auth', 'verified'])->name('cdk-calculator');

Route::get('/simple-cdk', function () {
    return Inertia::render('SimpleCKDcal');
})->name('simple-cdk');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::post('/user-cdk', [App\Http\Controllers\UserCDKController::class, 'store'])->name('user-cdk.store');
Route::delete('/user-cdk', [App\Http\Controllers\UserCDKController::class, 'destroy'])->name('user-cdk.destroy');

Route::post('/clinic/user-cdk', [App\Http\Controllers\UserCDKController::class, 'clinicstore'])->name('clinic-user-cdk.store');

Route::get('/client/{id}', function($id){

    //dd($id);

    $client = User::find($id);
    $cdk = $client->c_d_ks()->get();
    $client->cdk = $cdk;

    return Inertia::render('ClinicClient' , ["client" => $client]);

})->name("client.show");

Route::get('/upload/multiple', function () {
    return Inertia::render('UploadCsv');
})->name('upload-multiple');

require __DIR__.'/auth.php';
