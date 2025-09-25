<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection, WithHeadings
{
    public function headings(): array
    {
        return [
            '#',
            'Name',
            'Email',
            'Industry',
            'Attendance',
            'Designation',
            'Nationality',
            'Organization',
            'Questions',
            'Masterclass',
            'Wants Mentorship',
            'Picture Consent',
            'Created At',
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Registration::select(
            'id',
            'name',
            'email',
            'industry',
            'attendance',
            'designation',
            'nationality',
            'organization',
            'questions',
            'masterclass',
            'wants_mentorship',
            'picture_consent',
            'created_at'
        )->get();
    }
}
