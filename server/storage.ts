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
import { db } from "./db";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Debt data operations
  async getDebtData(): Promise<DebtData[]> {
    return await db.select().from(debtData);
  }

  async getDebtDataByCountry(country: string): Promise<DebtData[]> {
    return await db.select().from(debtData).where(eq(debtData.country, country));
  }

  async getDebtDataByType(debtType: string): Promise<DebtData[]> {
    return await db.select().from(debtData).where(eq(debtData.debtType, debtType));
  }

  async createDebtData(insertData: InsertDebtData): Promise<DebtData> {
    const [data] = await db
      .insert(debtData)
      .values(insertData)
      .returning();
    return data;
  }

  async updateDebtData(id: number, updateData: Partial<InsertDebtData>): Promise<DebtData | undefined> {
    const [data] = await db
      .update(debtData)
      .set(updateData)
      .where(eq(debtData.id, id))
      .returning();
    return data || undefined;
  }

  // Economic indicators
  async getEconomicIndicators(): Promise<EconomicIndicator[]> {
    return await db.select().from(economicIndicators);
  }

  async getEconomicIndicatorsByCountry(country: string): Promise<EconomicIndicator[]> {
    return await db.select().from(economicIndicators).where(eq(economicIndicators.country, country));
  }

  async createEconomicIndicator(insertData: InsertEconomicIndicator): Promise<EconomicIndicator> {
    const [data] = await db
      .insert(economicIndicators)
      .values(insertData)
      .returning();
    return data;
  }

  // Debt ownership
  async getDebtOwnership(): Promise<DebtOwnership[]> {
    return await db.select().from(debtOwnership);
  }

  async getDebtOwnershipByDebtor(debtorCountry: string): Promise<DebtOwnership[]> {
    return await db.select().from(debtOwnership).where(eq(debtOwnership.debtorCountry, debtorCountry));
  }

  async createDebtOwnership(insertData: InsertDebtOwnership): Promise<DebtOwnership> {
    const [data] = await db
      .insert(debtOwnership)
      .values(insertData)
      .returning();
    return data;
  }

  // API sources
  async getApiSources(): Promise<ApiSource[]> {
    return await db.select().from(apiSources);
  }

  async updateApiSource(id: number, updateData: Partial<InsertApiSource>): Promise<ApiSource | undefined> {
    const [data] = await db
      .update(apiSources)
      .set(updateData)
      .where(eq(apiSources.id, id))
      .returning();
    return data || undefined;
  }

  async incrementApiRequests(id: number): Promise<void> {
    const currentRecord = await db.select({ current: apiSources.requestsToday }).from(apiSources).where(eq(apiSources.id, id));
    const newCount = (currentRecord[0]?.current || 0) + 1;
    
    await db
      .update(apiSources)
      .set({ requestsToday: newCount })
      .where(eq(apiSources.id, id));
  }
}

export const storage = new DatabaseStorage();