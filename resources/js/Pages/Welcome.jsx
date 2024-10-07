import CreateUserForm from '@/Components/CreateUserForm';;
import Modal from '@/Components/Modal';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ }) {
  
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Head title="Welcome" />
            <Modal maxWidth='xl' show={isOpen} onClose={() => setOpen(false)}>
                <div className='p-4'>
                    <h4 className='font-bold text-xl mb-4'>RSVP Received</h4>
                    <p className='mb-4 text-sky-900 italic'>
                        Thank you for RSVPing for the 2024 FMDQ GOLD Awards Ceremony. Your RSVP will be reviewed by FMDQ Group PLC, who reserves the right to approve all attendance requests.
                    </p>

                    <div className='text-end'>
                        <button className='text-red-500' onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            </Modal>

            <div className="bg-sky-900 text-black/50 ">
                {/* <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                /> */}
                <div className="relative flex min-h-screen selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl mx-auto shadow-sm">
                        <main>
                            <div className="md:w-3/4 lg:w-2/4 mx-auto bg-white rounded my-5 p-3">
                                <img src="/images/FMDQ.png" alt="" className='h-auto w-full rounded-t' />
                                <div className='p-3'>
                                    {
                                        isOpen && <div className='p-3 bg-green-500 text-white rounded mb-4'>
                                            Thank you for Registering for ESG 2024
                                        </div>
                                    }

                                    <CreateUserForm onCreated={() => setOpen(true)}></CreateUserForm>
                                </div>
                            </div>
                        </main>                      
                    </div>
                </div>
            </div>
        </>
    );
}
