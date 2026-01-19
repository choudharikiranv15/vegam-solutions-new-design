import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, StatCard } from './Cards'
import { Users } from 'lucide-react'

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    )

    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(
      <Card title="Test Title">
        <p>Content</p>
      </Card>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(
      <Card title="Title" subtitle="Test Subtitle">
        <p>Content</p>
      </Card>
    )

    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('renders action element when provided', () => {
    render(
      <Card title="Title" action={<button>Action</button>}>
        <p>Content</p>
      </Card>
    )

    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Content</p>
      </Card>
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('does not render header when no title or action', () => {
    const { container } = render(
      <Card>
        <p>Content only</p>
      </Card>
    )

    // Should not have the header div with justify-between
    const headerDiv = container.querySelector('.justify-between')
    expect(headerDiv).not.toBeInTheDocument()
  })
})

describe('StatCard', () => {
  it('renders title and value', () => {
    render(
      <StatCard
        title="Total Users"
        value="1,234"
        icon={Users}
      />
    )

    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('renders icon', () => {
    const { container } = render(
      <StatCard
        title="Test"
        value="100"
        icon={Users}
      />
    )

    // Icon should be rendered (lucide-react renders as svg)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders trend indicator when trend is up', () => {
    render(
      <StatCard
        title="Test"
        value="100"
        icon={Users}
        trend="up"
        trendValue="+12%"
      />
    )

    expect(screen.getByText(/\+12%/)).toBeInTheDocument()
    expect(screen.getByText('vs last month')).toBeInTheDocument()
  })

  it('renders trend indicator when trend is down', () => {
    render(
      <StatCard
        title="Test"
        value="100"
        icon={Users}
        trend="down"
        trendValue="-5%"
      />
    )

    expect(screen.getByText(/-5%/)).toBeInTheDocument()
  })

  it('does not render trend when not provided', () => {
    render(
      <StatCard
        title="Test"
        value="100"
        icon={Users}
      />
    )

    expect(screen.queryByText('vs last month')).not.toBeInTheDocument()
  })

  it('applies different color styles', () => {
    const { rerender, container } = render(
      <StatCard
        title="Test"
        value="100"
        icon={Users}
        color="success"
      />
    )

    // Should have emerald color classes for success
    const iconContainer = container.querySelector('.bg-emerald-50')
    expect(iconContainer).toBeInTheDocument()

    // Rerender with warning color
    rerender(
      <StatCard
        title="Test"
        value="100"
        icon={Users}
        color="warning"
      />
    )

    const warningContainer = container.querySelector('.bg-orange-50')
    expect(warningContainer).toBeInTheDocument()
  })
})
