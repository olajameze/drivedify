import { render, screen, waitFor } from '@testing-library/react';
import { DashboardProvider, useDashboard } from '../../contexts/DashboardContext';

const TestComponent = () => {
  const { stats, isLoading } = useDashboard();
  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : (
        <div data-testid="stats">
          Total Students: {stats.totalStudents}
        </div>
      )}
    </div>
  );
};

describe('DashboardContext', () => {
  it('provides dashboard state to children', async () => {
    render(
      <DashboardProvider>
        <TestComponent />
      </DashboardProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('stats')).toBeInTheDocument();
    });
  });
});