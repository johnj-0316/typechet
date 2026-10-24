import { sql } from 'drizzle-orm';
import {
    bigint,
    boolean,
    check,
    foreignKey,
    index,
    integer,
    json,
    jsonb,
    pgTable,
    primaryKey,
    smallint,
    text,
    timestamp,
    uniqueIndex,
    uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    uid: uuid('uid').defaultRandom().primaryKey(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    email: text('email').unique().notNull(),
    hashedPassword: text('hashed_password'),
});

export const user_sessions = pgTable(
    'user_sessions',
    {
        sid: text('sid').primaryKey(),
        sess: json('sess').notNull(),
        expire: timestamp('expire', {
            precision: 6,
            withTimezone: false,
        }).notNull(),
    },
    (table) => [index('IDX_user_sessions_expire').on(table.expire)],
);

export const oauth = pgTable(
    'oauth',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.uid, { onDelete: 'cascade' }),
        provider: text('provider').notNull(),
        providerAccountId: text('provider_account_id').notNull(),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
    },
    (table) => [
        uniqueIndex('oauth_provider_account_unique').on(table.provider, table.providerAccountId),
        index('oauth_accounts_user_id_idx').on(table.userId),
    ],
);

export const userProfiles = pgTable('user_profile', {
    id: uuid('id')
        .primaryKey()
        .references(() => users.uid, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    name: text('name'),
    displayName: text('display_name'),
    profileUrl: text('profile_url'),
    phone: text('phone'),
});

export const urls = pgTable('url', {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    url: text('url').notNull().default(''),
    creator: text('creator'),
    brand: text('brand'),
});

export const patterns = pgTable('patterns', {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    authorId: uuid('author_id').references(() => userProfiles.id, { onDelete: 'set null' }),
    urlId: bigint('url_id', { mode: 'number' }).references(() => urls.id, {
        onDelete: 'set null',
    }),
    rows: jsonb('rows').notNull(),
    title: text('title').notNull().default('Untitled Pattern'),
    isEditing: boolean('is_editing').notNull().default(false),
    description: text('description'),
});

export const inventory = pgTable(
    'inventory',
    {
        id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
        item: text('item').notNull(),
        amount: integer('amount'),
        category: text('category').notNull().default('other'),
        color: text('color'),
        cost: smallint('cost'),
        urlId: bigint('url_id', { mode: 'number' }).references(() => urls.id, {
            onUpdate: 'cascade',
            onDelete: 'set null',
        }),
        authorId: uuid('author_id')
            .notNull()
            .references(() => userProfiles.id, { onUpdate: 'cascade', onDelete: 'cascade' }),
        amountUnit: text('amount_unit').default('g'),
        costUnit: text('cost_unit'),
        colorHex: text('color_hex'),
    },
    (table) => [
        check(
            'amount_amount_unit_coexist',
            sql`((${table.amount} is null and ${table.amountUnit} is null) or (${table.amount} is not null and ${table.amountUnit} is not null))`,
        ),
        check(
            'color_hex_requires_color',
            sql`${table.colorHex} is null or ${table.color} is not null`,
        ),
        check(
            'cost_cost_unit_coexist',
            sql`((${table.cost} is null and ${table.costUnit} is null) or (${table.cost} is not null and ${table.costUnit} is not null))`,
        ),
    ],
);

export const materials = pgTable(
    'materials',
    {
        id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
        item: text('item').notNull(),
        amount: integer('amount').notNull(),
        category: text('category').notNull().default('other'),
        color: text('color'),
        cost: smallint('cost'),
        urlId: bigint('url_id', { mode: 'number' }).references(() => urls.id, {
            onUpdate: 'cascade',
            onDelete: 'set null',
        }),
        amountUnit: text('amount_unit').notNull().default('g'),
        patternId: bigint('pattern_id', { mode: 'number' }).references(() => patterns.id, {
            onUpdate: 'cascade',
            onDelete: 'cascade',
        }),
        costUnit: text('cost_unit'),
        colorHex: text('color_hex'),
    },
    (table) => [
        check(
            'amount_amount_unit_coexist',
            sql`((${table.amount} is null and ${table.amountUnit} is null) or (${table.amount} is not null and ${table.amountUnit} is not null))`,
        ),
        check(
            'color_hex_requires_color',
            sql`${table.colorHex} is null or ${table.color} is not null`,
        ),
        check(
            'cost_cost_unit_coexist',
            sql`((${table.cost} is null and ${table.costUnit} is null) or (${table.cost} is not null and ${table.costUnit} is not null))`,
        ),
    ],
);

export const owners = pgTable(
    'owners',
    {
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
        message: text('message'),
        patternId: bigint('pattern_id', { mode: 'number' })
            .notNull()
            .references(() => patterns.id, { onDelete: 'cascade' }),
        userId: uuid('user_id')
            .notNull()
            .references(() => userProfiles.id, { onDelete: 'cascade' }),
    },
    (table) => [primaryKey({ name: 'owners_pkey', columns: [table.patternId, table.userId] })],
);

export const stitches = pgTable('stitches', {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedByDefaultAsIdentity(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    shorthand: text('shorthand').notNull().default(''),
    name: text('name').notNull().default(''),
    custom: boolean('custom').notNull().default(true),
    origin: text('origin').default('US'),
    authorId: uuid('author_id').references(() => userProfiles.id, {
        onUpdate: 'cascade',
        onDelete: 'cascade',
    }),
});

export const trackers = pgTable(
    'trackers',
    {
        id: uuid('id').defaultRandom().primaryKey(),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true })
            .notNull()
            .defaultNow()
            .$onUpdate(() => new Date()),
        currentRow: integer('current_row').notNull().default(0),
        currentStitch: text('current_stitch'),
        currentIndex: integer('current_index').notNull().default(0),
        title: text('title').default('My Tracker'),
        userId: uuid('user_id').notNull(),
        patternId: bigint('pattern_id', { mode: 'number' }).notNull(),
    },
    (table) => [
        foreignKey({
            name: 'trackers_user_id_pattern_id_fkey',
            columns: [table.userId, table.patternId],
            foreignColumns: [owners.userId, owners.patternId],
        })
            .onUpdate('cascade')
            .onDelete('cascade'),
    ],
);
