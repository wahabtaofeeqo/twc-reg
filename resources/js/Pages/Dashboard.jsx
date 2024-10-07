import Checkbox from '@/Components/Checkbox';
import CreateUserForm from '@/Components/CreateUserForm';
import Modal from '@/Components/Modal';
import PageLink from '@/Components/PageLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({models}) {
    
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null)
    const [isOpen, setOpen] = useState(false)
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

    const reply = (model, isAccept = false) => {
        setData({user: model, type: isAccept});
        setOpen(true);
    }

    const doReply = () => {
        router.get(`/dashboard/accept/${data.user.id}/${data.type}`)
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


    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <Modal maxWidth='lg' show={isOpen} onClose={() => setOpen(false)}>
                <div className='p-4'>
                    <h4 className='font-bold text-xl mb-4'>Reply</h4>
                    <p className='mb-6'>
                        Are you sure you want to {data?.type ? 'Approve' : 'Reject'} {data?.user.name}
                    </p>

                    <div className='flex justify-end items-center gap-3'>
                        <button className='text-red-500' onClick={() => setOpen(false)}>Close</button>
                        <button className='btn bg-green-500 py-1 px-5 rounded text-white' onClick={doReply}>Proceed</button>
                    </div>
                </div>
            </Modal>

            <Modal maxWidth='lg' show={user} onClose={() => setUser(null)}>
                <div className='p-4'>
                    <CreateUserForm user={user} onCreated={() => setUser(null)}></CreateUserForm>
                </div>
            </Modal>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='md:flex justify-between mb-4 lg:px-0 p-4 items-center'>
                        <div className='px-4 w-full md:w-2/6 border bg-white p-5 mb-4 rounded'>
                            <p>Total</p>
                            <h4 className='font-bold text-xl'>{models?.total || 0}</h4>
                        </div>

                        <div className="text-end mb-6">
                            <button className='hidden' onClick={sendQr}>Send QR</button>
                            <a href="/dashboard/export-qr" className="bg-sky-900 rounded ms-6 px-3 py-2 text-white">Export Data</a>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm mx-4 lg:mx-0 rounded">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Title</th>
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Email</th>
                                        <th scope="col" className="px-6 py-3">Phone</th>
                                        <th scope="col" className="px-6 py-3">Designation</th>
                                        <th scope="col" className="px-6 py-3">Company</th>
                                        <th scope="col" className="px-6 py-3">Category</th>
                                        <th scope="col" className="px-6 py-3">Approved</th>
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        models?.data.map((model, index) => {
                                            return (
                                                <tr className="bg-white border-b" key={index}>
                                                    <td className="px-6 py-4"> {index + 1} </td>
                                                    <td className="px-6 py-4"> {model.title || 'NA'} </td>
                                                    <td className="px-6 py-4"> {model.name} </td>
                                                    <td className="px-6 py-4"> {model.email} </td>
                                                    <td className="px-6 py-4"> {model.phone} </td>
                                                    <td className="px-6 py-4"> {model.designation || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {model.organization || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {model.industry || 'N/A'} </td>
                                                    <td className="px-6 py-4"> {+model.confirmed ? 'Yes' : 'No'} </td>
                                                    <td className="px-6 py-4 flex gap-2">
                                                        {
                                                            +model.confirmed ? 
                                                            (
                                                                <button title='Reject' onClick={() => reply(model)} className='bg-red-500 py-1 px-2 text-white rounded'>
                                                                    <i className='fas fa-x'></i>
                                                                </button>
                                                            ) : 
                                                            (
                                                                <button title='Approve' onClick={() => reply(model, true)} className='bg-green-500 py-1 px-2 text-white rounded'>
                                                                    <i className='fas fa-check'></i>
                                                                </button>
                                                            )
                                                        }

                                                            <button onClick={() => setUser(model)}>
                                                                <i className="fas fa-pencil text-blue-500"></i>
                                                            </button>
                                                        
                                                        {/* <Checkbox onChange={() => onChecked(model)}></Checkbox> */}
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
