import Checkbox from '@/Components/Checkbox';
import PageLink from '@/Components/PageLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({models, masterclass, virtualCount}) {

    const [selectedUsers, setUsers] = useState([]);
    
    const sendQr = () => {
        let IDs  = selectedUsers;
        if(IDs.length) {
            router.post(route('send'), {ids: IDs}, {
                onSuccess: () => {
                    setUsers([])
                }
            })
        }
    }
    
    const onChecked = (model) => {
        let users = selectedUsers;
        let index = users.findIndex(item => item == model.id);
        if(index == -1) {
            if(users.length >= 5) {
                alert('Select only 5 persons at a time to send SMS to')
            }
            else users.push(model.id);
        }
        else {
            users.splice(index, 1);
        }

        setUsers(users);
    }

    const search = (e) => {
        let query = e.target.value;
        router.get(route('dashboard'), {search: query}, {
            preserveState: true,
            replace: true
        })
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="text-end mb-4 px-4">
                        <button onClick={sendQr} className='text-sm'>Send QR</button>
                        <a href="/dashboard/export-qr" className="bg-sky-500 rounded ms-6 px-3 py-2 text-white text-sm">Export Data</a>
                    </div>

                    <div className='md:flex gap-3 mb-4 lg:px-0 p-4 items-center'>
                        <div className='px-4 w-full md:w-2/6 border bg-white p-5 mb-4 rounded'>
                            <p className='mb-3'>Forum</p>
                            <p className='text-slate-400 text-sm'>All: {models.total || 0}</p>
                            <p className='text-slate-400 text-sm'>Virtual: {virtualCount || 0}</p>
                        </div>

                        <div className='px-4 w-full md:w-2/6 border bg-white p-5 mb-4 rounded'>
                            <p className='mb-3'>Masterclass</p>
                            <p className='text-slate-400 text-sm'>All: {masterclass?.all || 0}</p>
                            <p className='text-slate-400 text-sm'>Virtual: {masterclass?.virtual || 0}</p>
                        </div>
                    </div>

                    <div className='mb-3'>
                        <input type="text" 
                            className='p-2 rounded w-1/3 outline-none' 
                            placeholder='Search people...' 
                            onChange={search}
                        />
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm mx-4 lg:mx-0 rounded">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-nowrap">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Designation</th>
                                        <th scope="col" className="px-6 py-3">Industry</th>
                                        <th scope="col" className="px-6 py-3">Nationality</th>
                                        <th scope="col" className="px-6 py-3">Masterclass</th>
                                        <th scope="col" className="px-6 py-3">Questions</th>
                                        <th scope="col" className="px-6 py-3">Want Mentorship</th>
                                        <th scope="col" className="px-6 py-3 text-nowrap">Use Pictures for Media</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        models?.data.map((model, index) => {
                                            return (
                                                <tr className="bg-white border-b text-nowrap" key={index}>
                                                    <td className="px-6 py-4"> {index + 1} </td>
                                                    <td className="px-6 py-4"> {model.name} </td>
                                                    <td className="px-6 py-4"> {model.email} </td>
                                                    <td className="px-6 py-4"> {model.designation || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {model.industry || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {model.nationality || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {model.masterclass || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {model.questions || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {model.wants_mentorship ? 'Yes' : 'No'} </td>
                                                    <td className="px-6 py-4"> {model.picture_consent|| 'N/A'} </td>
                                                    <td className="px-6 py-4">
                                                        <Checkbox onChange={() => onChecked(model)}></Checkbox>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    {
                                        models.data.length == 0 && (<tr>
                                            <td className='text-center pt-5' colSpan={8}>No Records Found</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className='px-6 py-3'>
                            <PageLink links={models.links}></PageLink>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
