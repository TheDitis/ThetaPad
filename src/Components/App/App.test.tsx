import React from 'react';
import {render, screen} from "@testing-library/react";
import App from "./App";

// Konva throws error. Replace with SVG when possible
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/thetapad/i);
  expect(linkElement).toBeInTheDocument();
})
;
