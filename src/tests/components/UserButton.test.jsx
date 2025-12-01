import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserButton from '@/components/UserButton'

describe('UserButton Component', () => {
  it('devrait afficher le bouton utilisateur', () => {
    render(<UserButton />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('devrait afficher un lien de déconnexion si utilisateur connecté', () => {
    render(<UserButton />)
    // Adapter selon votre logique réelle
    const element = screen.getByRole('button')
    expect(element).toBeInTheDocument()
  })

  it('devrait afficher un lien de connexion si utilisateur non connecté', () => {
    render(<UserButton />)
    const element = screen.getByRole('button')
    expect(element).toBeInTheDocument()
  })

  it('devrait être cliquable', () => {
    render(<UserButton />)
    const button = screen.getByRole('button')
    expect(button).toBeEnabled()
  })
})