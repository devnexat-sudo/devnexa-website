import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

/** Project enquiries submitted through the contact form. */
export const enquiries = mysqlTable("enquiries", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 120 }).notNull(),
  companyName: varchar("company_name", { length: 160 }),
  email: varchar("email", { length: 190 }).notNull(),
  country: varchar("country", { length: 90 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 40 }),
  service: mysqlEnum("service", [
    "mobile-app-development",
    "game-development",
    "white-label-development",
    "other",
  ]).notNull(),
  budget: varchar("budget", { length: 40 }),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
