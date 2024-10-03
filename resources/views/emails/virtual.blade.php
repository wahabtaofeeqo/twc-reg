<x-mail::message>

<div style="text-align: center; margin-bottom: 10px">
    <img src="{{ asset("images/FMDQ.png") }}" alt="QR Code">
</div>

# Dear {{$user->title}} {{explode(' ', $user->name)[1]}}

<p>
 Thank you for expressing your interest in attending the 2024 FMDQ GOLD Awards Ceremony. Unfortunately, we are unable to confirm your participation for this year’s event.
</p>

<p>
    Please accept our regrets and we look forward to welcoming you to our future events.
</p>

Thank you,<br>
{{ config('app.name') }}
</x-mail::message>