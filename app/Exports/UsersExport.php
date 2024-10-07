<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class UsersExport implements FromQuery, WithMapping
{
    public function query()
    {
        return User::query()->where('type', 'User')->where('confirmed', 1);
    }

    public function map($model): array
    {
        return [
            $model->title,
            $model->name,
            $model->email,
            $model->phone,
            $model->designation,
            $model->organization,
            $model->industry,
            Date::dateTimeToExcel($model->created_at),
        ];
    }
}
