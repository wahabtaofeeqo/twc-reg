import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

const industries = [
    'Agriculture',
    'Manufacturing',
    'Consumer non durable',
    'Fashion',
    'Aerospace',
    'Automotive',
    'Food services',
    'Healthcare',
    'Insurance',
    'Tech',
    'Oil and gas',
    'Construction',
    'Travel and tourism',
    'Media and telecoms',
    'Sport',
    'Retail and apparel',
    'Defense and security',
    'Power',
    'Financial services',
    'Mining',
    'Packaging',
    'Others',
]

export default function Welcome({ }) {
  
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        nationality: '',
        organization: '',
        designation: '',
        industry: '',
        attendance: '',
        masterclass: '',
        questions: '',
        picture_consent: '',
        wants_mentorship: false
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('rsvp'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-200 text-black/50 ">
                <div className="relative flex min-h-screen selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl mx-auto shadow-sm">
                        <main>
                            <div className="md:w-3/4 lg:w-2/4 mx-auto bg-white rounded my-5">

                                <div className='overflow-hidden'>
                                    <img src="/images/bg.jpeg" alt="" className='h-[400px] w-full rounded-t' />
                                </div>

                                <div className='p-3'>
                                    {
                                        recentlySuccessful && <div className='p-3 bg-green-500 text-white rounded mb-4'>
                                            Thank you for Registering for ESG 2025
                                        </div>
                                    }
                                    <form onSubmit={submit}>
                                        <div className="mb-4">
                                            <InputLabel htmlFor="attendance" value="Attending ESG Forum Masterclass on 28th?" />

                                            <SelectInput 
                                                id="masterclass"
                                                className="w-full"
                                                name="masterclass"
                                                options={['Virtually']}
                                                onChange={(e) => setData('masterclass', e.target.value)}
                                            />

                                            <InputError message={errors.masterclass} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="attendance" value="Attending ESG Forum on 29th?" />

                                            <SelectInput 
                                                id="attendance"
                                                className="w-full"
                                                name="attendance"
                                                options={['Virtually', 'Physically']}
                                                onChange={(e) => setData('attendance', e.target.value)}
                                            />

                                            <InputError message={errors.attendance} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="name" value="Full Name" />

                                            <TextInput
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                autoComplete="name"
                                                isFocused={true}
                                                onChange={(e) => setData('name', e.target.value)}
                                            />

                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
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
                                            <InputLabel htmlFor="organization" value="Organization" />

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
                                            <InputLabel htmlFor="industry" value="Industry" />
                                            <SelectInput 
                                                id="industry"
                                                className="w-full"
                                                name="industry"
                                                options={industries}
                                                onChange={(e) => setData('industry', e.target.value)}
                                            />
                    
                                            <InputError message={errors.industry} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="question" value="Any Questions?" />
                                            <TextInput 
                                                id="question"
                                                className="w-full"
                                                name="question"
                                                onChange={(e) => setData('question', e.target.value)}
                                            />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="picture_consent" value=" Do you consent to the use of your pictures and videos taken during the ESG Forum for event content and promotional purposes (e.g., social media, website, reports)?" />
                                            <SelectInput 
                                                id="picture_consent"
                                                className="w-full"
                                                name="picture_consent"
                                                options={['Yes, I consent', 'No, I do not consent']}
                                                onChange={(e) => setData('picture_consent', e.target.value)}
                                            />
                    
                                            <InputError message={errors.picture_consent} className="mt-2" />
                                        </div>

                                       <div className="mt-4 block">
                                            <label className="flex items-center">
                                                <Checkbox
                                                    name="mentorship"
                                                    checked={data.wants_mentorship}
                                                    onChange={(e) =>
                                                        setData('wants_mentorship', e.target.checked)
                                                    }
                                                />
                                                <span className="ms-2 text-sm text-gray-600">
                                                    Join Mentorship Program
                                                </span>
                                            </label>
                                        </div>

                                        <div className="mt-6 flex items-center justify-end">
                                            <button className="py-2 px-10 rounded-lg bg-sky-500 text-white" disabled={processing}>
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
