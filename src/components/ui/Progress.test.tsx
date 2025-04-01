import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders with correct value and label', () => {
    render(<Progress value={75} label="Test Progress" />);
    
    expect(screen.getByText('Test Progress')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('applies correct color class based on value', () => {
    const { container } = render(<Progress value={40} label="Test Progress" />);
    
    const progressBar = container.querySelector('.progress-bar-fill');
    expect(progressBar).toHaveClass('progress-bar-fill-red');
  });
});