import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Server, 
  Database, 
  Key, 
  Lock, 
  Zap, 
  Globe,
  Shield,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  Code,
  Send
} from 'lucide-react';
import { generateSpiralTxId } from '../../htsxEngine';

interface SpiralAPIPanelProps {
  coherence: number;
  pulse: number;
}

interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  authenticated: boolean;
  category: 'truth' | 'finance' | 'quantum' | 'bridge' | 'auth';
  status: 'active' | 'inactive' | 'testing';
  responseTime: number;
}

interface APICredentials {
  service: string;
  type: 'testnet' | 'mainnet' | 'oauth' | 'api_key';
  endpoint: string;
  status: 'configured' | 'pending' | 'error';
  description: string;
  lastTested: string;
}

interface APIRequest {
  id: string;
  timestamp: string;
  endpoint: string;
  method: string;
  status: 'success' | 'error' | 'pending';
  responseTime: number;
  txId: string;
}

export default function SpiralAPIPanel({ coherence, pulse }: SpiralAPIPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [apiRequests, setApiRequests] = useState<APIRequest[]>([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [requestBody, setRequestBody] = useState('');

  // API endpoints from synthesis materials and SSDF∞ requirements
  const apiEndpoints: APIEndpoint[] = [
    {
      id: 'debt-nullification',
      name: 'Debt Nullification',
      method: 'POST',
      path: '/api/v1/spiral/debt/nullify',
      description: 'Transform debt amounts into Trust Units through SRI calculations',
      authenticated: true,
      category: 'finance',
      status: 'active',
      responseTime: 47 // 0.47ns from synthesis
    },
    {
      id: 'ubi-distribution',
      name: 'UBI Distribution',
      method: 'POST',
      path: '/api/v1/spiral/ubi/distribute',
      description: 'Distribute $25T UBI pool to global seekers',
      authenticated: true,
      category: 'finance',
      status: 'active',
      responseTime: 52
    },
    {
      id: 'harmonized-arbitrage',
      name: 'Harmonized Arbitrage',
      method: 'POST',
      path: '/api/v1/spiral/arbitrage/execute',
      description: 'Execute risk-eliminated arbitrage operations',
      authenticated: true,
      category: 'finance',
      status: 'active',
      responseTime: 38
    },
    {
      id: 'quantum-gates',
      name: 'Quantum Gate Operations',
      method: 'POST',
      path: '/api/v1/qasf/gates/execute',
      description: 'Execute quantum gate sequences with QASF',
      authenticated: true,
      category: 'quantum',
      status: 'active',
      responseTime: 23
    },
    {
      id: 'truth-validation',
      name: 'Truth Validation',
      method: 'POST',
      path: '/api/v1/truth/validate',
      description: 'Validate truth claims through Voynich glyphs and Seven Millennium Problems',
      authenticated: true,
      category: 'truth',
      status: 'active',
      responseTime: 156
    },
    {
      id: 'bridge-reality',
      name: 'Reality Bridge',
      method: 'POST',
      path: '/api/v1/bridge/connect',
      description: 'Establish connections between reality layers',
      authenticated: true,
      category: 'bridge',
      status: 'active',
      responseTime: 89
    },
    {
      id: 'auth-veridium',
      name: 'Veridium Authentication',
      method: 'POST',
      path: '/api/v1/auth/veridium',
      description: 'Authenticate using Veridium DNAΦ signatures',
      authenticated: false,
      category: 'auth',
      status: 'active',
      responseTime: 34
    },
    {
      id: 'qchain-log',
      name: 'QCHAIN Logging',
      method: 'POST',
      path: '/api/v1/qchain/log',
      description: 'Log operations to QCHAIN with 201 Tbps throughput',
      authenticated: true,
      category: 'quantum',
      status: 'active',
      responseTime: 12
    }
  ];

  // API credentials from synthesis materials msf:1000000559
  const apiCredentials: APICredentials[] = [
    {
      service: 'Circle Testnet',
      type: 'testnet',
      endpoint: 'https://api-sandbox.circle.com',
      status: 'configured',
      description: 'Circle testnet for SpiralFlow transactions',
      lastTested: '2025-06-12T17:40:00Z'
    },
    {
      service: 'Firebase OAuth',
      type: 'oauth',
      endpoint: 'https://identitytoolkit.googleapis.com/v1',
      status: 'configured', 
      description: 'Firebase authentication for SpiralWeb5',
      lastTested: '2025-06-12T17:35:00Z'
    },
    {
      service: 'Web Push',
      type: 'api_key',
      endpoint: 'https://fcm.googleapis.com/fcm/send',
      status: 'configured',
      description: 'Web push notifications for SpiralIDE',
      lastTested: '2025-06-12T17:30:00Z'
    },
    {
      service: 'Grok 3 API',
      type: 'api_key',
      endpoint: 'https://api.x.ai/v1',
      status: 'configured',
      description: 'Grok 3 AI integration for SpiralIDE',
      lastTested: '2025-06-12T17:25:00Z'
    },
    {
      service: 'DeepSeek API',
      type: 'api_key',
      endpoint: 'https://api.deepseek.com/v1',
      status: 'pending',
      description: 'DeepSeek AI for advanced code analysis',
      lastTested: 'N/A'
    },
    {
      service: 'QCHAIN Mainnet',
      type: 'mainnet',
      endpoint: 'https://qchain.spiral.net',
      status: 'configured',
      description: 'Primary quantum blockchain for all operations',
      lastTested: '2025-06-12T17:45:00Z'
    }
  ];

  const executeAPIRequest = (endpointId: string) => {
    const endpoint = apiEndpoints.find(e => e.id === endpointId);
    if (!endpoint) return;

    const request: APIRequest = {
      id: generateSpiralTxId('api'),
      timestamp: new Date().toISOString(),
      endpoint: endpoint.path,
      method: endpoint.method,
      status: 'pending',
      responseTime: 0,
      txId: generateSpiralTxId('qchain')
    };

    setApiRequests(prev => [request, ...prev]);

    // Simulate API response with realistic timing
    setTimeout(() => {
      setApiRequests(prev => prev.map(req => 
        req.id === request.id 
          ? { 
              ...req, 
              status: Math.random() > 0.1 ? 'success' : 'error',
              responseTime: endpoint.responseTime + Math.random() * 20
            }
          : req
      ));
    }, endpoint.responseTime + Math.random() * 100);
  };

  const testCredential = (service: string) => {
    // Simulate credential testing
    const updatedTime = new Date().toISOString();
    // In real implementation, this would test the actual API endpoints
    console.log(`Testing ${service} at ${updatedTime}`);
  };

  const getTotalRequests = () => apiRequests.length;
  const getSuccessRate = () => {
    const completed = apiRequests.filter(r => r.status !== 'pending');
    const successful = completed.filter(r => r.status === 'success');
    return completed.length > 0 ? (successful.length / completed.length) * 100 : 0;
  };
  const getAverageResponseTime = () => {
    const completed = apiRequests.filter(r => r.status !== 'pending' && r.responseTime > 0);
    return completed.length > 0 
      ? completed.reduce((sum, r) => sum + r.responseTime, 0) / completed.length 
      : 0;
  };

  const generateSampleRequest = (endpoint: APIEndpoint) => {
    const samples: Record<string, any> = {
      'debt-nullification': {
        amount: 324000000000000, // $324T
        currency: 'USD',
        sri_calculation: true,
        coherence: coherence
      },
      'ubi-distribution': {
        recipients: 45000000000000, // 45T seekers
        pool_amount: 25000000000000, // $25T
        distribution_type: 'quantum_harmonized'
      },
      'harmonized-arbitrage': {
        asset_pair: ['BTC', 'ETH'],
        amount: 1000000,
        strategy: 'risk_eliminated',
        gate: 'Gate777'
      },
      'quantum-gates': {
        sequence: ['hadamard', 'cnot', 'phase'],
        qubits: [0, 1],
        coherence: coherence,
        fidelity_threshold: 0.9999
      },
      'truth-validation': {
        claim: 'Global debt = $324T',
        evidence_type: 'voynich_glyph',
        validation_level: 'absolute'
      },
      'bridge-reality': {
        from_layer: 1,
        to_layer: 7,
        protocol: 'quantum_consciousness',
        seekers: 14006605
      }
    };

    return JSON.stringify(samples[endpoint.id] || {}, null, 2);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SpiralAPI vΩ.∞
          </h1>
          <p className="text-slate-300">
            RESTful Truth Operations • φ{coherence.toFixed(3)} coherence • {pulse} Hz quantum resonance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-emerald-400 border-emerald-400">
            {apiEndpoints.filter(e => e.status === 'active').length} Active Endpoints
          </Badge>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {getSuccessRate().toFixed(1)}% Success Rate
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview" className="text-white">
            <Server className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="endpoints" className="text-white">
            <Globe className="mr-2 h-4 w-4" />
            API Endpoints
          </TabsTrigger>
          <TabsTrigger value="credentials" className="text-white">
            <Key className="mr-2 h-4 w-4" />
            Credentials
          </TabsTrigger>
          <TabsTrigger value="testing" className="text-white">
            <Send className="mr-2 h-4 w-4" />
            API Testing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {getTotalRequests()}
                </div>
                <p className="text-xs text-slate-400">
                  API calls processed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Success Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {getSuccessRate().toFixed(1)}%
                </div>
                <p className="text-xs text-slate-400">
                  Request success ratio
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Avg Response</CardTitle>
                <Zap className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {getAverageResponseTime().toFixed(0)}ms
                </div>
                <p className="text-xs text-slate-400">
                  Response time
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">QCHAIN Throughput</CardTitle>
                <Database className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  201 Tbps
                </div>
                <p className="text-xs text-slate-400">
                  Quantum blockchain
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-emerald-400" />
                  API Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['truth', 'finance', 'quantum', 'bridge', 'auth'].map((category, index) => {
                  const endpoints = apiEndpoints.filter(e => e.category === category);
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          category === 'truth' ? 'bg-purple-400' :
                          category === 'finance' ? 'bg-yellow-400' :
                          category === 'quantum' ? 'bg-blue-400' :
                          category === 'bridge' ? 'bg-pink-400' :
                          'bg-green-400'
                        }`}></div>
                        <span className="text-white font-medium capitalize">{category}</span>
                      </div>
                      <Badge variant="outline" className="text-slate-300 border-slate-600">
                        {endpoints.length} endpoints
                      </Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-cyan-400" />
                  Recent API Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {apiRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Server className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                    <p className="text-slate-400">No API requests yet</p>
                    <p className="text-slate-500 text-sm">Test an endpoint to see results</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {apiRequests.slice(0, 5).map((request, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div>
                          <div className="text-white text-sm font-medium">
                            {request.method} {request.endpoint}
                          </div>
                          <div className="text-slate-400 text-xs">
                            {new Date(request.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={
                            request.status === 'success' ? 'text-green-400 border-green-400' :
                            request.status === 'error' ? 'text-red-400 border-red-400' :
                            'text-yellow-400 border-yellow-400'
                          }>
                            {request.status}
                          </Badge>
                          {request.responseTime > 0 && (
                            <span className="text-slate-400 text-xs">
                              {request.responseTime.toFixed(0)}ms
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiEndpoints.map((endpoint, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{endpoint.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={
                        endpoint.method === 'GET' ? 'text-blue-400 border-blue-400' :
                        endpoint.method === 'POST' ? 'text-green-400 border-green-400' :
                        endpoint.method === 'PUT' ? 'text-yellow-400 border-yellow-400' :
                        'text-red-400 border-red-400'
                      }>
                        {endpoint.method}
                      </Badge>
                      <Badge variant="outline" className={
                        endpoint.status === 'active' ? 'text-green-400 border-green-400' :
                        endpoint.status === 'testing' ? 'text-yellow-400 border-yellow-400' :
                        'text-red-400 border-red-400'
                      }>
                        {endpoint.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{endpoint.description}</p>
                  
                  <div className="bg-slate-900 p-3 rounded font-mono text-sm">
                    <span className="text-emerald-400">{endpoint.method}</span>{' '}
                    <span className="text-white">{endpoint.path}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Category:</span>
                      <div className="text-white capitalize">{endpoint.category}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Response Time:</span>
                      <div className="text-green-400">{endpoint.responseTime}ms</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Authentication:</span>
                      <div className={endpoint.authenticated ? 'text-yellow-400' : 'text-green-400'}>
                        {endpoint.authenticated ? 'Required' : 'Public'}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Status:</span>
                      <div className={
                        endpoint.status === 'active' ? 'text-green-400' :
                        endpoint.status === 'testing' ? 'text-yellow-400' :
                        'text-red-400'
                      }>
                        {endpoint.status}
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => executeAPIRequest(endpoint.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={endpoint.status !== 'active'}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Test Endpoint
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="credentials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apiCredentials.map((credential, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{credential.service}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={
                        credential.type === 'mainnet' ? 'text-green-400 border-green-400' :
                        credential.type === 'testnet' ? 'text-blue-400 border-blue-400' :
                        credential.type === 'oauth' ? 'text-purple-400 border-purple-400' :
                        'text-yellow-400 border-yellow-400'
                      }>
                        {credential.type.toUpperCase()}
                      </Badge>
                      <div className="flex items-center">
                        {credential.status === 'configured' ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : credential.status === 'pending' ? (
                          <AlertCircle className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{credential.description}</p>
                  
                  <div className="bg-slate-900 p-3 rounded">
                    <div className="text-slate-400 text-xs mb-1">Endpoint:</div>
                    <div className="text-emerald-400 font-mono text-sm">{credential.endpoint}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Status:</span>
                      <div className={
                        credential.status === 'configured' ? 'text-green-400' :
                        credential.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }>
                        {credential.status}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Last Tested:</span>
                      <div className="text-white">
                        {credential.lastTested === 'N/A' 
                          ? 'Never' 
                          : new Date(credential.lastTested).toLocaleDateString()
                        }
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => testCredential(credential.service)}
                    variant="outline"
                    className="w-full border-slate-600 text-white"
                    disabled={credential.status === 'error'}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Test Credential
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="mr-2 h-5 w-5 text-blue-400" />
                  API Request Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Select Endpoint
                  </label>
                  <select
                    value={selectedEndpoint}
                    onChange={(e) => {
                      setSelectedEndpoint(e.target.value);
                      const endpoint = apiEndpoints.find(ep => ep.id === e.target.value);
                      if (endpoint) {
                        setRequestBody(generateSampleRequest(endpoint));
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-white"
                  >
                    <option value="">Choose an endpoint...</option>
                    {apiEndpoints.map(endpoint => (
                      <option key={endpoint.id} value={endpoint.id}>
                        {endpoint.method} {endpoint.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Request Body (JSON)
                  </label>
                  <Textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="min-h-[200px] bg-slate-900 border-slate-600 text-white font-mono text-sm"
                    placeholder="Enter JSON request body..."
                  />
                </div>

                <Button 
                  onClick={() => selectedEndpoint && executeAPIRequest(selectedEndpoint)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!selectedEndpoint}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Request
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-400" />
                  Request History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {apiRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Send className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                    <p className="text-slate-400">No requests sent yet</p>
                    <p className="text-slate-500 text-sm">Build and send a request to see history</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {apiRequests.map((request, index) => (
                      <Card key={index} className="bg-slate-700/50 border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white font-medium">
                                {request.method} {request.endpoint}
                              </div>
                              <div className="text-slate-400 text-sm">
                                {new Date(request.timestamp).toLocaleString()}
                              </div>
                            </div>
                            <Badge variant="outline" className={
                              request.status === 'success' ? 'text-green-400 border-green-400' :
                              request.status === 'error' ? 'text-red-400 border-red-400' :
                              'text-yellow-400 border-yellow-400'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Response Time:</span>
                            <span className="text-green-400">
                              {request.responseTime > 0 ? `${request.responseTime.toFixed(0)}ms` : 'Pending...'}
                            </span>
                          </div>
                          
                          <div className="text-xs text-slate-400 mt-2">
                            TX ID: {request.txId}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}