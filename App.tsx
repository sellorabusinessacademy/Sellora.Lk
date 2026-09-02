import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useData } from './context/DataContext';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ActiveModule } from './components/layout/Sidebar';

// Module Views
import { DashboardView } from './components/modules/DashboardView';
import { OrdersView } from './components/modules/OrdersView';
import { ProductsView } from './components/modules/ProductsView';
import { InventoryView } from './components/modules/InventoryView';
import { CustomersView } from './components/modules/CustomersView';
import { SuppliersView } from './components/modules/SuppliersView';
import { InvoicesView } from './components/modules/InvoicesView';
import { FinancesView } from './components/modules/FinancesView';
import { DeliveriesView } from './components/modules/DeliveriesView';
import { ReturnsView } from './components/modules/ReturnsView';
import { EmployeesView } from './components/modules/EmployeesView';
import { ReportsView } from './components/modules/ReportsView';
import { SettingsView } from './components/modules/SettingsView';
import { SuperAdminView } from './components/modules/SuperAdminView';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // View states: 'landing' or 'app'
  const [viewState, setViewState] = useState<'landing' | 'app'>('landing');
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const handleOpenAuth = (tab: 'login' | 'signup') => {
    setAuthInitialTab(tab);
    setAuthModalOpen(true);
  };

  const handleLaunchDemo = () => {
    setViewState('app');
    setActiveModule('dashboard');
  };

  const handleAuthSuccess = () => {
    setViewState('app');
    setActiveModule('dashboard');
  };

  const handleOnboardingComplete = () => {
    setOnboardingOpen(false);
    setViewState('app');
    setActiveModule('dashboard');
  };

  return (
    <>
      {viewState === 'landing' ? (
        <LandingPage
          onOpenAuth={handleOpenAuth}
          onOpenDemo={handleLaunchDemo}
          onOpenOnboarding={() => setOnboardingOpen(true)}
        />
      ) : (
        <DashboardLayout
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          onOpenNewBusinessWizard={() => setOnboardingOpen(true)}
          onReturnToLanding={() => setViewState('landing')}
        >
          {activeModule === 'dashboard' && <DashboardView onNavigate={setActiveModule} />}
          {activeModule === 'orders' && <OrdersView />}
          {activeModule === 'products' && <ProductsView />}
          {activeModule === 'inventory' && <InventoryView />}
          {activeModule === 'customers' && <CustomersView />}
          {activeModule === 'suppliers' && <SuppliersView />}
          {activeModule === 'invoices' && <InvoicesView />}
          {(activeModule === 'payments' || activeModule === 'expenses' || activeModule === 'profit_loss') && <FinancesView />}
          {activeModule === 'deliveries' && <DeliveriesView />}
          {activeModule === 'returns' && <ReturnsView />}
          {activeModule === 'employees' && <EmployeesView />}
          {(activeModule === 'reports' || activeModule === 'analytics') && <ReportsView />}
          {activeModule === 'settings' && <SettingsView />}
          {activeModule === 'super_admin' && <SuperAdminView />}
        </DashboardLayout>
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          isOpen={authModalOpen}
          initialTab={authInitialTab}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Onboarding Wizard */}
      {onboardingOpen && (
        <OnboardingWizard
          onComplete={handleOnboardingComplete}
          onCancel={() => setOnboardingOpen(false)}
        />
      )}
    </>
  );
};
