import { 
  users, 
  debtData, 
  economicIndicators, 
  debtOwnership, 
  apiSources,
  type User, 
  type InsertUser,
  type DebtData,
  type InsertDebtData,
  type EconomicIndicator,
  type InsertEconomicIndicator,
  type DebtOwnership,
  type InsertDebtOwnership,
  type ApiSource,
  type InsertApiSource
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Debt data operations
  getDebtData(): Promise<DebtData[]>;
  getDebtDataByCountry(country: string): Promise<DebtData[]>;
  getDebtDataByType(debtType: string): Promise<DebtData[]>;
  createDebtData(data: InsertDebtData): Promise<DebtData>;
  updateDebtData(id: number, data: Partial<InsertDebtData>): Promise<DebtData | undefined>;
  
  // Economic indicators
  getEconomicIndicators(): Promise<EconomicIndicator[]>;
  getEconomicIndicatorsByCountry(country: string): Promise<EconomicIndicator[]>;
  createEconomicIndicator(data: InsertEconomicIndicator): Promise<EconomicIndicator>;
  
  // Debt ownership
  getDebtOwnership(): Promise<DebtOwnership[]>;
  getDebtOwnershipByDebtor(debtorCountry: string): Promise<DebtOwnership[]>;
  createDebtOwnership(data: InsertDebtOwnership): Promise<DebtOwnership>;
  
  // API sources
  getApiSources(): Promise<ApiSource[]>;
  updateApiSource(id: number, data: Partial<InsertApiSource>): Promise<ApiSource | undefined>;
  incrementApiRequests(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private debtDataRecords: Map<number, DebtData>;
  private economicIndicatorRecords: Map<number, EconomicIndicator>;
  private debtOwnershipRecords: Map<number, DebtOwnership>;
  private apiSourceRecords: Map<number, ApiSource>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.debtDataRecords = new Map();
    this.economicIndicatorRecords = new Map();
    this.debtOwnershipRecords = new Map();
    this.apiSourceRecords = new Map();
    this.currentId = 1;
    
    // Initialize with sample API sources
    this.initializeApiSources();
    this.initializeGlobalDebtData();
  }

  private initializeApiSources() {
    const apiSources = [
      { name: "World Bank API", endpoint: "/v2/countries/debt", status: "active", rateLimit: 1000, requestsToday: 847 },
      { name: "IMF Data", endpoint: "/api/debt-statistics", status: "active", rateLimit: 500, requestsToday: 324 },
      { name: "OECD Statistics", endpoint: "/stats/debt-indicators", status: "active", rateLimit: 200, requestsToday: 156 }
    ];

    apiSources.forEach(source => {
      const id = this.currentId++;
      this.apiSourceRecords.set(id, {
        id,
        ...source,
        lastSync: new Date(),
        apiKey: null
      });
    });
  }

  private initializeGlobalDebtData() {
    const globalData = [
      // Global totals
      { country: "Global", debtType: "public", amount: "91400000000000", year: 2024, source: "World Bank" },
      { country: "Global", debtType: "business", amount: "164500000000000", year: 2024, source: "World Bank" },
      { country: "Global", debtType: "household", amount: "59100000000000", year: 2024, source: "World Bank" },
      { country: "Global", debtType: "financial", amount: "70400000000000", year: 2024, source: "World Bank" },
      
      // US data
      { country: "United States", debtType: "public", amount: "33000000000000", year: 2024, source: "US Treasury" },
      { country: "United States", debtType: "household", amount: "17500000000000", year: 2024, source: "Federal Reserve" },
      { country: "United States", debtType: "business", amount: "18200000000000", year: 2024, source: "Federal Reserve" },
      
      // China data
      { country: "China", debtType: "public", amount: "14800000000000", year: 2024, source: "PBOC" },
      { country: "China", debtType: "business", amount: "28500000000000", year: 2024, source: "PBOC" },
      { country: "China", debtType: "household", amount: "8900000000000", year: 2024, source: "PBOC" },
      
      // Japan data
      { country: "Japan", debtType: "public", amount: "10100000000000", year: 2024, source: "MOF Japan" },
      { country: "Japan", debtType: "household", amount: "3200000000000", year: 2024, source: "BOJ" },
      
      // EU data
      { country: "European Union", debtType: "public", amount: "13600000000000", year: 2024, source: "ECB" },
      { country: "European Union", debtType: "household", amount: "8100000000000", year: 2024, source: "ECB" }
    ];

    globalData.forEach(data => {
      const id = this.currentId++;
      this.debtDataRecords.set(id, {
        id,
        country: data.country,
        debtType: data.debtType,
        amount: data.amount,
        currency: "USD",
        year: data.year,
        quarter: null,
        gdpRatio: null,
        lastUpdated: new Date(),
        source: data.source,
        metadata: null
      });
    });

    // Initialize economic indicators
    const indicators = [
      { country: "Global", indicator: "gdp_growth", value: "3.2", year: 2024, source: "IMF" },
      { country: "Global", indicator: "interest_rate", value: "5.5", year: 2024, source: "Central Banks Average" },
      { country: "Global", indicator: "inflation", value: "4.1", year: 2024, source: "IMF" },
      { country: "United States", indicator: "gdp_growth", value: "2.8", year: 2024, source: "BEA" },
      { country: "China", indicator: "gdp_growth", value: "5.2", year: 2024, source: "NBS" },
      { country: "Japan", indicator: "gdp_growth", value: "1.1", year: 2024, source: "ESRI" }
    ];

    indicators.forEach(indicator => {
      const id = this.currentId++;
      this.economicIndicatorRecords.set(id, {
        id,
        country: indicator.country,
        indicator: indicator.indicator,
        value: indicator.value,
        year: indicator.year,
        quarter: null,
        lastUpdated: new Date(),
        source: indicator.source
      });
    });

    // Initialize debt ownership data
    const ownership = [
      { debtorCountry: "United States", creditorCountry: "Japan", creditorType: "foreign", amount: "1200000000000", percentage: "7.2", year: 2024 },
      { debtorCountry: "United States", creditorCountry: "China", creditorType: "foreign", amount: "867000000000", percentage: "5.2", year: 2024 },
      { debtorCountry: "United States", creditorCountry: "United Kingdom", creditorType: "foreign", amount: "634000000000", percentage: "3.8", year: 2024 },
      { debtorCountry: "United States", creditorCountry: null, creditorType: "domestic", amount: "22400000000000", percentage: "68.0", year: 2024 }
    ];

    ownership.forEach(own => {
      const id = this.currentId++;
      this.debtOwnershipRecords.set(id, {
        id,
        debtorCountry: own.debtorCountry,
        creditorCountry: own.creditorCountry,
        creditorType: own.creditorType,
        amount: own.amount,
        percentage: own.percentage,
        year: own.year,
        lastUpdated: new Date()
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getDebtData(): Promise<DebtData[]> {
    return Array.from(this.debtDataRecords.values());
  }

  async getDebtDataByCountry(country: string): Promise<DebtData[]> {
    return Array.from(this.debtDataRecords.values()).filter(data => data.country === country);
  }

  async getDebtDataByType(debtType: string): Promise<DebtData[]> {
    return Array.from(this.debtDataRecords.values()).filter(data => data.debtType === debtType);
  }

  async createDebtData(insertData: InsertDebtData): Promise<DebtData> {
    const id = this.currentId++;
    const data: DebtData = { 
      ...insertData, 
      id,
      lastUpdated: new Date()
    };
    this.debtDataRecords.set(id, data);
    return data;
  }

  async updateDebtData(id: number, updateData: Partial<InsertDebtData>): Promise<DebtData | undefined> {
    const existing = this.debtDataRecords.get(id);
    if (!existing) return undefined;
    
    const updated = { 
      ...existing, 
      ...updateData,
      lastUpdated: new Date()
    };
    this.debtDataRecords.set(id, updated);
    return updated;
  }

  async getEconomicIndicators(): Promise<EconomicIndicator[]> {
    return Array.from(this.economicIndicatorRecords.values());
  }

  async getEconomicIndicatorsByCountry(country: string): Promise<EconomicIndicator[]> {
    return Array.from(this.economicIndicatorRecords.values()).filter(indicator => indicator.country === country);
  }

  async createEconomicIndicator(insertData: InsertEconomicIndicator): Promise<EconomicIndicator> {
    const id = this.currentId++;
    const data: EconomicIndicator = { 
      ...insertData, 
      id,
      lastUpdated: new Date()
    };
    this.economicIndicatorRecords.set(id, data);
    return data;
  }

  async getDebtOwnership(): Promise<DebtOwnership[]> {
    return Array.from(this.debtOwnershipRecords.values());
  }

  async getDebtOwnershipByDebtor(debtorCountry: string): Promise<DebtOwnership[]> {
    return Array.from(this.debtOwnershipRecords.values()).filter(ownership => ownership.debtorCountry === debtorCountry);
  }

  async createDebtOwnership(insertData: InsertDebtOwnership): Promise<DebtOwnership> {
    const id = this.currentId++;
    const data: DebtOwnership = { 
      ...insertData, 
      id,
      lastUpdated: new Date()
    };
    this.debtOwnershipRecords.set(id, data);
    return data;
  }

  async getApiSources(): Promise<ApiSource[]> {
    return Array.from(this.apiSourceRecords.values());
  }

  async updateApiSource(id: number, updateData: Partial<InsertApiSource>): Promise<ApiSource | undefined> {
    const existing = this.apiSourceRecords.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updateData };
    this.apiSourceRecords.set(id, updated);
    return updated;
  }

  async incrementApiRequests(id: number): Promise<void> {
    const existing = this.apiSourceRecords.get(id);
    if (existing) {
      existing.requestsToday = (existing.requestsToday || 0) + 1;
      this.apiSourceRecords.set(id, existing);
    }
  }
}

export const storage = new MemStorage();
