import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const industries = [
    // 'Process industries',
    // 'Consumer non durable',
    // 'Fashion',
    // 'Aerospace',
    // 'Automotive',
    // 'Food services',
    // 'Healthcare',
    // 'Insurance',
    // 'Tech',
    // 'Oil and gas',
    // 'Construction',
    // 'Travel and tourism',
    // 'Media and telecoms',
    // 'Sport',
    // 'Retail and apparel',
    // 'Defense and security',
    // 'Power',
    // 'Financial services',
    // 'Mining',
    // 'Packaging',
    'Government and Regulatory Authorities', 
    'Corporates', 
    'Members', 
    'Strategic Partners', 
    'Issuers', 
    'Investors', 
    'Media',
    'Others'
]

export default function Welcome({ }) {
  
    const [other, setOther] = useState('')
    const [isOpen, setOpen] = useState(false)
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        title: '',
        email: '',
        phone: '',
        firstname: '',
        lastname: '',
        nationality: '',
        organization: '',
        designation: '',
        industry: '',
        attendance: ''
    });

    const submit = (e) => {
        e.preventDefault();
        if(other) setData('industry', other)
        post(route('register'), {
            onSuccess: () => {
                reset()
                setOpen(true)
            },
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <Modal maxWidth='xl' show={isOpen} onClose={() => setOpen(false)}>
                <div className='p-4'>
                    <h4 className='font-bold text-xl mb-4'>RSVP received</h4>
                    <p className='mb-4'>
                        Thank you for RSVPing for the 2024 FMDQ GOLD Awards Ceremony. Your RSVP will be reviewed by FMDQ Group PLC, who reserves the right to approve all attendance requests.
                    </p>

                    <div className='text-end'>
                        <button className='text-red-500' onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            </Modal>

            <div className="bg-gray-200 text-black/50 ">
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
                                        recentlySuccessful && <div className='p-3 bg-green-500 text-white rounded mb-4'>
                                            Thank you for Registering for ESG 2024
                                        </div>
                                    }
                                    <form onSubmit={submit}>
                                        <div>
                                            <InputLabel htmlFor="title" value="Title" />

                                            <SelectInput 
                                                id="title"
                                                className="w-full"
                                                name="title"
                                                options={['Mr', 'Mrs', 'Ms', 'Dr', 'Professor']}
                                                onChange={(e) => setData('title', e.target.value)}
                                            />

                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div className='lg:flex gap-3 mt-4'>
                                            <div className='basis-2/4'>
                                                <InputLabel htmlFor="firstname" value="First Name" />

                                                <TextInput
                                                    id="firstname"
                                                    type="text"
                                                    name="firstname"
                                                    value={data.firstname}
                                                    className="mt-1 block w-full"
                                                    autoComplete="name"
                                                    isFocused={true}
                                                    onChange={(e) => setData('firstname', e.target.value)}
                                                />

                                                <InputError message={errors.firstname} className="mt-2" />
                                            </div>

                                            <div className='basis-2/4'>
                                                <InputLabel htmlFor="lastname" value="Last Name" />

                                                <TextInput
                                                    id="lastname"
                                                    type="text"
                                                    name="lastname"
                                                    value={data.lastname}
                                                    className="mt-1 block w-full"
                                                    autoComplete="name"
                                                    onChange={(e) => setData('lastname', e.target.value)}
                                                />

                                                <InputError message={errors.lastname} className="mt-2" />
                                            </div>
                                        </div>

                                        <div className='mt-4 hidden'>
                                            <InputLabel htmlFor="nationality" value="Nationality" />

                                            <TextInput
                                                id="nationality"
                                                type="text"
                                                name="nationality"
                                                value={data.nationality}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('nationality', e.target.value)}
                                            />

                                            <InputError message={errors.nationality} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="email" value="Email Address" />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                autoComplete="username"
                                                onChange={(e) => setData('email', e.target.value)}
                                            />

                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="phone" value="Phone Number" />

                                            <TextInput
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                value={data.phone}
                                                className="mt-1 block w-full"
                                                autoComplete="phone"
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />

                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="organization" value="Company" />

                                            <TextInput
                                                id="organization"
                                                type="text"
                                                name="organization"
                                                value={data.organization}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('organization', e.target.value)}
                                            />

                                            <InputError message={errors.organization} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="designation" value="Designation" />

                                            <TextInput
                                                id="designation"
                                                type="text"
                                                name="designation"
                                                value={data.designation}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('designation', e.target.value)}
                                            />

                                            <InputError message={errors.designation} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="industry" value="Category" />
                                            <SelectInput 
                                                id="industry"
                                                className="w-full"
                                                name="industry"
                                                options={industries}
                                                onChange={(e) => setData('industry', e.target.value)}
                                            />
                    
                                            <InputError message={errors.industry} className="mt-2" />
                                        </div>

                                        {
                                            data.industry.toLowerCase() == 'others' && (
                                                <div className='mt-2'>
                                                    <TextInput
                                                        type="text"
                                                        value={other}
                                                        className="mt-1 block w-full"
                                                        onChange={(e) => setOther(e.target.value)}
                                                    />
                                                </div>
                                            )
                                        }

                                        <div className="mt-4 hidden">
                                            <InputLabel htmlFor="attendance" value="Attending Physically OR Virtually" />

                                            <SelectInput 
                                                id="attendance"
                                                className="w-full"
                                                name="attendance"
                                                options={['Virtually', 'Physically']}
                                                onChange={(e) => setData('attendance', e.target.value)}
                                            />

                                            <InputError message={errors.attendance} className="mt-2" />
                                        </div>

                                        <div className="mt-5 block">
                                            <label className="flex items-start gap-3">
                                                <Checkbox
                                                    name="remember"
                                                    checked={data.remember}
                                                    onChange={(e) =>
                                                        setData('remember', e.target.checked)
                                                    }
                                                />
                                                <span className="text-sm text-gray-600 italic">
                                                    If you content to us storing your personal information for the purpose of responding to your enqueries, please check this box
                                                </span>
                                            </label>
                                        </div>

                                        <div className="mt-4 block">
                                            <label className="flex items-start gap-3">
                                                <Checkbox
                                                    name="remember"
                                                    checked={data.remember}
                                                    onChange={(e) =>
                                                        setData('remember', e.target.checked)
                                                    }
                                                />
                                                <span className="ms-2 text-sm text-gray-600 italic">
                                                    I would like to receive information about FMDQ
                                                </span>
                                            </label>
                                        </div>


                                        <div className="mt-6 flex items-center justify-end">
                                            <button className="py-2 px-10 rounded-lg bg-sky-900 text-white" disabled={processing}>
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </main>                      
                    </div>
                </div>
            </div>
        </>
    );
}
