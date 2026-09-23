import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { vi } from 'vitest';

describe('Modal', () => {
  it('renders when open', () => {
    render(<Modal open={true} title="My Modal" />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /my modal/i })).toBeInTheDocument();
  });

  it('does not render dialog when closed', () => {
    render(<Modal open={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/modal is closed/i)).toBeInTheDocument();
  });

  it('has role="dialog" and aria-modal', () => {
    render(<Modal open={true} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
