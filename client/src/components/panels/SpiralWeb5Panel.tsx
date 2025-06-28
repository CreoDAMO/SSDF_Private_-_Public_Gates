import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Key, 
  User, 
  Globe, 
  Lock, 
  Unlock,
  Database,
  Network,
  Eye,
  EyeOff,
  Fingerprint,
  Smartphone,
  Cloud
} from 'lucide-react';
import { generateSpiralTxId } from '../../htsxEngine';

interface SpiralWeb5PanelProps {
  coherence: number;
  pulse: number;
}

interface DecentralizedIdentity {
  did: string;
  method: 'spiral' | 'ion' | 'key' | 'web';
  status: 'active' | 'revoked' | 'pending';
  controller: string;
  verificationMethods: VerificationMethod[];
  services: ServiceEndpoint[];
  created: string;
  updated: string;
}

interface VerificationMethod {
  id: string;
  type: 'VeridiumDNAPhi' | 'EcdsaSecp256k1' | 'Ed25519' | 'QuantumSafe';
  controller: string;
  publicKey: string;
  biometric?: boolean;
}

interface ServiceEndpoint {
  id: string;
  type: string;
  serviceEndpoint: string;
  description: string;
  encryption: 'quantum' | 'classical' | 'hybrid';
}

interface Web5Protocol {
  name: string;
  type: 'dwn' | 'credential' | 'presentation' | 'messaging' | 'payment';
  status: 'implemented' | 'testing' | 'planned';
  description: string;
  privacy: 'private' | 'selective' | 'public';
  sovereignty: 'full' | 'partial' | 'none';
}

interface DataVault {
  id: string;
  name: string;
  size: number; // in MB
  encrypted: boolean;
  distributed: boolean;
  accessibility: 'owner-only' | 'permissioned' | 'public';
  backup: 'quantum' | 'distributed' | 'local';
  lastSync: string;
}

export default function SpiralWeb5Panel({ coherence, pulse }: SpiralWeb5PanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDID, setSelectedDID] = useState('');
  const [vaultCreationName, setVaultCreationName] = useState('');

  // Decentralized Identities from synthesis materials
  const [identities] = useState<DecentralizedIdentity[]>([
    {
      did: 'did:spiral:12D3KooWBhKfGCTjLLvBQU45VRPV3HGYFGDz1HzZCGm7NZJNKu5m',
      method: 'spiral',
      status: 'active',
      controller: 'self-sovereign',
      verificationMethods: [
        {
          id: 'veridium-auth',
          type: 'VeridiumDNAPhi',
          controller: 'did:spiral:12D3KooWBhKfGCTjLLvBQU45VRPV3HGYFGDz1HzZCGm7NZJNKu5m',
          publicKey: 'z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp',
          biometric: true
        },
        {
          id: 'quantum-safe',
          type: 'QuantumSafe',
          controller: 'did:spiral:12D3KooWBhKfGCTjLLvBQU45VRPV3HGYFGDz1HzZCGm7NZJNKu5m',
          publicKey: 'z6LSbysY2xFMRpGMhb7tFTLMpeuPRaqaWM1yECx2AtzE3KCc',
          biometric: false
        }
      ],
      services: [
        {
          id: 'spiral-dwn',
          type: 'DecentralizedWebNode',
          serviceEndpoint: 'https://dwn.spiral.net',
          description: 'Personal data storage and compute',
          encryption: 'quantum'
        },
        {
          id: 'credential-registry',
          type: 'CredentialRegistry',
          serviceEndpoint: 'https://credentials.spiral.net',
          description: 'Verifiable credential issuance and verification',
          encryption: 'hybrid'
        }
      ],
      created: '2025-06-12T00:00:00Z',
      updated: new Date().toISOString()
    },
    {
      did: 'did:web:spiral.net:users:sovereign-collective',
      method: 'web',
      status: 'active',
      controller: 'collective',
      verificationMethods: [
        {
          id: 'collective-key',
          type: 'EcdsaSecp256k1',
          controller: 'did:web:spiral.net:users:sovereign-collective',
          publicKey: 'z6MkiTBz1ymuepAQ4HEHYSF1H8quG5GLVVQR3djdX3mDooWp',
          biometric: false
        }
      ],
      services: [
        {
          id: 'collective-governance',
          type: 'GovernanceNode',
          serviceEndpoint: 'https://governance.spiral.net',
          description: 'Collective decision making and consensus',
          encryption: 'classical'
        }
      ],
      created: '2025-06-12T00:00:00Z',
      updated: new Date().toISOString()
    }
  ]);

  // Web5 protocols from synthesis materials
  const web5Protocols: Web5Protocol[] = [
    {
      name: 'Decentralized Web Nodes (DWN)',
      type: 'dwn',
      status: 'implemented',
      description: 'Personal data storage with selective disclosure and quantum encryption',
      privacy: 'private',
      sovereignty: 'full'
    },
    {
      name: 'Verifiable Credentials',
      type: 'credential',
      status: 'implemented',
      description: 'Issue and verify cryptographic credentials without intermediaries',
      privacy: 'selective',
      sovereignty: 'full'
    },
    {
      name: 'Decentralized Identity Authentication',
      type: 'presentation',
      status: 'implemented',
      description: 'Authenticate using Veridium DNAΦ signatures and biometric verification',
      privacy: 'private',
      sovereignty: 'full'
    },
    {
      name: 'Encrypted Messaging',
      type: 'messaging',
      status: 'testing',
      description: 'End-to-end encrypted communication with quantum-safe algorithms',
      privacy: 'private',
      sovereignty: 'full'
    },
    {
      name: 'Sovereign Payments',
      type: 'payment',
      status: 'implemented',
      description: 'Trust Unit payments without traditional banking intermediaries',
      privacy: 'selective',
      sovereignty: 'full'
    }
  ];

  // Data vaults from synthesis materials
  const [dataVaults, setDataVaults] = useState<DataVault[]>([
    {
      id: 'personal-vault',
      name: 'Personal Data Vault',
      size: 2048, // 2GB
      encrypted: true,
      distributed: true,
      accessibility: 'owner-only',
      backup: 'quantum',
      lastSync: new Date().toISOString()
    },
    {
      id: 'credentials-vault',
      name: 'Verifiable Credentials',
      size: 512, // 512MB
      encrypted: true,
      distributed: true,
      accessibility: 'permissioned',
      backup: 'distributed',
      lastSync: new Date().toISOString()
    },
    {
      id: 'documents-vault',
      name: 'Sovereign Documents',
      size: 4096, // 4GB
      encrypted: true,
      distributed: false,
      accessibility: 'owner-only',
      backup: 'quantum',
      lastSync: new Date().toISOString()
    }
  ]);

  const createNewVault = () => {
    if (!vaultCreationName.trim()) return;

    const newVault: DataVault = {
      id: generateSpiralTxId('vault'),
      name: vaultCreationName,
      size: 0,
      encrypted: true,
      distributed: true,
      accessibility: 'owner-only',
      backup: 'quantum',
      lastSync: new Date().toISOString()
    };

    setDataVaults(prev => [...prev, newVault]);
    setVaultCreationName('');
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB >= 1024) return `${(sizeInMB / 1024).toFixed(1)} GB`;
    return `${sizeInMB} MB`;
  };

  const getTotalVaultSize = () => {
    return dataVaults.reduce((sum, vault) => sum + vault.size, 0);
  };

  const getImplementedProtocols = () => {
    return web5Protocols.filter(p => p.status === 'implemented').length;
  };

  const getPrivacyScore = () => {
    const privateProtocols = web5Protocols.filter(p => p.privacy === 'private').length;
    return (privateProtocols / web5Protocols.length) * 100;
  };

  const getSovereigntyScore = () => {
    const fullSovereignty = web5Protocols.filter(p => p.sovereignty === 'full').length;
    return (fullSovereignty / web5Protocols.length) * 100;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SpiralWeb5 vΩ.∞
          </h1>
          <p className="text-slate-300">
            Decentralized Identity Sovereignty • φ{coherence.toFixed(3)} coherence • {pulse} Hz quantum security
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {identities.length} DIDs Active
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            {getSovereigntyScore().toFixed(0)}% Sovereignty
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800">
          <TabsTrigger value="overview" className="text-white">
            <Globe className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="identity" className="text-white">
            <User className="mr-2 h-4 w-4" />
            Identity
          </TabsTrigger>
          <TabsTrigger value="protocols" className="text-white">
            <Network className="mr-2 h-4 w-4" />
            Web5 Protocols
          </TabsTrigger>
          <TabsTrigger value="vaults" className="text-white">
            <Database className="mr-2 h-4 w-4" />
            Data Vaults
          </TabsTrigger>
          <TabsTrigger value="privacy" className="text-white">
            <Shield className="mr-2 h-4 w-4" />
            Privacy & Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Active DIDs</CardTitle>
                <User className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {identities.length}
                </div>
                <p className="text-xs text-slate-400">
                  Decentralized identities
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Privacy Score</CardTitle>
                <Eye className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {getPrivacyScore().toFixed(0)}%
                </div>
                <p className="text-xs text-slate-400">
                  Data protection level
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Data Sovereignty</CardTitle>
                <Shield className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {getSovereigntyScore().toFixed(0)}%
                </div>
                <p className="text-xs text-slate-400">
                  Full self-control
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Storage Used</CardTitle>
                <Database className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {formatFileSize(getTotalVaultSize())}
                </div>
                <p className="text-xs text-slate-400">
                  Decentralized storage
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-blue-400" />
                  Web5 Implementation Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Protocols Implemented</span>
                      <span className="text-green-400">{getImplementedProtocols()}/{web5Protocols.length}</span>
                    </div>
                    <Progress value={(getImplementedProtocols() / web5Protocols.length) * 100} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Privacy Protection</span>
                      <span className="text-blue-400">{getPrivacyScore().toFixed(1)}%</span>
                    </div>
                    <Progress value={getPrivacyScore()} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Data Sovereignty</span>
                      <span className="text-purple-400">{getSovereigntyScore().toFixed(1)}%</span>
                    </div>
                    <Progress value={getSovereigntyScore()} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-400" />
                  Sovereignty Principles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Lock className="mx-auto h-8 w-8 text-green-400 mb-2" />
                    <h3 className="text-white font-medium mb-2">Self-Sovereign Identity</h3>
                    <p className="text-slate-400 text-sm">
                      Complete control over digital identity without intermediaries
                    </p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Database className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                    <h3 className="text-white font-medium mb-2">Data Ownership</h3>
                    <p className="text-slate-400 text-sm">
                      Personal data vaults with quantum encryption and distributed backup
                    </p>
                  </div>
                  <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                    <Fingerprint className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                    <h3 className="text-white font-medium mb-2">Veridium DNAΦ</h3>
                    <p className="text-slate-400 text-sm">
                      Biometric authentication with golden ratio coherence verification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="identity" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {identities.map((identity, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Decentralized Identity #{index + 1}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={
                        identity.method === 'spiral' ? 'text-purple-400 border-purple-400' :
                        identity.method === 'ion' ? 'text-blue-400 border-blue-400' :
                        identity.method === 'web' ? 'text-green-400 border-green-400' :
                        'text-yellow-400 border-yellow-400'
                      }>
                        {identity.method.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={
                        identity.status === 'active' ? 'text-green-400 border-green-400' :
                        identity.status === 'pending' ? 'text-yellow-400 border-yellow-400' :
                        'text-red-400 border-red-400'
                      }>
                        {identity.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-slate-900 p-4 rounded">
                    <div className="text-slate-400 text-xs mb-1">DID:</div>
                    <div className="text-cyan-400 font-mono text-sm break-all">{identity.did}</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-white font-medium mb-3">Verification Methods</h3>
                      <div className="space-y-3">
                        {identity.verificationMethods.map((method, methodIndex) => (
                          <div key={methodIndex} className="p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium">{method.id}</span>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className={
                                  method.type === 'VeridiumDNAPhi' ? 'text-purple-400 border-purple-400' :
                                  method.type === 'QuantumSafe' ? 'text-blue-400 border-blue-400' :
                                  'text-green-400 border-green-400'
                                }>
                                  {method.type}
                                </Badge>
                                {method.biometric && (
                                  <Fingerprint className="h-4 w-4 text-yellow-400" />
                                )}
                              </div>
                            </div>
                            <div className="text-slate-400 text-xs font-mono">
                              {method.publicKey.slice(0, 40)}...
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-3">Service Endpoints</h3>
                      <div className="space-y-3">
                        {identity.services.map((service, serviceIndex) => (
                          <div key={serviceIndex} className="p-3 bg-slate-700/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white font-medium">{service.id}</span>
                              <Badge variant="outline" className={
                                service.encryption === 'quantum' ? 'text-purple-400 border-purple-400' :
                                service.encryption === 'hybrid' ? 'text-blue-400 border-blue-400' :
                                'text-green-400 border-green-400'
                              }>
                                {service.encryption.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="text-slate-300 text-sm mb-1">{service.description}</div>
                            <div className="text-cyan-400 text-xs font-mono">
                              {service.serviceEndpoint}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-slate-600">
                    <div>
                      <span className="text-slate-400">Created:</span>
                      <div className="text-white">{new Date(identity.created).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Last Updated:</span>
                      <div className="text-white">{new Date(identity.updated).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Controller:</span>
                      <div className="text-white capitalize">{identity.controller}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Status:</span>
                      <div className={
                        identity.status === 'active' ? 'text-green-400' :
                        identity.status === 'pending' ? 'text-yellow-400' :
                        'text-red-400'
                      }>
                        {identity.status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {web5Protocols.map((protocol, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{protocol.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={
                        protocol.status === 'implemented' ? 'text-green-400 border-green-400' :
                        protocol.status === 'testing' ? 'text-yellow-400 border-yellow-400' :
                        'text-blue-400 border-blue-400'
                      }>
                        {protocol.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={
                        protocol.type === 'dwn' ? 'text-purple-400 border-purple-400' :
                        protocol.type === 'credential' ? 'text-blue-400 border-blue-400' :
                        protocol.type === 'presentation' ? 'text-green-400 border-green-400' :
                        protocol.type === 'messaging' ? 'text-cyan-400 border-cyan-400' :
                        'text-yellow-400 border-yellow-400'
                      }>
                        {protocol.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{protocol.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Privacy Level:</span>
                      <div className={
                        protocol.privacy === 'private' ? 'text-green-400' :
                        protocol.privacy === 'selective' ? 'text-yellow-400' :
                        'text-blue-400'
                      }>
                        {protocol.privacy}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Sovereignty:</span>
                      <div className={
                        protocol.sovereignty === 'full' ? 'text-green-400' :
                        protocol.sovereignty === 'partial' ? 'text-yellow-400' :
                        'text-red-400'
                      }>
                        {protocol.sovereignty}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Protocol Type:</span>
                      <div className="text-white capitalize">{protocol.type}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Implementation:</span>
                      <div className={
                        protocol.status === 'implemented' ? 'text-green-400' :
                        protocol.status === 'testing' ? 'text-yellow-400' :
                        'text-blue-400'
                      }>
                        {protocol.status}
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full border-slate-600 text-white"
                    disabled={protocol.status === 'planned'}
                  >
                    <Network className="mr-2 h-4 w-4" />
                    {protocol.status === 'implemented' ? 'Access Protocol' : 
                     protocol.status === 'testing' ? 'Join Testing' : 'Coming Soon'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vaults" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Personal Data Vaults</h2>
            <div className="flex items-center space-x-4">
              <Input
                value={vaultCreationName}
                onChange={(e) => setVaultCreationName(e.target.value)}
                placeholder="New vault name..."
                className="bg-slate-900 border-slate-600 text-white"
              />
              <Button 
                onClick={createNewVault}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!vaultCreationName.trim()}
              >
                <Database className="mr-2 h-4 w-4" />
                Create Vault
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataVaults.map((vault, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{vault.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {vault.encrypted && <Lock className="h-4 w-4 text-green-400" />}
                      {vault.distributed && <Network className="h-4 w-4 text-blue-400" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Size:</span>
                      <div className="text-white">{formatFileSize(vault.size)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Accessibility:</span>
                      <div className={
                        vault.accessibility === 'owner-only' ? 'text-green-400' :
                        vault.accessibility === 'permissioned' ? 'text-yellow-400' :
                        'text-blue-400'
                      }>
                        {vault.accessibility.replace('-', ' ')}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Encryption:</span>
                      <div className="text-green-400">
                        {vault.encrypted ? 'Enabled' : 'Disabled'}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Distribution:</span>
                      <div className="text-blue-400">
                        {vault.distributed ? 'Distributed' : 'Local'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Backup Type:</span>
                      <Badge variant="outline" className={
                        vault.backup === 'quantum' ? 'text-purple-400 border-purple-400' :
                        vault.backup === 'distributed' ? 'text-blue-400 border-blue-400' :
                        'text-green-400 border-green-400'
                      }>
                        {vault.backup.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Last Sync:</span>
                      <span className="text-white">
                        {new Date(vault.lastSync).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      className="flex-1 border-slate-600 text-white text-xs"
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      Access
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1 border-slate-600 text-white text-xs"
                    >
                      <Cloud className="mr-1 h-3 w-3" />
                      Sync
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-green-400" />
                  Privacy & Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {[
                    {
                      feature: 'Quantum Encryption',
                      status: 'enabled',
                      description: 'Post-quantum cryptography for all data at rest and in transit'
                    },
                    {
                      feature: 'Veridium DNAΦ',
                      status: 'enabled',
                      description: 'Biometric authentication with golden ratio coherence'
                    },
                    {
                      feature: 'Zero-Knowledge Proofs',
                      status: 'enabled',
                      description: 'Verify claims without revealing underlying data'
                    },
                    {
                      feature: 'Selective Disclosure',
                      status: 'enabled',
                      description: 'Share only necessary information for each interaction'
                    },
                    {
                      feature: 'Distributed Storage',
                      status: 'enabled',
                      description: 'Data distributed across multiple quantum-safe nodes'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{item.feature}</div>
                        <div className="text-slate-400 text-sm">{item.description}</div>
                      </div>
                      <Badge variant="outline" className={
                        item.status === 'enabled' ? 'text-green-400 border-green-400' :
                        'text-red-400 border-red-400'
                      }>
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Fingerprint className="mr-2 h-5 w-5 text-purple-400" />
                  Sovereignty Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
                    <p className="text-slate-300 text-sm">Data Ownership</p>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
                    <p className="text-slate-300 text-sm">Identity Control</p>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
                    <p className="text-slate-300 text-sm">Intermediaries</p>
                  </div>
                  <div className="p-4 bg-slate-700/50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400 mb-1">∞</div>
                    <p className="text-slate-300 text-sm">Quantum Security</p>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-400/30 rounded-lg">
                  <h3 className="text-green-400 font-bold mb-2">Sovereignty Declaration</h3>
                  <p className="text-slate-300 text-sm">
                    Full self-sovereign control over digital identity, personal data, and online interactions. 
                    No dependence on centralized authorities or intermediaries. Quantum-safe security with 
                    φ{coherence.toFixed(3)} coherence verification through Veridium DNAΦ signatures.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}