import CreateUserForm from '@/Components/CreateUserForm';;
import Modal from '@/Components/Modal';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({auth, errors}) {
  
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <Head title="Welcome" />
            <Modal maxWidth='xl' show={isOpen} onClose={() => setOpen(false)}>
                <div className='p-4'>
                    <h4 className='font-bold text-xl mb-4 hidden'>RSVP Received</h4>
                    <p className='mb-4 text-sky-900 italic text-justify'>
                        Thank you for submitting your RSVP for the 2025 FMDQ GOLD Awards Ceremony. Your request will be reviewed by FMDQ Group PLC, who reserves the right to approve all attendance requests.
                    </p>

                    <div className='text-end'>
                        <button className='text-red-500' onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            </Modal>

            <div className="bg-sky- text-black/50" style={{backgroundColor: '#23346a'}}>
                {/* <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                /> */}
                <div className="relative flex min-h-screen selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl mx-auto shadow-sm">
                        <main>
                            <div className="md:w-3/4 lg:w-3/4 mx-auto bg-white rounded my-5">
                                <div className="overflow-hidden h-auto md:h-80"> 
                                    <img src="/images/banner.png" alt="banner" className='w-full rounded-t h-full' />
                                </div>
                                <div className='p-6'>
                                    {
                                        errors?.message 
                                            ? <p className='text-red-500 mb-4 font-bold'>{errors?.message}</p> : ''
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
