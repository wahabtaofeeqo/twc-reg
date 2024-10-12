<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromQuery, WithMapping, WithHeadings
{
    public function query()
    {
        return User::query()->where('type', 'User');
    }

    public function map($model): array
    {
        $status = 'Pending';
        if($model->confirmed == 1) 
            $status = 'Yes';

        if($model->confirmed == 2) 
            $status = 'No';

        return [
            $model->title,
            $model->name,
            $model->email,
            $model->phone,
            $model->designation,
            $model->organization,
            $model->industry,
            $status,
            Date::dateTimeToExcel($model->created_at),
        ];
    }

    public function headings(): array
    {
        return [
            'Title',
            'Name',
            'Email',
            'Phone',
            'Designation',
            'Company',
            'Category',
            'Approved',
            'Date'
        ];
    }
}
