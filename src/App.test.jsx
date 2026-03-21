import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

// Mock the fetch call so it doesn't try to resolve a relative URL in node
global.fetch = () => Promise.resolve({
  ok: true,
  json: () => Promise.resolve([])
});

describe('App', () => {
  it('renders the hero section headline', async () => {
    await act(async () => {
      render(<App />);
    });
    const headline = screen.getByText(/Find Your Dream Tech Job/i);
    expect(headline).toBeInTheDocument();
  });
});
