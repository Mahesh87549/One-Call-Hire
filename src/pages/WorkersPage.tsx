import { motion } from 'framer-motion'
import { Plus, User, MapPin, Briefcase } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { useWorkers } from '../context/WorkerContext'

export default function WorkersPage() {
    const navigate = useNavigate()
    const { workers } = useWorkers()

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Workers</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your onboarded workforce.</p>
                </div>
                <Button onClick={() => navigate('/dashboard/onboarding')} className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Onboard Worker
                </Button>
            </div>

            {workers.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No workers found</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Start by onboarding your first worker.</p>
                    <Button variant="outline" onClick={() => navigate('/dashboard/onboarding')}>
                        Onboard Now
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workers.map((worker) => (
                        <motion.div
                            key={worker.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="p-6 flex items-start space-x-4">
                                <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center shrink-0 overflow-hidden">
                                    {worker.photo ? (
                                        <img src={worker.photo} alt={worker.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-8 h-8 text-teal-600" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{worker.name}</h3>
                                    <p className="text-sm text-gray-500 capitalize">{worker.gender}, {worker.age} years</p>

                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                                            {worker.experience} years exp
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 truncate">
                                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                            <span className="truncate">{worker.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${worker.status === 'Available' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {worker.status}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                        onClick={() => navigate(`/dashboard/workers/${worker.id}/edit`)}
                                    >
                                        Edit
                                    </button>
                                    <button className="text-xs font-medium text-teal-600 hover:text-teal-700">View</button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
