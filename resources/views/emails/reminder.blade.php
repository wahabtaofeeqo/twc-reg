<x-mail::message>
Dear {{ $user->name }},

The countdown has begun — there are only 9 days left until the highly anticipated ESG Forum 2025!

@if ($user->attendance == 'virtually')
As a virtual attendee, Your for streaming link will be shared in the coming days.
@else
As a Physical attendee, your unique QR code identification will be resent before event day.
@endif

To help you stay organized, don’t forget to add the event to your calendar: <a href="https://calendar.google.com/calendar/u/0/r/week/2025/10/29">here</a>

We’re excited to welcome you to what promises to be an inspiring and impactful event.

<div style="margin: 10px 0px">
    <img src="{{ asset("images/29.jpg") }}" alt="Banner">
</div>

Warm regards,<br>
{{ config('app.name') }}
</x-mail::message>
