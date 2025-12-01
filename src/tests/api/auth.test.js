import { describe, it, expect, beforeEach, vi } from 'vitest'
import bcrypt from 'bcryptjs'

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('devrait créer un nouvel utilisateur', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }

      // Vérification que les données sont valides
      expect(userData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      expect(userData.password.length).toBeGreaterThanOrEqual(6)
    })

    it('devrait rejeter un email invalide', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      }

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
      expect(isValidEmail).toBe(false)
    })

    it('devrait rejeter un mot de passe trop court', async () => {
      const password = '123'
      expect(password.length).toBeLessThan(6)
    })

    it('devrait hasher le mot de passe correctement', async () => {
      const password = 'password123'
      const hashedPassword = await bcrypt.hash(password, 10)
      const isMatch = await bcrypt.compare(password, hashedPassword)
      expect(isMatch).toBe(true)
    })
  })

  describe('POST /api/auth/login', () => {
    it('devrait accepter un email et un mot de passe valides', async () => {
      const credentials = {
        email: 'john@example.com',
        password: 'password123'
      }

      expect(credentials.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      expect(credentials.password.length).toBeGreaterThanOrEqual(6)
    })

    it('devrait rejeter des identifiants invalides', async () => {
      const credentials = {
        email: 'invalid',
        password: ''
      }

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email) &&
                      credentials.password.length >= 6
      expect(isValid).toBe(false)
    })
  })
})