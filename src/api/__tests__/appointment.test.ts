// Tests pour l'API des rendez-vous
import { getAppointmentsByPeriod, type AppointmentPeriod } from '../appointment'

// Mock de l'API
const mockFetch = jest.fn()
global.fetch = mockFetch

describe('Appointment API', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  describe('getAppointmentsByPeriod', () => {
    it('should fetch upcoming appointments', async () => {
      const mockAppointments = [
        {
          id: '1',
          doctorName: 'Dr. Smith',
          speciality: 'Cardiologist',
          appointmentDate: '2024-01-15',
          appointmentTime: '10:30',
          status: 'confirmed'
        }
      ]

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAppointments
      })

      const result = await getAppointmentsByPeriod('upcoming')
      
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/v1/appointment/filter-appointment-by-period'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ period: 'upcoming' })
        })
      )
      
      expect(result).toEqual(mockAppointments)
    })

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      })

      await expect(getAppointmentsByPeriod('upcoming')).rejects.toThrow()
    })

    it('should handle different period types', async () => {
      const periods: AppointmentPeriod[] = ['upcoming', 'ongoing', 'archives']
      
      for (const period of periods) {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => []
        })

        await getAppointmentsByPeriod(period)
        
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('/api/v1/appointment/filter-appointment-by-period'),
          expect.objectContaining({
            method: 'POST',
            body: JSON.stringify({ period })
          })
        )
      }
    })
  })
})
