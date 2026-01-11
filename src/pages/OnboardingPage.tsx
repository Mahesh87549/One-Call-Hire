import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Upload, User, MapPin, Briefcase, Calendar, ChevronLeft, Phone } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { useNavigate, useParams } from 'react-router-dom'

import { useWorkers } from '../context/WorkerContext'

export default function OnboardingPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { workers, addWorker, updateWorker } = useWorkers()
    const isEditMode = Boolean(id)

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: 'select',
        experience: '',
        address: '',
        mobile: '',
        skills: '',
        hourlyRate: '',
        availability: 'Full-time',
        photo: null as File | null
    })
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isEditMode && id) {
            const workerToEdit = workers.find(w => w.id === id)
            if (workerToEdit) {
                setFormData({
                    name: workerToEdit.name,
                    age: workerToEdit.age.toString(),
                    gender: workerToEdit.gender,
                    experience: workerToEdit.experience.toString(),
                    address: workerToEdit.address,
                    mobile: workerToEdit.mobile || '',
                    skills: workerToEdit.skills?.join(', ') || '',
                    hourlyRate: workerToEdit.hourlyRate?.toString() || '',
                    availability: workerToEdit.availability || 'Full-time',
                    photo: null
                })
                setPreviewUrl(workerToEdit.photo)
            }
        }
    }, [isEditMode, id, workers])

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData({ ...formData, photo: file })
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const workerData = {
            name: formData.name,
            age: parseInt(formData.age),
            gender: formData.gender,
            experience: parseInt(formData.experience),
            address: formData.address,
            mobile: formData.mobile,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
            hourlyRate: parseInt(formData.hourlyRate) || 0,
            availability: formData.availability,
            photo: previewUrl
        }

        setTimeout(() => {
            if (isEditMode && id) {
                updateWorker(id, workerData)
                alert("Worker updated successfully!")
            } else {
                addWorker(workerData)
                alert("Worker onboarded successfully!")
            }
            setIsLoading(false)
            navigate('/dashboard/workers')
        }, 1000)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/workers')}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{isEditMode ? 'Edit Worker Profile' : 'New Worker Profile'}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {isEditMode ? 'Update the details below.' : 'Fill in the details to onboard a new worker.'}
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
            >
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Photo Upload */}
                    <div className="flex justify-center mb-8">
                        <div className="relative group cursor-pointer">
                            <div className={`w-32 h-32 rounded-full flex items-center justify-center border-2 border-dashed ${previewUrl ? 'border-teal-500' : 'border-gray-300'} overflow-hidden bg-gray-50 dark:bg-gray-800 transition-colors hover:bg-gray-100`}>
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-4">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <span className="text-xs text-gray-500">Upload Photo</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    placeholder="e.g. John Doe"
                                    className="pl-10"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    type="tel"
                                    placeholder="e.g. +1 234 567 890"
                                    className="pl-10"
                                    required
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    type="number"
                                    placeholder="e.g. 28"
                                    className="pl-10"
                                    required
                                    min="18"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                required
                            >
                                <option value="select" disabled>Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience (Years)</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                <Input
                                    type="number"
                                    placeholder="e.g. 5"
                                    className="pl-10"
                                    required
                                    min="0"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hourly Rate ($)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-400 font-bold">$</span>
                                <Input
                                    type="number"
                                    placeholder="e.g. 25"
                                    className="pl-10"
                                    min="0"
                                    value={formData.hourlyRate || ''}
                                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.availability || 'Full-time'}
                                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            >
                                <option value="Full-time">Full-time (Mon-Fri)</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Weekends">Weekends Only</option>
                                <option value="Flexible">Flexible / On-call</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills (Comma separated)</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input
                                placeholder="e.g. Carpentry, Plumbing, Painting"
                                className="pl-10"
                                value={formData.skills || ''}
                                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address / Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Current City & Address"
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={isLoading}>
                            {isLoading ? 'Saving...' : (isEditMode ? 'Update Worker' : 'Complete Onboarding')}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
