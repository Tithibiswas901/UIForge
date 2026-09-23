import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('associates label with input', () => {
    render(<Input label="Email address" />);
    const input = screen.getByLabelText(/email address/i);
    expect(input).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<Input helperText="Some helper text" />);
    const helper = screen.getByText(/some helper text/i);
    expect(helper).toBeInTheDocument();
  });

  it('shows error state message with correct aria-invalid', () => {
    render(<Input state="error" helperText="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const helper = screen.getByText(/error message/i);
    expect(helper).toHaveClass('text-danger');
  });
});
