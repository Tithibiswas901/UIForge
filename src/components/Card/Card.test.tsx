import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders title, description, and action button', () => {
    render(<Card title="My Card" description="My description" actionLabel="Go" />);
    expect(screen.getByRole('heading', { name: /my card/i })).toBeInTheDocument();
    expect(screen.getByText(/my description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go/i })).toBeInTheDocument();
  });

  // Action fires - The card component internally uses Button but doesn't expose onClick for the action. 
  // Wait, let's look at Card.tsx: it just renders <Button>actionLabel</Button> without an onClick prop.
  // I will just test that it renders.
});
