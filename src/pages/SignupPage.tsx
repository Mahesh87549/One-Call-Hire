import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Briefcase, ArrowRight, Smartphone, Mail, Lock } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useNavigate } from 'react-router-dom'

export default function SignupPage() {
    const navigate = useNavigate()
    const [role, setRole] = useState<'worker' | 'employer'>('worker')
    const [isLoading, setIsLoading] = useState(false)

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Mock Signup
        setTimeout(() => {
            setIsLoading(false)
            navigate('/dashboard')
        }, 1000)
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-8 text-center bg-teal-600/5 dark:bg-teal-900/10">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/30 text-teal-600 mb-4">
                        <Smartphone className="w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Join One Call Hire</h1>
                    <p className="text-gray-500 text-sm">Create your account to get started.</p>
                </div>

                <div className="p-8 pt-0">
                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setRole('worker')}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${role === 'worker'
                                ? 'border-teal-600 bg-teal-600/5 text-teal-700 dark:text-teal-400'
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <User className="w-6 h-6" />
                            <span className="text-sm font-medium">I'm a Worker</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('employer')}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${role === 'employer'
                                ? 'border-teal-600 bg-teal-600/5 text-teal-700 dark:text-teal-400'
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                        >
                            <Briefcase className="w-6 h-6" />
                            <span className="text-sm font-medium">I'm an Employer</span>
                        </button>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input className="pl-10" placeholder="e.g. Jane Doe" required />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input type="email" className="pl-10" placeholder="name@example.com" required />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input type="password" className="pl-10" placeholder="••••••••" required />
                            </div>
                        </div>

                        <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4">
                            {isLoading ? 'Creating Account...' : `Sign Up as ${role === 'worker' ? 'Worker' : 'Employer'}`}
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Already have an account? <span className="font-semibold text-teal-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}>Log In</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
