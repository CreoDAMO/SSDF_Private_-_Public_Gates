import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertDebtDataSchema, insertEconomicIndicatorSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // SpiralEcosystem API endpoints
  app.post('/api/spiral/pdf-upload', async (req, res) => {
    try {
      const txId = `spiral-tx-${Date.now()}`;
      const coherence = 1.618;
      
      res.json({
        txId,
        status: 'uploaded',
        coherence,
        qchainUrl: `https://spiral-chain.qx/tx/PDF-${Date.now()}`,
        spiralVaultPath: `sv://documents/uploaded-${Date.now()}.pdf`,
        timestamp: new Date().toISOString(),
        tuGenerated: Math.floor(Math.log10(500) * 0.85 * 7 * coherence)
      });
    } catch (error) {
      console.error('Error uploading PDF to SpiralVault:', error);
      res.status(500).json({ error: 'Failed to upload PDF to QCHAIN' });
    }
  });

  app.post('/api/spiral/debt-nullify', async (req, res) => {
    try {
      const { amount, coherence = 1.618 } = req.body;
      const sri = Math.floor(Math.log10(amount || 324000000000000) * 0.85);
      const trustUnits = sri * 7 * coherence;
      
      res.json({
        originalDebt: amount,
        nullified: true,
        trustUnitsGenerated: trustUnits,
        coherence,
        timestamp: new Date().toISOString(),
        txId: `spiral-nullify-${Date.now()}`
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to nullify debt' });
    }
  });

  app.get('/api/spiral/coherence', async (req, res) => {
    try {
      const coherence = 1.618 + Math.sin(Date.now() / 10000) * 0.001;
      res.json({
        coherence,
        goldenRatio: 1.618,
        resonance: 'infinite_hz',
        pulse: 735 + (Date.now() % 15),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get coherence data' });
    }
  });

  // Debt data endpoints
  app.get("/api/debt-data", async (req, res) => {
    try {
      const data = await storage.getDebtData();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch debt data" });
    }
  });

  app.get("/api/debt-data/country/:country", async (req, res) => {
    try {
      const { country } = req.params;
      const data = await storage.getDebtDataByCountry(country);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch debt data by country" });
    }
  });

  app.get("/api/debt-data/type/:type", async (req, res) => {
    try {
      const { type } = req.params;
      const data = await storage.getDebtDataByType(type);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch debt data by type" });
    }
  });

  app.post("/api/debt-data", async (req, res) => {
    try {
      const validatedData = insertDebtDataSchema.parse(req.body);
      const created = await storage.createDebtData(validatedData);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid debt data" });
    }
  });

  // Economic indicators endpoints
  app.get("/api/economic-indicators", async (req, res) => {
    try {
      const data = await storage.getEconomicIndicators();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch economic indicators" });
    }
  });

  app.get("/api/economic-indicators/country/:country", async (req, res) => {
    try {
      const { country } = req.params;
      const data = await storage.getEconomicIndicatorsByCountry(country);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch economic indicators by country" });
    }
  });

  app.post("/api/economic-indicators", async (req, res) => {
    try {
      const validatedData = insertEconomicIndicatorSchema.parse(req.body);
      const created = await storage.createEconomicIndicator(validatedData);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ error: "Invalid economic indicator data" });
    }
  });

  // Debt ownership endpoints
  app.get("/api/debt-ownership", async (req, res) => {
    try {
      const data = await storage.getDebtOwnership();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch debt ownership data" });
    }
  });

  app.get("/api/debt-ownership/debtor/:country", async (req, res) => {
    try {
      const { country } = req.params;
      const data = await storage.getDebtOwnershipByDebtor(country);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch debt ownership by debtor" });
    }
  });

  // API sources endpoints
  app.get("/api/sources", async (req, res) => {
    try {
      const sources = await storage.getApiSources();
      res.json(sources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch API sources" });
    }
  });

  // Scenario analysis endpoint
  app.post("/api/scenario-analysis", async (req, res) => {
    try {
      const { scenarioType, severity, gdpGrowth, interestRate } = req.body;
      
      // Calculate scenario impact based on parameters
      let gdpImpact = 0;
      let debtBurdenIncrease = 0;
      let stabilityRisk = "Low";

      switch (scenarioType) {
        case "Debt Crisis":
          gdpImpact = -2.4 * (severity / 100);
          debtBurdenIncrease = 15.7 * (severity / 100);
          stabilityRisk = severity > 50 ? "High" : severity > 25 ? "Moderate" : "Low";
          break;
        case "Interest Rate Shock":
          gdpImpact = -1.8 * (severity / 100);
          debtBurdenIncrease = 12.3 * (severity / 100);
          stabilityRisk = severity > 50 ? "High" : "Moderate";
          break;
        case "Economic Recession":
          gdpImpact = -3.2 * (severity / 100);
          debtBurdenIncrease = 18.5 * (severity / 100);
          stabilityRisk = "High";
          break;
        default:
          gdpImpact = -1.0 * (severity / 100);
          debtBurdenIncrease = 8.0 * (severity / 100);
      }

      const analysis = {
        scenarioType,
        severity,
        projectedImpact: {
          gdpImpact: gdpImpact.toFixed(1),
          debtBurdenIncrease: debtBurdenIncrease.toFixed(1),
          stabilityRisk
        },
        parameters: {
          gdpGrowth,
          interestRate
        },
        timestamp: new Date().toISOString()
      };

      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: "Failed to perform scenario analysis" });
    }
  });

  // Sustainability calculation endpoint
  app.post("/api/sustainability-score", async (req, res) => {
    try {
      const { gdpGrowth, interestRate, country = "Global" } = req.body;
      
      // Simple sustainability score calculation
      // Higher GDP growth is better, lower interest rates are better
      const baseScore = 50;
      const gdpBonus = Math.min(gdpGrowth * 5, 30);
      const interestPenalty = Math.min(interestRate * 2, 25);
      
      const score = Math.max(0, Math.min(100, baseScore + gdpBonus - interestPenalty));
      
      res.json({
        score: Math.round(score),
        factors: {
          gdpGrowth,
          interestRate,
          country
        },
        assessment: score > 80 ? "Excellent" : score > 60 ? "Good" : score > 40 ? "Moderate" : "Poor"
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate sustainability score" });
    }
  });

  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    // Send initial connection message
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'connection',
        message: 'Connected to Global Debt Analytics',
        timestamp: new Date().toISOString()
      }));
    }

    // Send periodic updates
    const updateInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        // Simulate real-time debt updates
        const updates = [
          {
            type: 'debt_update',
            country: 'US Treasury',
            description: `+$${(Math.random() * 5).toFixed(1)}B new issuance`,
            timestamp: new Date().toISOString(),
            impact: 'positive'
          },
          {
            type: 'debt_update',
            country: 'China Corporate',
            description: `-$${(Math.random() * 3).toFixed(1)}B bond retirement`,
            timestamp: new Date().toISOString(),
            impact: 'negative'
          },
          {
            type: 'debt_update',
            country: 'EU Household',
            description: `+$${(Math.random() * 2).toFixed(1)}B mortgage growth`,
            timestamp: new Date().toISOString(),
            impact: 'neutral'
          }
        ];

        const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
        ws.send(JSON.stringify(randomUpdate));
      }
    }, 30000); // Send update every 30 seconds

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
      clearInterval(updateInterval);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clearInterval(updateInterval);
    });
  });

  return httpServer;
}
