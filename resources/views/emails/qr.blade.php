<x-mail::message>

<div style="text-align: center; margin-bottom: 10px">
    <img src="{{ asset("images/FMDQ.png") }}" alt="QR Code">
</div>

# Dear {{$user->title}} {{explode(' ', $user->name)[1]}}

<p>
    We are pleased to inform you that your attendance for the 2024 FMDQ GOLD Awards Ceremony has been successfully confirmed. Please present the unique QR Code in the image below to check in and collect your pass at the event.
</p>

We look forward to welcoming you,<br>
{{ config('app.name') }}
</x-mail::message>