import { getApiConfig } from '@/config/api'
import { getToken } from '@/utils/auth'

// Types
export interface Appointment {
  id: string
  doctorName: string
  speciality: string
  appointmentDate: string
  appointmentTime: string
  status: string
  patientId?: string
  doctorId?: string
  notes?: string
  location?: string
}

export interface AppointmentResponse {
  data: Appointment[]
  total: number
  page: number
  limit: number
}

export type AppointmentPeriod = 'upcoming' | 'ongoing' | 'archives'

// Fonction utilitaire pour faire des appels API
const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const config = getApiConfig()
  const token = getToken()
  const url = `${config.baseURL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      ...config.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  }

  console.log(`🌐 API Call: ${url}`, defaultOptions)
  
  return fetch(url, defaultOptions)
}

// Fonction pour récupérer les rendez-vous par période
export const getAppointmentsByPeriod = async (period: AppointmentPeriod): Promise<Appointment[]> => {
  try {
    const response = await apiCall(`/api/v1/appointment`, {
      method: 'GET',
      // Ajouter les paramètres de période dans l'URL ou le body selon l'API
      // body: JSON.stringify({
      //   period: period,
      //   // patientId: getCurrentPatientId(), // si nécessaire
      //   // limit: 50,
      //   // page: 1
      // })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: AppointmentResponse = await response.json()
    
    // Si l'API retourne directement un tableau
    if (Array.isArray(data)) {
      return data
    }
    
    // Si l'API retourne un objet avec une propriété data
    if (data && data.data && Array.isArray(data.data)) {
      return data.data
    }
    
    // Si l'API retourne un objet avec d'autres propriétés
    if (data && Array.isArray(data)) {
      return data
    }
    
    console.warn('Format de réponse API inattendu:', data)
    return []
    
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous:', error)
    throw error
  }
}

// Fonction pour récupérer un rendez-vous par ID
export const getAppointmentById = async (id: string): Promise<Appointment | null> => {
  try {
    const response = await apiCall(`/api/v1/appointment/${id}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Erreur lors de la récupération du rendez-vous:', error)
    throw error
  }
}

// Fonction pour créer un nouveau rendez-vous
export const createAppointment = async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
  try {
    const response = await apiCall('/api/v1/appointment', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Erreur lors de la création du rendez-vous:', error)
    throw error
  }
}

// Fonction pour mettre à jour un rendez-vous
export const updateAppointment = async (id: string, appointmentData: Partial<Appointment>): Promise<Appointment> => {
  try {
    const response = await apiCall(`/api/v1/appointment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rendez-vous:', error)
    throw error
  }
}

// Fonction pour annuler un rendez-vous
export const cancelAppointment = async (id: string, reason?: string): Promise<Appointment> => {
  try {
    const response = await apiCall(`/api/v1/appointment/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Erreur lors de l\'annulation du rendez-vous:', error)
    throw error
  }
}

// Fonction pour confirmer un rendez-vous
export const confirmAppointment = async (id: string): Promise<Appointment> => {
  try {
    const response = await apiCall(`/api/v1/appointment/${id}/confirm`, {
      method: 'POST'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Erreur lors de la confirmation du rendez-vous:', error)
    throw error
  }
}
