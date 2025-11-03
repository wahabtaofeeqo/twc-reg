<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class MasterclassLinkJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        \App\Models\Registration::where('masterclass', 'virtually')
            ->where('masterclass_link_sent', 0)->chunk(10, function($users) {
            foreach ($users as $user) {
                try {

                    \Mail::to($user)->send(new \App\Mail\MasterclassLinkMail($user));
                    $user->masterclass_link_sent = 1;
                    $user->save();
                } catch (\Throwable $e) {
                    $user->masterclass_link_sent = 2;
                    $user->save();

                    //
                    \Log::error("Error: " . $e->getMessage());
                }
            }
        });
    }
}
