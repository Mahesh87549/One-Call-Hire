import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Worker } from '../types/worker'

interface WorkerContextType {
    workers: Worker[]
    addWorker: (workerData: any) => void
    updateWorker: (id: string, updates: Partial<Worker>) => void
}

const WorkerContext = createContext<WorkerContextType | undefined>(undefined)

export function WorkerProvider({ children }: { children: React.ReactNode }) {
    const [workers, setWorkers] = useState<Worker[]>(() => {
        const saved = localStorage.getItem('workers')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('workers', JSON.stringify(workers))
    }, [workers])

    const addWorker = (workerData: any) => {
        const newWorker: Worker = {
            id: crypto.randomUUID(),
            ...workerData,
            joinedDate: new Date().toISOString(),
            status: 'Available'
        }
        setWorkers(prev => [newWorker, ...prev])
    }

    const updateWorker = (id: string, updates: Partial<Worker>) => {
        setWorkers(prev => prev.map(worker =>
            worker.id === id ? { ...worker, ...updates } : worker
        ))
    }

    return (
        <WorkerContext.Provider value={{ workers, addWorker, updateWorker }}>
            {children}
        </WorkerContext.Provider>
    )
}

export const useWorkers = () => {
    const context = useContext(WorkerContext)
    if (context === undefined) {
        throw new Error('useWorkers must be used within a WorkerProvider')
    }
    return context
}
