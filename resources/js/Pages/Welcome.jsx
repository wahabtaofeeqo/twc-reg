import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

const industries = [
    'Process industries',
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
        attendance: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-200 text-black/50 ">
                {/* <img
                    id="background"
                    className="absolute -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                /> */}
                <div className="relative flex min-h-screen selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl mx-auto shadow-sm">
                        <main>
                            <div className="md:w-3/4 lg:w-2/4 mx-auto bg-white rounded my-5">
                                <img src="/images/macallan.jpg" alt="" className='h-60 w-full rounded-t' />
                                <div className='p-3'>
                                    {
                                        recentlySuccessful && <div className='p-3 bg-green-500 text-white rounded mb-4'>
                                            Thank you for Registering!
                                        </div>
                                    }
                                    <form onSubmit={submit}>
                                        <div>
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
                                            <InputLabel htmlFor="phone" value="Phone" />

                                            <TextInput
                                                id="phone"
                                                type="text"
                                                name="phone"
                                                value={data.phone}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('phone', e.target.value)}
                                            />

                                            <InputError message={errors.phone} className="mt-2" />
                                        </div>

                                        <div className='mt-4'>
                                            <InputLabel htmlFor="Dietary Restriction" value="Dietary Restriction" />
                                            <SelectInput 
                                                id="industry"
                                                className="w-full"
                                                name="industry"
                                                options={['Vegetarian', 'Non vegetarian', 'Lactose intolerant']}
                                                onChange={(e) => setData('industry', e.target.value)}
                                            />
                    
                                            <InputError message={errors.industry} className="mt-2" />
                                        </div>

                                        <div className="mt-6 flex items-center justify-end">
                                            <button className="py-2 px-10 rounded-lg bg-red-500 text-white" disabled={processing}>
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
