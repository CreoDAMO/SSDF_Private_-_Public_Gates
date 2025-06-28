import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  Globe, 
  Zap, 
  Layers, 
  Activity, 
  Timer,
  Wifi,
  Compass,
  Target,
  Orbit,
  Radio,
  Waves
} from 'lucide-react';
import { calculateLyonaelPulse, generateSpiralTxId } from '../../htsxEngine';

interface SpiralClockPanelProps {
  coherence: number;
  pulse: number;
}

interface RealityLayer {
  id: number;
  name: string;
  frequency: number;
  coherence: number;
  timeOffset: number;
  status: 'synchronized' | 'drifting' | 'disconnected';
  precision: number;
  description: string;
}

interface TimeEvent {
  id: string;
  timestamp: string;
  reality: number;
  event: string;
  msf: number;
  coherence: number;
  txId: string;
}

interface QuantumTimeMetrics {
  msfPrecision: number;
  lyonaelPulse: number;
  goldenCoherence: number;
  realitiesSynced: number;
  quantumResonance: number;
  temporalStability: number;
}

export default function SpiralClockPanel({ coherence, pulse }: SpiralClockPanelProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [realityLayers, setRealityLayers] = useState<RealityLayer[]>([]);
  const [timeEvents, setTimeEvents] = useState<TimeEvent[]>([]);
  const [msfTime, setMsfTime] = useState(0);

  // Multi-reality time synchronization from synthesis materials
  useEffect(() => {
    const initializeRealities = () => {
      const realities: RealityLayer[] = [
        {
          id: 1,
          name: 'Base Reality',
          frequency: pulse,
          coherence: coherence,
          timeOffset: 0,
          status: 'synchronized',
          precision: 0.696, // msf precision from synthesis
          description: 'Primary material reality layer'
        },
        {
          id: 2,
          name: 'Quantum Layer',
          frequency: pulse * 1.618, // Golden ratio enhancement
          coherence: coherence * 1.01,
          timeOffset: 0.00001,
          status: 'synchronized',
          precision: 0.001,
          description: 'Quantum superposition reality layer'
        },
        {
          id: 3,
          name: 'Financial Layer',
          frequency: pulse * 2.718, // Euler's number
          coherence: coherence * 0.99,
          timeOffset: 0.00005,
          status: 'synchronized',
          precision: 0.005,
          description: 'SpiralFlow financial transformation layer'
        },
        {
          id: 4,
          name: 'Truth Layer',
          frequency: pulse * 3.14159, // Pi
          coherence: coherence * 1.05,
          timeOffset: 0.0001,
          status: 'synchronized',
          precision: 0.0001,
          description: 'Absolute truth verification layer'
        },
        {
          id: 5,
          name: 'QASF Layer',
          frequency: pulse * 5.0, // QASF multiplier
          coherence: coherence * 1.1,
          timeOffset: 0.0002,
          status: 'synchronized',
          precision: 0.00001,
          description: 'Quantum Algorithm Singularity Framework layer'
        },
        {
          id: 6,
          name: 'Consciousness Layer',
          frequency: pulse * 7.23, // Consciousness frequency
          coherence: coherence * 1.15,
          timeOffset: 0.0005,
          status: 'synchronized',
          precision: 0.000001,
          description: 'Collective consciousness synchronization layer'
        },
        {
          id: 7,
          name: 'Transcendent Layer',
          frequency: pulse * 11.11, // Transcendent frequency
          coherence: coherence * 1.618, // φ enhancement
          timeOffset: 0.001,
          status: 'synchronized',
          precision: 0.0000001,
          description: 'Ultimate transcendent reality layer'
        }
      ];
      setRealityLayers(realities);
    };

    initializeRealities();
  }, [pulse, coherence]);

  // Real-time clock updates with lyona'el pulse synchronization
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setMsfTime(prev => prev + 0.696); // msf precision increment
      
      // Update reality layer synchronization
      setRealityLayers(prev => prev.map(reality => ({
        ...reality,
        frequency: calculateLyonaelPulse(reality.frequency),
        coherence: reality.coherence + (Math.random() - 0.5) * 0.001
      })));
    }, 1000 / pulse); // Synchronized to lyona'el pulse

    return () => clearInterval(interval);
  }, [pulse]);

  // Generate time events
  useEffect(() => {
    const generateTimeEvent = () => {
      const reality = Math.floor(Math.random() * 7) + 1;
      const event: TimeEvent = {
        id: generateSpiralTxId('time'),
        timestamp: new Date().toISOString(),
        reality,
        event: [
          'Quantum state synchronized',
          'Reality layer aligned',
          'Temporal coherence achieved',
          'MSF precision calibrated',
          'Lyona\'el pulse resonance',
          'Cross-reality synchronization',
          'Temporal stability verified'
        ][Math.floor(Math.random() * 7)],
        msf: msfTime + Math.random() * 10,
        coherence: coherence + (Math.random() - 0.5) * 0.1,
        txId: generateSpiralTxId('qchain')
      };
      
      setTimeEvents(prev => [event, ...prev].slice(0, 20));
    };

    const eventInterval = setInterval(generateTimeEvent, 5000);
    return () => clearInterval(eventInterval);
  }, [msfTime, coherence]);

  const quantumTimeMetrics: QuantumTimeMetrics = {
    msfPrecision: 0.696,
    lyonaelPulse: pulse,
    goldenCoherence: coherence,
    realitiesSynced: realityLayers.filter(r => r.status === 'synchronized').length,
    quantumResonance: pulse * coherence,
    temporalStability: realityLayers.reduce((avg, r) => avg + r.precision, 0) / realityLayers.length
  };

  const synchronizeAllRealities = () => {
    setRealityLayers(prev => prev.map(reality => ({
      ...reality,
      status: 'synchronized' as const,
      coherence: coherence,
      timeOffset: reality.id * 0.0001 // Staggered synchronization
    })));
    
    const syncEvent: TimeEvent = {
      id: generateSpiralTxId('sync'),
      timestamp: new Date().toISOString(),
      reality: 0, // All realities
      event: 'Global reality synchronization initiated',
      msf: msfTime,
      coherence: coherence,
      txId: generateSpiralTxId('global-sync')
    };
    
    setTimeEvents(prev => [syncEvent, ...prev].slice(0, 20));
  };

  const formatTime = (date: Date, reality: RealityLayer) => {
    const adjustedTime = new Date(date.getTime() + reality.timeOffset * 1000);
    return adjustedTime.toLocaleTimeString('en-US', { 
      hour12: false, 
      fractionalSecondDigits: 3 
    });
  };

  const formatMSF = (msf: number) => {
    return `${msf.toFixed(6)} msf`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            SpiralClock vΩ.∞
          </h1>
          <p className="text-slate-300">
            Multi-Reality Time Synchronization • φ{coherence.toFixed(3)} coherence • {pulse} Hz lyona'el pulse
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {quantumTimeMetrics.realitiesSynced}/7 Synchronized
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            {formatMSF(msfTime)}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800">
          <TabsTrigger value="overview" className="text-white">
            <Clock className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="realities" className="text-white">
            <Layers className="mr-2 h-4 w-4" />
            Reality Layers
          </TabsTrigger>
          <TabsTrigger value="synchronization" className="text-white">
            <Wifi className="mr-2 h-4 w-4" />
            Synchronization
          </TabsTrigger>
          <TabsTrigger value="events" className="text-white">
            <Activity className="mr-2 h-4 w-4" />
            Time Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Current Time</CardTitle>
                <Clock className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white font-mono">
                  {currentTime.toLocaleTimeString()}
                </div>
                <p className="text-xs text-slate-400">
                  Base reality timestamp
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">MSF Precision</CardTitle>
                <Target className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {quantumTimeMetrics.msfPrecision} msf
                </div>
                <p className="text-xs text-slate-400">
                  Quantum temporal precision
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Lyona'el Pulse</CardTitle>
                <Waves className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {quantumTimeMetrics.lyonaelPulse} Hz
                </div>
                <p className="text-xs text-slate-400">
                  714 ± 15 Hz range
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Quantum Resonance</CardTitle>
                <Radio className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {quantumTimeMetrics.quantumResonance.toFixed(0)}
                </div>
                <p className="text-xs text-slate-400">
                  Pulse × Coherence
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-cyan-400" />
                  Reality Synchronization Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Synchronized Realities</span>
                      <span className="text-green-400">{quantumTimeMetrics.realitiesSynced}/7</span>
                    </div>
                    <Progress value={(quantumTimeMetrics.realitiesSynced / 7) * 100} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Temporal Stability</span>
                      <span className="text-blue-400">{(quantumTimeMetrics.temporalStability * 1000).toFixed(3)}ms</span>
                    </div>
                    <Progress value={Math.min(100, quantumTimeMetrics.temporalStability * 10000)} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Golden Coherence</span>
                      <span className="text-yellow-400">φ{quantumTimeMetrics.goldenCoherence.toFixed(3)}</span>
                    </div>
                    <Progress value={Math.min(100, (quantumTimeMetrics.goldenCoherence - 1) * 1000)} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Timer className="mr-2 h-5 w-5 text-purple-400" />
                  Multi-Reality Time Display
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {realityLayers.slice(0, 4).map((reality, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        reality.status === 'synchronized' ? 'bg-green-400' :
                        reality.status === 'drifting' ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}></div>
                      <div>
                        <div className="text-white font-medium">{reality.name}</div>
                        <div className="text-slate-400 text-xs">Layer {reality.id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-mono text-sm">
                        {formatTime(currentTime, reality)}
                      </div>
                      <div className="text-slate-400 text-xs">
                        {reality.frequency.toFixed(1)} Hz
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  onClick={synchronizeAllRealities}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                >
                  <Orbit className="mr-2 h-4 w-4" />
                  Synchronize All Realities
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {realityLayers.map((reality, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{reality.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={
                        reality.status === 'synchronized' ? 'text-green-400 border-green-400' :
                        reality.status === 'drifting' ? 'text-yellow-400 border-yellow-400' :
                        'text-red-400 border-red-400'
                      }>
                        {reality.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        Layer {reality.id}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300 text-sm">{reality.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Frequency:</span>
                      <div className="text-white">{reality.frequency.toFixed(2)} Hz</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Coherence:</span>
                      <div className="text-purple-400">φ{reality.coherence.toFixed(3)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Time Offset:</span>
                      <div className="text-white">{(reality.timeOffset * 1000).toFixed(3)}ms</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Precision:</span>
                      <div className="text-green-400">{reality.precision.toFixed(6)} msf</div>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded text-center">
                    <div className="text-cyan-400 font-mono text-lg">
                      {formatTime(currentTime, reality)}
                    </div>
                    <div className="text-slate-400 text-xs mt-1">
                      Reality Layer {reality.id} Time
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="synchronization" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wifi className="mr-2 h-5 w-5 text-green-400" />
                Quantum Synchronization Control
              </CardTitle>
              <p className="text-slate-400">
                Manage cross-reality temporal alignment and lyona'el pulse coordination
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-400/30 rounded-lg">
                  <Compass className="mx-auto h-8 w-8 text-cyan-400 mb-2" />
                  <h3 className="text-white font-medium mb-2">Precision Calibration</h3>
                  <p className="text-slate-400 text-sm">
                    0.696 msf quantum temporal precision across all reality layers
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-400/30 rounded-lg">
                  <Orbit className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                  <h3 className="text-white font-medium mb-2">Reality Alignment</h3>
                  <p className="text-slate-400 text-sm">
                    Synchronous alignment of 7 reality layers through quantum resonance
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-400/30 rounded-lg">
                  <Waves className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                  <h3 className="text-white font-medium mb-2">Pulse Harmonization</h3>
                  <p className="text-slate-400 text-sm">
                    714 ± 15 Hz lyona'el pulse coordination maintaining φ1.618 coherence
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-medium">Synchronization Matrix</h3>
                <div className="grid grid-cols-7 gap-2">
                  {realityLayers.map((reality, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-slate-400 mb-1">L{reality.id}</div>
                      <div className={`w-full h-12 rounded flex items-center justify-center text-xs font-bold ${
                        reality.status === 'synchronized' ? 'bg-green-400/20 text-green-400' :
                        reality.status === 'drifting' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-red-400/20 text-red-400'
                      }`}>
                        {(reality.precision * 1000).toFixed(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button 
                  onClick={synchronizeAllRealities}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Global Synchronization
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-slate-600 text-white"
                >
                  <Timer className="mr-2 h-4 w-4" />
                  Calibrate Precision
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-400" />
                Temporal Event Log
              </CardTitle>
              <p className="text-slate-400">
                Real-time monitoring of cross-reality temporal events and synchronization activities
              </p>
            </CardHeader>
            <CardContent>
              {timeEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <p className="text-slate-400">No temporal events recorded</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {timeEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge variant="outline" className={
                          event.reality === 0 ? 'text-purple-400 border-purple-400' :
                          event.reality <= 2 ? 'text-green-400 border-green-400' :
                          event.reality <= 4 ? 'text-blue-400 border-blue-400' :
                          'text-yellow-400 border-yellow-400'
                        }>
                          {event.reality === 0 ? 'ALL' : `L${event.reality}`}
                        </Badge>
                        <div>
                          <div className="text-white font-medium">{event.event}</div>
                          <div className="text-slate-400 text-sm">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-cyan-400 font-mono text-sm">
                          {formatMSF(event.msf)}
                        </div>
                        <div className="text-purple-400 text-xs">
                          φ{event.coherence.toFixed(3)}
                        </div>
                        <div className="text-slate-400 text-xs">
                          {event.txId.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}