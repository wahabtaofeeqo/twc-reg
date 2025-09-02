import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Success = () => {
    const [confettiElements, setConfettiElements] = useState([]);
            
    useEffect(() => {
      
        const confetti = [];
        const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];
        
        for (let i = 0; i < 50; i++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.floor(Math.random() * 10) + 5;
            const left = Math.random() * 100;
            const animationDuration = (Math.random() * 3) + 2;
            
            confetti.push({
                id: i,
                color,
                size,
                left,
                animationDuration
            });
        }
        
        setConfettiElements(confetti);
    }, []);
            
    return (
        <>
        <Head title="Success" />
        <div className="relative overflow-hidden bg-white p-8 md:p-12">
            {/* Confetti animation */}
            {confettiElements.map(confetti => (
                <div 
                    key={confetti.id}
                    className="confetti animate-bounce-gentle absolute opacity-0"
                    style={{
                        backgroundColor: confetti.color,
                        width: `${confetti.size}px`,
                        height: `${confetti.size}px`,
                        left: `${confetti.left}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${confetti.animationDuration}s`
                    }}
                ></div>
            ))}
            
            <div className="text-center animate-fade-in">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                </div>
                
                {/* Heading */}
                <h1 className="playfair text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Thank You!
                </h1>
                
                {/* Message */}
                <p className="text-xl text-gray-600 mb-8">
                    Your RSVP has been successfully submitted. We're excited to celebrate with you!
                </p>
                
                {/* Details Card */}
                <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left border border-blue-100">
                    <h2 className="playfair text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        Event Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>Civic center, Ozumba Nbadiwe, VI, Lagos</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>29, Oct, 2025 at 10:00 AM</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Success;