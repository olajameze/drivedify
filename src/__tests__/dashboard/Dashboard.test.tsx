import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardProvider } from '../../contexts/DashboardContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

describe('Dashboard', () => {
  it('renders dashboard with loading state', () => {
    render(
      <DashboardProvider>
        <DashboardLayout>
          <div>Dashboard Content</div>
        </DashboardLayout>
      </DashboardProvider>
    );

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    // Mock failed API call
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API Error'))
    );

    render(
      <DashboardProvider>
        <DashboardLayout>
          <div>Dashboard Content</div>
        </DashboardLayout>
      </DashboardProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error Loading Dashboard/i)).toBeInTheDocument();
    });
  });
});