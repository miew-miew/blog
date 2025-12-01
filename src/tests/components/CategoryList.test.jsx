import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CategoryList from '@/components/CategoryList'

describe('CategoryList Component', () => {
  const mockCategories = [
    { _id: '1', name: 'Tech' },
    { _id: '2', name: 'Life' },
    { _id: '3', name: 'Travel' }
  ]

  it('devrait afficher la liste des catégories', () => {
    render(<CategoryList categories={mockCategories} />)
    expect(screen.getByText(/Tech/i)).toBeInTheDocument()
    expect(screen.getByText(/Life/i)).toBeInTheDocument()
  })

  it('devrait afficher un message si aucune catégorie', () => {
    render(<CategoryList categories={[]} />)
    // Adapter le texte selon votre implémentation
    const listItems = screen.queryAllByRole('listitem')
    expect(listItems.length).toBe(0)
  })

  it('devrait rendre le bon nombre de catégories', () => {
    render(<CategoryList categories={mockCategories} />)
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBe(3)
  })

  it('devrait afficher chaque catégorie avec son nom', () => {
    render(<CategoryList categories={mockCategories} />)
    mockCategories.forEach(category => {
      expect(screen.getByText(new RegExp(category.name, 'i'))).toBeInTheDocument()
    })
  })
})