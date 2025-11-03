<x-mail::message>
Dear {{ $user->name }},

The countdown is on — only 8 days to go until the highly anticipated ESG Forum Master Class 2025!

As a virtual attendee, please keep an eye on your inbox — your event streaming link will be shared in the coming days.
To stay organized, don’t forget to add the event to your calendar: <a href="https://calendar.google.com/calendar/u/0/r/week/2025/10/29">here</a>

We look forward to welcoming you to what promises to be an inspiring and impactful experience.

<div style="margin: 10px 0px">
    <img src="{{ asset("images/28.jpg") }}" alt="Banner">
</div>

Warm regards,<br>
{{ config('app.name') }}
</x-mail::message>