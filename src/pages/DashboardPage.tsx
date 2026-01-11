import { UserPlus } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
            >
                <div className="w-20 h-20 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserPlus className="w-10 h-10 text-teal-600 dark:text-teal-400" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">
                    Onboard Your First Worker
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                    Get started by adding workers to your platform. Once onboarded, they will be available for client assignments.
                </p>

                <Button
                    className="h-12 px-8 text-lg bg-teal-600 hover:bg-teal-700 shadow-xl shadow-teal-600/20"
                    onClick={() => navigate('/dashboard/onboarding')}
                >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Onboard New Worker
                </Button>
            </motion.div>
        </div>
    )
}
