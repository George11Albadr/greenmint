import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders App component', () => {
  render(<App />);

  // Verifica que algún elemento del componente esté presente
  expect(screen.getByText(/your text here/i)).toBeInTheDocument();
});

test('login functionality', () => {
  render(<App />);

  // Agrega pruebas para la funcionalidad de inicio de sesión aquí
});

// Añade más pruebas según sea necesario