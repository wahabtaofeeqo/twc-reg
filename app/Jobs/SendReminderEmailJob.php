<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SendReminderEmailJob implements ShouldQueue
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
        \App\Models\Registration::where('attendance', 'physically')
            ->where('forum_link_sent', 0)->chunk(10, function($users) {
            foreach ($users as $user) {
                try {

                    \Mail::to($user)->send(new \App\Mail\PhysicalMail($user));

                    $user->forum_link_sent = 1;
                    $user->save();
                } catch (\Throwable $e) {
                    $user->forum_link_sent = 2;
                    $user->save();

                    //
                    \Log::error("Error: " . $e->getMessage());
                }
            }
        });
    }
}
