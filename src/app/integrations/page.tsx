'use client';

import { useState } from 'react';
import { Link, Plus, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { mockIntegrations } from '@/lib/mock';
import SectionWrapper from '@/components/SectionWrapper';
import UIButton from '@/components/UIButton';

export default function IntegrationsPage() {
  const [integrations] = useState(mockIntegrations);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'disconnected': return <XCircle className="h-5 w-5 text-muted-foreground" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <XCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500 bg-green-500/10';
      case 'disconnected': return 'text-muted-foreground bg-muted/10';
      case 'error': return 'text-red-500 bg-red-500/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatLastSync = (date: Date) => {
    return new Intl.DateTimeFormat('en-AU', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <main className="relative">
      <SectionWrapper className="overflow-hidden">
        <div className="relative z-20 mx-auto max-w-6xl px-6">
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Integrations
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with your university&apos;s learning management systems and external tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <div key={integration.id} className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center">
                    <Link className="h-6 w-6 text-brand" />
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                      {integration.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{integration.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {integration.type.replace('_', ' ').toUpperCase()} Integration
                </p>
                
                {integration.lastSync && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Last synced: {formatLastSync(integration.lastSync)}
                  </p>
                )}
                
                <div className="flex gap-2">
                  {integration.status === 'connected' ? (
                    <>
                      <UIButton variant="secondary" className="flex-1 text-sm px-3 py-1">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sync Now
                      </UIButton>
                      <UIButton variant="ghost" className="text-sm px-3 py-1">
                        Disconnect
                      </UIButton>
                    </>
                  ) : (
                    <UIButton variant="primary" className="flex-1 text-sm px-3 py-1">
                      Connect
                    </UIButton>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-muted/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              More integrations are being added regularly. Request a specific integration or suggest new features.
            </p>
            <UIButton variant="secondary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Request Integration
            </UIButton>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
