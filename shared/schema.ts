import { pgTable, text, serial, integer, boolean, timestamp, decimal, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const debtData = pgTable("debt_data", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  debtType: text("debt_type").notNull(), // 'public', 'business', 'household', 'financial'
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("USD"),
  year: integer("year").notNull(),
  quarter: integer("quarter"),
  gdpRatio: decimal("gdp_ratio", { precision: 8, scale: 4 }),
  interestRate: decimal("interest_rate", { precision: 5, scale: 2 }),
  povertyIndex: decimal("poverty_index", { precision: 5, scale: 2 }),
  accessRestrictionScore: decimal("access_restriction_score", { precision: 5, scale: 2 }),
  wealthTransferRate: decimal("wealth_transfer_rate", { precision: 8, scale: 4 }),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  source: text("source").notNull(),
  metadata: json("metadata"),
});

export const economicIndicators = pgTable("economic_indicators", {
  id: serial("id").primaryKey(),
  country: text("country").notNull(),
  indicator: text("indicator").notNull(), // 'gdp_growth', 'interest_rate', 'inflation', etc.
  value: decimal("value", { precision: 10, scale: 4 }).notNull(),
  year: integer("year").notNull(),
  quarter: integer("quarter"),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  source: text("source").notNull(),
});

export const debtOwnership = pgTable("debt_ownership", {
  id: serial("id").primaryKey(),
  debtorCountry: text("debtor_country").notNull(),
  creditorCountry: text("creditor_country"),
  creditorType: text("creditor_type").notNull(), // 'domestic', 'foreign', 'central_bank', 'commercial_bank', etc.
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  percentage: decimal("percentage", { precision: 5, scale: 2 }),
  year: integer("year").notNull(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const apiSources = pgTable("api_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  endpoint: text("endpoint").notNull(),
  status: text("status").notNull().default("active"), // 'active', 'inactive', 'error'
  rateLimit: integer("rate_limit"),
  requestsToday: integer("requests_today").default(0),
  lastSync: timestamp("last_sync"),
  apiKey: text("api_key"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDebtDataSchema = createInsertSchema(debtData).omit({
  id: true,
  lastUpdated: true,
});

export const insertEconomicIndicatorSchema = createInsertSchema(economicIndicators).omit({
  id: true,
  lastUpdated: true,
});

export const insertDebtOwnershipSchema = createInsertSchema(debtOwnership).omit({
  id: true,
  lastUpdated: true,
});

export const insertApiSourceSchema = createInsertSchema(apiSources).omit({
  id: true,
  requestsToday: true,
  lastSync: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type DebtData = typeof debtData.$inferSelect;
export type InsertDebtData = z.infer<typeof insertDebtDataSchema>;
export type EconomicIndicator = typeof economicIndicators.$inferSelect;
export type InsertEconomicIndicator = z.infer<typeof insertEconomicIndicatorSchema>;
export type DebtOwnership = typeof debtOwnership.$inferSelect;
export type InsertDebtOwnership = z.infer<typeof insertDebtOwnershipSchema>;
export type ApiSource = typeof apiSources.$inferSelect;
export type InsertApiSource = z.infer<typeof insertApiSourceSchema>;
