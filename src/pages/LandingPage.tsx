import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Smartphone, Menu, X } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function LandingPage() {
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-200 dark:selection:bg-teal-900 relative flex flex-col">

            {/* Navbar */}
            <nav className="w-full z-50 bg-transparent pt-4 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl backdrop-blur-sm">
                            <Smartphone className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
                            One Call Hire
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Button variant="ghost" className="hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-300" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                        <Button
                            className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20 rounded-full px-6 transition-all transform hover:-translate-y-0.5"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-24 left-4 right-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 flex flex-col gap-4"
                        >
                            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/login')}>Login</Button>
                            <Button className="w-full bg-teal-600 text-white" onClick={() => navigate('/signup')}>Get Started</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Main Content - Centered */}
            <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 -mt-10">
                {/* Natural Background Elements */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-teal-300/20 rounded-full blur-[80px] mix-blend-multiply opacity-70 animate-pulse" />
                    <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-sky-300/20 rounded-full blur-[80px] mix-blend-multiply opacity-70 animate-pulse delay-1000" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6 leading-[1.1]">
                            Hiring made <span className="text-teal-600 dark:text-teal-400 font-serif italic relative">
                                <span className="relative z-10">effortless.</span>
                                <span className="absolute bottom-2 left-0 w-full h-3 bg-teal-200/50 dark:bg-teal-900/50 -rotate-1 z-0"></span>
                            </span>
                        </h1>

                        <p className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                            Connect with verified talent in real-time. <br className="hidden md:block" />
                            Simple, secure, and refreshing.
                        </p>

                        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-teal-600 hover:bg-teal-700 text-white h-14 px-10 text-lg rounded-full shadow-xl shadow-teal-600/20 transition-all hover:scale-105"
                                onClick={() => navigate('/signup')}
                            >
                                Start Hiring Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 px-10 text-lg rounded-full border-teal-200/50 bg-white/40 hover:bg-white/80 text-teal-800 shadow-sm backdrop-blur-sm"
                                onClick={() => navigate('/guest')}
                            >
                                Explore Jobs
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer - Pinned to bottom, minimal */}
            <footer className="py-6 text-center text-slate-400 text-xs relative z-10">
                <div className="flex justify-center items-center gap-2 mb-1 opacity-50">
                    <Smartphone className="w-3 h-3" />
                    <span className="font-semibold tracking-wide uppercase">One Call Hire</span>
                </div>
                <p className="opacity-40">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </footer>
        </div>
    )
}
