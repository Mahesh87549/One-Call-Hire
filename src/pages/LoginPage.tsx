import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, ArrowRight, Smartphone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Mock Authentication Logic
        setTimeout(() => {
            if (username === 'Mahesh' && password === '1') {
                setIsLoading(false)
                window.location.href = "/dashboard"
            } else {
                setIsLoading(false)
                setError('Invalid credentials. Please try again.')
            }
        }, 1000)
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-teal-900/10 dark:bg-teal-900/30" />
                <img
                    src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2544&auto=format&fit=crop"
                    alt="Nature Background"
                    className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-teal-800/60 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl p-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-5xl bg-white/10 dark:bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2 border border-white/20"
                >
                    {/* Left Side - Brand & Vibes */}
                    <div className="hidden lg:flex flex-col justify-center p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/20 to-transparent" />
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative z-10"
                        >
                            {/* Content placeholder for future image */}
                        </motion.div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="bg-white/90 dark:bg-gray-900/90 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                        <div className="mb-8 text-center lg:text-left">
                            <div className="inline-flex lg:hidden w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-xl items-center justify-center mb-6">
                                <Smartphone className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                            </div>
                            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-400 dark:to-teal-200 mb-2">
                                One Call Hire
                            </h1>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
                            <p className="text-gray-500 text-sm mt-1">Welcome back, Admin.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            {error && (
                                <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 border border-red-200 rounded-lg">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-1.5">
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-teal-600 transition-colors" />
                                    <Input
                                        type="text"
                                        placeholder="Username"
                                        className="pl-10 h-11 bg-gray-50 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all font-sans"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="relative group">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className="pl-4 pr-10 h-11 bg-gray-50 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20 transition-all font-sans"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                <div className="flex justify-end items-center mt-1">
                                    <a href="#" className="text-xs font-semibold text-teal-600 hover:text-teal-700">Forgot password?</a>
                                </div>
                            </div>

                            <Button className="w-full h-11 bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 transition-all duration-300 mt-2">
                                {isLoading ? 'Authenticating...' : 'Sign In'} <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500">
                                Don't have an account? <a href="#" className="font-semibold text-teal-600 hover:text-teal-700">Contact Admin</a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
