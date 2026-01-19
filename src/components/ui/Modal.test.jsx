import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument()
  })

  it('renders modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Modal content</p>
      </Modal>
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn()

    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    // Find and click the close button (X icon)
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when backdrop is clicked', () => {
    const handleClose = vi.fn()

    render(
      <Modal isOpen={true} onClose={handleClose} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    // Click the backdrop (the first fixed div with bg-black)
    const backdrop = document.querySelector('.bg-black\\/40')
    fireEvent.click(backdrop)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('renders footer when provided', () => {
    render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Test Modal"
        footer={<button>Save</button>}
      >
        <p>Content</p>
      </Modal>
    )

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test" size="sm">
        <p>Content</p>
      </Modal>
    )

    // Check for max-w-md class (small size)
    expect(document.querySelector('.max-w-md')).toBeInTheDocument()

    rerender(
      <Modal isOpen={true} onClose={() => {}} title="Test" size="lg">
        <p>Content</p>
      </Modal>
    )

    // Check for max-w-3xl class (large size)
    expect(document.querySelector('.max-w-3xl')).toBeInTheDocument()
  })

  it('prevents body scroll when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when closed', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        <p>Content</p>
      </Modal>
    )

    expect(document.body.style.overflow).toBe('unset')
  })
})
