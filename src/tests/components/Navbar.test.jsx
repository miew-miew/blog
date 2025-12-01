import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar Component', () => {
  it('devrait rendre la barre de navigation', () => {
    const { container } = render(<Navbar />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('devrait contenir un lien vers l\'accueil', () => {
    render(<Navbar />)
    const homeLink = screen.queryByRole('link', { name: /home|accueil/i })
    expect(homeLink).toBeInTheDocument()
  })

  it('devrait contenir un lien vers les blogs', () => {
    render(<Navbar />)
    const blogLink = screen.queryByRole('link', { name: /blog|blogs/i })
    expect(blogLink).toBeInTheDocument()
  })

  it('devrait afficher correctement sans données', () => {
    const { container } = render(<Navbar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('devrait avoir des éléments navigables', () => {
    const { container } = render(<Navbar />)
    const navLinks = container.querySelectorAll('a')
    expect(navLinks.length).toBeGreaterThan(0)
  })
})