export interface Worker {
    id: string
    name: string
    age: number
    gender: string
    experience: number
    address: string;
    mobile?: string;
    photo: string | null;
    joinedDate: string
    status: 'Available' | 'Busy' | 'Offline';
    skills?: string[];
    hourlyRate?: number;
    availability?: string; // e.g., "Full-time", "Weekends", "Mon-Fri"
}

export type WorkerContextType = {
    workers: Worker[]
    addWorker: (worker: Omit<Worker, 'id' | 'joinedDate' | 'status'>) => void
}
