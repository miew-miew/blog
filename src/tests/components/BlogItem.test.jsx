import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogItem from '@/components/BlogItem'

describe('BlogItem Component', () => {
  const mockBlog = {
    _id: '1',
    title: 'Mon Blog',
    category: 'Tech',
    content: 'Contenu du blog'
  }

  it('devrait afficher le titre du blog', () => {
    render(<BlogItem blog={mockBlog} />)
    expect(screen.getByText(/Mon Blog/i)).toBeInTheDocument()
  })

  it('devrait afficher la catégorie du blog', () => {
    render(<BlogItem blog={mockBlog} />)
    expect(screen.getByText(/Tech/i)).toBeInTheDocument()
  })

  it('devrait afficher le contenu du blog', () => {
    render(<BlogItem blog={mockBlog} />)
    expect(screen.getByText(/Contenu du blog/i)).toBeInTheDocument()
  })

  it('devrait avoir un lien vers le blog', () => {
    render(<BlogItem blog={mockBlog} />)
    const link = screen.getByRole('link', { name: /Mon Blog/i })
    expect(link).toBeInTheDocument()
  })

  it('devrait afficher correctement avec des données différentes', () => {
    const differentBlog = {
      _id: '2',
      title: 'Autre Blog',
      category: 'Life',
      content: 'Autre contenu'
    }
    render(<BlogItem blog={differentBlog} />)
    expect(screen.getByText(/Autre Blog/i)).toBeInTheDocument()
    expect(screen.getByText(/Life/i)).toBeInTheDocument()
  })
})