import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface APIEndpoint {
  id: string;
  name: string;
  type: 'public' | 'private';
  category: 'tracking' | 'analysis' | 'payment';
  endpoint: string;
  status: 'active' | 'inactive' | 'requires_auth';
  description: string;
  dataType: 'public_debt' | 'private_debt' | 'general_financial';
  accessLevel: 'free' | 'subscription' | 'partnership';
  documentation: string;
}

export default function RealTimeAPIIntegration() {
  const [selectedCategory, setSelectedCategory] = useState<'tracking' | 'analysis' | 'payment'>('tracking');
  const [connectionStatus, setConnectionStatus] = useState<Record<string, 'connecting' | 'connected' | 'failed'>>({});
  
  const queryClient = useQueryClient();

  // Real API endpoints based on research
  const apiEndpoints: APIEndpoint[] = [
    {
      id: 'treasury_fiscal',
      name: 'U.S. Treasury Fiscal Data API',
      type: 'public',
      category: 'tracking',
      endpoint: 'https://api.fiscaldata.treasury.gov/services/api/v1',
      status: 'active',
      description: 'Federal debt data including "Debt to the Penny" dataset',
      dataType: 'public_debt',
      accessLevel: 'free',
      documentation: 'https://fiscaldata.treasury.gov/api-documentation/'
    },
    {
      id: 'spinwheel_debt',
      name: 'Spinwheel Debt API',
      type: 'private',
      category: 'tracking',
      endpoint: 'https://api.spinwheel.io/v1',
      status: 'requires_auth',
      description: 'Real-time consumer and credit data tracking',
      dataType: 'private_debt',
      accessLevel: 'subscription',
      documentation: 'https://spinwheel.io/'
    },
    {
      id: 'plaid_liabilities',
      name: 'Plaid Liabilities API',
      type: 'private',
      category: 'tracking',
      endpoint: 'https://production.plaid.com',
      status: 'requires_auth',
      description: 'Detailed loan data including credit cards and mortgages',
      dataType: 'private_debt',
      accessLevel: 'subscription',
      documentation: 'https://plaid.com/products/liabilities/'
    },
    {
      id: 'methodfi_debt',
      name: 'Methodfi APIs',
      type: 'private',
      category: 'analysis',
      endpoint: 'https://api.methodfi.com/v1',
      status: 'requires_auth',
      description: 'Debt management for lenders with balance tracking',
      dataType: 'private_debt',
      accessLevel: 'partnership',
      documentation: 'https://methodfi.com/'
    },
    {
      id: 'rightfoot_borrower',
      name: 'Rightfoot APIs',
      type: 'private',
      category: 'analysis',
      endpoint: 'https://api.rightfoot.com/v1',
      status: 'requires_auth',
      description: 'Borrower account data and debt payment solutions',
      dataType: 'private_debt',
      accessLevel: 'partnership',
      documentation: 'https://www.rightfoot.com/'
    },
    {
      id: 'pdcflow_payment',
      name: 'PDCflow Payment API',
      type: 'private',
      category: 'payment',
      endpoint: 'https://api.pdcflow.com/v1',
      status: 'requires_auth',
      description: 'Debt collection payment processing',
      dataType: 'private_debt',
      accessLevel: 'partnership',
      documentation: 'https://www.pdcflow.com/'
    },
    {
      id: 'yapily_openbanking',
      name: 'Yapily Open Banking API',
      type: 'public',
      category: 'tracking',
      endpoint: 'https://api.yapily.com',
      status: 'requires_auth',
      description: 'Multi-country bank data access for debt management',
      dataType: 'general_financial',
      accessLevel: 'free',
      documentation: 'https://www.yapily.com/'
    },
    {
      id: 'openbank_project',
      name: 'Open Bank Project API',
      type: 'public',
      category: 'tracking',
      endpoint: 'https://api.openbankproject.com',
      status: 'active',
      description: 'Open banking platform for financial data access',
      dataType: 'general_financial',
      accessLevel: 'free',
      documentation: 'https://www.openbankproject.com/'
    }
  ];

  const { data: internalSources = [] } = useQuery<any[]>({
    queryKey: ['/api/sources']
  });

  const testConnectionMutation = useMutation({
    mutationFn: async (endpoint: APIEndpoint) => {
      setConnectionStatus(prev => ({ ...prev, [endpoint.id]: 'connecting' }));
      
      // For public APIs, attempt actual connection test
      if (endpoint.type === 'public' && endpoint.status === 'active') {
        try {
          const response = await fetch(endpoint.endpoint, { 
            method: 'HEAD',
            mode: 'no-cors' // Handle CORS for external APIs
          });
          return { success: true, endpoint };
        } catch (error) {
          return { success: false, endpoint, error: 'Connection failed' };
        }
      }
      
      // For private APIs, simulate auth check
      return { success: false, endpoint, error: 'Authentication required' };
    },
    onSuccess: (result) => {
      setConnectionStatus(prev => ({ 
        ...prev, 
        [result.endpoint.id]: result.success ? 'connected' : 'failed' 
      }));
    },
    onError: (error, endpoint) => {
      setConnectionStatus(prev => ({ ...prev, [endpoint.id]: 'failed' }));
    }
  });

  const filteredEndpoints = apiEndpoints.filter(api => api.category === selectedCategory);

  const getStatusIcon = (endpoint: APIEndpoint) => {
    const status = connectionStatus[endpoint.id];
    
    if (status === 'connecting') {
      return <Clock className="w-4 h-4 text-yellow-500 animate-spin" />;
    } else if (status === 'connected') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (status === 'failed') {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    } else if (endpoint.status === 'requires_auth') {
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    } else {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'free': return 'text-green-400';
      case 'subscription': return 'text-yellow-400';
      case 'partnership': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="widget-container bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Real-Time API Integration</h3>
        <div className="text-sm text-slate-400">
          {filteredEndpoints.length} endpoints available
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSelectedCategory('tracking')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            selectedCategory === 'tracking' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Debt Tracking
        </button>
        <button
          onClick={() => setSelectedCategory('analysis')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            selectedCategory === 'analysis' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Debt Analysis
        </button>
        <button
          onClick={() => setSelectedCategory('payment')}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            selectedCategory === 'payment' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Debt Payment
        </button>
      </div>

      <div className="space-y-4">
        {filteredEndpoints.map((endpoint) => (
          <div key={endpoint.id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getStatusIcon(endpoint)}
                <div>
                  <h4 className="text-white font-semibold">{endpoint.name}</h4>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className={`px-2 py-1 rounded ${endpoint.type === 'public' ? 'bg-green-900 text-green-300' : 'bg-blue-900 text-blue-300'}`}>
                      {endpoint.type}
                    </span>
                    <span className={`${getAccessLevelColor(endpoint.accessLevel)}`}>
                      {endpoint.accessLevel}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => testConnectionMutation.mutate(endpoint)}
                  disabled={testConnectionMutation.isPending}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors disabled:opacity-50"
                >
                  Test
                </button>
                <a 
                  href={endpoint.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-3">{endpoint.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">{endpoint.endpoint}</span>
              <span className={`px-2 py-1 rounded ${
                endpoint.dataType === 'public_debt' ? 'bg-purple-900 text-purple-300' :
                endpoint.dataType === 'private_debt' ? 'bg-orange-900 text-orange-300' :
                'bg-gray-900 text-gray-300'
              }`}>
                {endpoint.dataType.replace('_', ' ')}
              </span>
            </div>

            {endpoint.status === 'requires_auth' && (
              <div className="mt-3 p-3 bg-orange-900/20 border border-orange-800 rounded text-xs">
                <div className="flex items-center text-orange-300">
                  <AlertCircle className="w-3 h-3 mr-2" />
                  Authentication required - API key needed for integration
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
        <h4 className="text-white font-semibold mb-2">Integration Status</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Active Sources:</span>
            <span className="text-white ml-2">{(internalSources as any[]).length}</span>
          </div>
          <div>
            <span className="text-slate-400">Available APIs:</span>
            <span className="text-white ml-2">{apiEndpoints.length}</span>
          </div>
          <div>
            <span className="text-slate-400">Public APIs:</span>
            <span className="text-green-400 ml-2">{apiEndpoints.filter(a => a.type === 'public').length}</span>
          </div>
          <div>
            <span className="text-slate-400">Private APIs:</span>
            <span className="text-blue-400 ml-2">{apiEndpoints.filter(a => a.type === 'private').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}