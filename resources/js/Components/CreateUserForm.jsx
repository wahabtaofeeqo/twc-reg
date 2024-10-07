import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import { useEffect } from 'react';
import Checkbox from './Checkbox';
import { useState } from 'react';

const industries = [
    'Government and Regulatory Authorities', 
    'Members', 
    'Issuers', 
    'Media Partners',
    'FMDQ Staff',
    'Others'
]

export default function CreateUserForm({onCreated, user}) {

    const [other, setOther] = useState('')
    const { data, setData, post, patch, processing, errors, reset, recentlySuccessful } = useForm({
        title: '',
        email: '',
        phone: '',
        firstname: '',
        lastname: '',
        nationality: '',
        organization: '',
        designation: '',
        industry: '',
        attendance: '',
        terms: false
    });

    const submit = (e) => {
        e.preventDefault();
        if(other) setData('industry', other);

        let option = {
            onSuccess: () => {
                reset()
                if(onCreated instanceof Function) {
                    onCreated()
                }
            },
        }

        if(!user) post(route('register'), option);
        else patch(`/dashboard/profile/${user.id}`, option);
    };

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    useEffect(() => {
        if(user) {
            let populate = {
                ...user
            }

            let name = user.name.split(' ');
            populate.firstname = name[0];
            populate.lastname = name[1] || '';

            //
            setData(populate);
        }
    }, []);

    return (
        <form onSubmit={submit}>
        <p className="text-red-500 mb-4">
            Asterisk (*) fields are mandatory
        </p>
        <div>
            <div className="flex mb-2">
                <InputLabel htmlFor="title" value="Title" />
                <small className='text-red-500'>*</small>
            </div>

            <SelectInput 
                id="title"
                className="w-full"
                name="title"
                isFocused={true}
                value={data.title}
                options={['Mr', 'Mrs', 'Ms', 'Dr', 'Professor']}
                onChange={(e) => setData('title', e.target.value)}
            />

            <InputError message={errors.title} className="mt-2" />
        </div>

        <div className='lg:flex gap-3 mt-4'>
            <div className='basis-2/4'>
                <div className="mb-2 flex">
                    <InputLabel htmlFor="firstname" value="First Name" />
                    <small className='text-red-500'>*</small>
                </div>
                <TextInput
                    id="firstname"
                    type="text"
                    name="firstname"
                    value={data.firstname}
                    className="mt-1 block w-full"
                    autoComplete="name"
                    onChange={(e) => setData('firstname', e.target.value)}
                />

                <InputError message={errors.firstname} className="mt-2" />
            </div>

            <div className='basis-2/4'>
                <div className="mb-2 flex">
                    <InputLabel htmlFor="lastname" value="Last Name" />
                    <small className='text-red-500'>*</small>
                </div>

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
           <div className="mb-2 flex">
                <InputLabel htmlFor="nationality" value="Nationality" />
                <small className='text-red-500'>*</small>
           </div>

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
            <div className="mb-2 flex">
                <InputLabel htmlFor="email" value="Email Address" />
                <small className='text-red-500'>*</small>
            </div>

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
           <div className="mb-2 flex">
                <InputLabel htmlFor="phone" value="Phone Number" />
                <small className='text-red-500'>*</small>
           </div>

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
            <div className="mb-2 flex">
                <InputLabel htmlFor="designation" value="Designation" />
                <small className='text-red-500'>*</small>
            </div>

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
            <div className="mb-2 flex">
                <InputLabel htmlFor="organization" value="Company" />
                <small className='text-red-500'>*</small>
            </div>

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
            <div className="mb-2 flex">
                <InputLabel htmlFor="industry" value="Category" />
                <small className='text-red-500'>*</small>
            </div>

            <SelectInput 
                id="industry"
                className="w-full"
                name="industry"
                value={data.industry}
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

        {
            user == null && (
                <>
                 <div className="mt-5 block">
                    <label className="flex items-start gap-3">
                        <Checkbox
                            name="terms"
                            checked={data.terms}
                            onChange={(e) =>
                                setData('terms', e.target.checked)
                            }
                        />
                        <span className="text-sm text-gray-600 italic">
                            By Providing your personal data, you acknowledge that you have read and understood FMDQ's Privacy Policy <a href="http://fmdqgroup.com/privacy-policy" className='text-blue-500' target="_blank">Privacy Policy</a> and you hereby consent to the collection, processing, and sharing of your information by FMDQ Group PLC and its subsidiaries for the purposes outlined in the Privacy Policy. You may however withdraw your consent at anytime by contacting us at <a href="mailto:privacypolicy@fmdqgroup.com" className='text-blue-500'>privacypolicy@fmdqgroup.com</a>
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
                </>
            )
        }

        <div className="mt-6 flex items-center justify-end">
            <button className="py-2 px-10 rounded-lg bg-sky-900 text-white" disabled={processing || (!data.terms && !user)}>
                {user ? 'Update' : 'Register'}
            </button>
        </div>
    </form>
    );
}
