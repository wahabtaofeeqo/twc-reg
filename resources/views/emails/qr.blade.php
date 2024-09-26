<x-mail::message>

# Dear {{$user->name}}

<p>
    We are excited to have you join us at the 2024 Private Sector ESG Forum come 6th November @ Civic Centre, Victoria Island, Lagos, Nigeria. 
</p>

<p>
    To ensure a smooth entry, please keep the attached QR code handy. This will expedite your access to the event.
    View / Download QR Code
</p>

<p>
    Don't miss the opportunity to network with industry leaders and contribute to a sustainable Africa.
</p>

<p>
    Click this <a href="https://calendar.google.com/calendar/u/0/r/week/2024/11/06">Link</a> to add the event to your Calendar.
</p>

<p>
    For more information, please visit our website at <a href="https://esgforumafrica.com/">https://esgforumafrica.com/</a>
</p>

<p>
    We look forward to welcoming you!
</p>

<div style="text-align: center; margin: 10px">
    <img style="width: 200px; margin: auto" src="{{ asset("qrcode/" . $user->code . ".png") }}" alt="QR Code">
</div>

<div style="margin: 10px 0px">
    <img src="{{ asset("images/time.png") }}" alt="Time banner">
</div>

Best Regards,<br>
{{ config('app.name') }}
</x-mail::message>