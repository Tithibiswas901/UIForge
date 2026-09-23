import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders message with right role', () => {
    render(<Toast message="Hello World" />);
    const toast = screen.getByRole('status');
    expect(toast).toBeInTheDocument();
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it('can be manually dismissed (close button exists)', () => {
    render(<Toast dismissable={true} />);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
  });
});
