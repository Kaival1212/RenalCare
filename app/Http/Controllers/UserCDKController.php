<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserCDK;
use Illuminate\Http\Request;

class UserCDKController extends Controller
{
    public function store(Request $request){

        //dd($request->all());

        $cdk = $request->gfr;
        $stage = $request->stage;
        $user = $request->user();

        UserCDK::create([
            'user_id' => $user->id,
            'value' => $cdk,
            'stage' => $stage
        ]);

        return response()->json([
            'message' => 'CDK saved successfully',
            'status' => 200
        ], 200);
    }

    public function destroy(Request $request){


        UserCDK::where('id', $request->id)->delete();

        return response()->json([
            'message' => 'CDK deleted successfully',
            'status' => 200
        ], 200);
    }

    public function clinicstore(Request $request){

        $cdk = $request->gfr;
        $stage = $request->stage;
        $user = User::find($request->user_id);

        $user->c_d_ks()->create([
            'value' => $cdk,
            'stage' => $stage
        ]);

        return response()->json([
            'message' => 'CDK saved successfully',
            'status' => 200
        ], 200);
    }
}
