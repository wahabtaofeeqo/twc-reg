<x-mail::message>

<div style="text-align: center; margin-bottom: 10px">
    <img src="{{ asset("images/topbar.png") }}" alt="QR Code">
</div>

# Dear {{$user->name}}

<p>
    We're excited to have you join us virtually at the 2024 Private Sector ESG Forum. To add this event to your calendar, click here: <a href="https://calendar.google.com/calendar/u/0/r/week/2024/11/06">Add</a> 
</p>

<p>
    Please note that the link to join the meeting virtually will be sent a few days to the event. 
</p>

<p>
    Don't miss the opportunity to participate in the conversations and contribute to a sustainable Africa. 
</p>

<p>
    For more information, please visit our website at <a href="https://esgforumafrica.com/">https://esgforumafrica.com/</a>
</p>

<p>
    We look forward to welcoming you!
</p>

<div style="margin: 10px 0px">
    <img src="{{ asset("images/time.png") }}" alt="Time banner">
</div>

Best Regards,<br>
{{ config('app.name') }}
</x-mail::message>