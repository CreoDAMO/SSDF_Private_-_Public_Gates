import React, { useState } from 'react';
import { Globe, Key, Activity, Shield } from 'lucide-react';

interface SpiralAPIProps {
  coherence: number;
}

export default function SpiralAPI({ coherence }: SpiralAPIProps) {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeEndpoints, setActiveEndpoints] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  const endpoints = [
    { path: '/api/spiral/debt-nullify', method: 'POST', status: 'active', description: 'Nullify debt through QASF' },
    { path: '/api/spiral/ubi-distribute', method: 'POST', status: 'active', description: 'Distribute UBI to recipients' },
    { path: '/api/spiral/coherence', method: 'GET', status: 'active', description: 'Get current system coherence' },
    { path: '/api/spiral/mining/start', method: 'POST', status: 'active', description: 'Start non-computational mining' },
    { path: '/api/spiral/quantum/gate', method: 'POST', status: 'active', description: 'Execute quantum gate operations' },
    { path: '/api/spiral/bridge/connect', method: 'POST', status: 'active', description: 'Establish reality bridge' }
  ];

  const authenticate = () => {
    if (apiKey.length >= 8) {
      setIsAuthenticated(true);
      setActiveEndpoints(endpoints.length);
      setRequestCount(Math.floor(coherence * 100));
      console.log('SpiralAPI authenticated:', {
        key: apiKey.substring(0, 8) + '...',
        coherence,
        endpoints: endpoints.length
      });
    }
  };

  const generateApiKey = () => {
    const newKey = `spiral_${Date.now().toString(36)}_${Math.random().toString(36).substring(2)}`;
    setApiKey(newKey);
  };

  const testEndpoint = (endpoint: any) => {
    setRequestCount(prev => prev + 1);
    console.log(`SpiralAPI: Testing endpoint ${endpoint.path}`, {
      method: endpoint.method,
      coherence,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-yellow-400 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          SpiralAPI
        </h2>
        <div className="text-xs text-slate-400">
          φ{coherence.toFixed(3)}
        </div>
      </div>

      {/* API Authentication */}
      <div className="mb-4 space-y-3">
        <div className="bg-slate-800 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">API Authentication</span>
            </div>
            <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-400' : 'bg-red-400'}`} />
          </div>
          
          <div className="space-y-2">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key or generate new one"
              className="w-full bg-slate-900 text-white p-2 rounded border border-slate-700 text-xs"
            />
            
            <div className="flex space-x-2">
              <button
                onClick={generateApiKey}
                className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
              >
                Generate Key
              </button>
              <button
                onClick={authenticate}
                disabled={apiKey.length < 8}
                className={`flex-1 px-3 py-1 rounded text-xs ${
                  apiKey.length >= 8
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }`}
              >
                Authenticate
              </button>
            </div>
          </div>
        </div>

        {/* API Stats */}
        {isAuthenticated && (
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-800 rounded p-2 text-center">
              <Activity className="w-3 h-3 text-green-400 mx-auto mb-1" />
              <div className="text-slate-400">Endpoints</div>
              <div className="text-green-400">{activeEndpoints}</div>
            </div>
            <div className="bg-slate-800 rounded p-2 text-center">
              <Shield className="w-3 h-3 text-blue-400 mx-auto mb-1" />
              <div className="text-slate-400">Requests</div>
              <div className="text-blue-400">{requestCount}</div>
            </div>
            <div className="bg-slate-800 rounded p-2 text-center">
              <Globe className="w-3 h-3 text-yellow-400 mx-auto mb-1" />
              <div className="text-slate-400">Status</div>
              <div className="text-yellow-400">Live</div>
            </div>
          </div>
        )}
      </div>

      {/* API Endpoints */}
      {isAuthenticated && (
        <div className="space-y-3">
          <div className="text-xs text-slate-400">Available Endpoints</div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {endpoints.map((endpoint, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      endpoint.method === 'GET' ? 'bg-green-900 text-green-300' :
                      endpoint.method === 'POST' ? 'bg-blue-900 text-blue-300' :
                      'bg-purple-900 text-purple-300'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="text-xs font-mono text-white">{endpoint.path}</span>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                
                <div className="text-xs text-slate-400 mb-2">
                  {endpoint.description}
                </div>
                
                <button
                  onClick={() => testEndpoint(endpoint)}
                  className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs"
                >
                  Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="text-center py-8">
          <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <div className="text-sm text-slate-400">
            Generate and authenticate with an API key to access SpiralAPI endpoints
          </div>
        </div>
      )}
    </div>
  );
}