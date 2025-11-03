<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ForumLinkJob implements ShouldQueue
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
        \App\Models\Registration::where('attendance', 'virtually')
            ->where('forum_link_sent', 0)->chunk(10, function($users) {
            foreach ($users as $user) {
                try {

                    \Mail::to($user)
                        ->cc([
                            'ugo_ebeniro@yahoo.com',
                            'taofeekolamilekan218@gmail.com'
                        ])
                        ->send(new \App\Mail\ForumLinkMail($user));
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
