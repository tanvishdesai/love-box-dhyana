# Migration Architecture & Data Flow

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    GIFTING DHYANA SYSTEM                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                     CONVEX DATABASE (Backend)                    │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │  Occasions   │  │   Products   │  │  Testimonials        │  │
│  │  (6 items)   │  │  (10 items)  │  │  (5 items)           │  │
│  │              │  │              │  │                      │  │
│  │ • Birthday   │  │ • Spa Set    │  │ • Priya Sharma       │  │
│  │ • Wedding    │  │ • Watch      │  │ • Rajesh Kumar       │  │
│  │ • Corporate  │  │ • Pen Set    │  │ • Ananya Gupta       │  │
│  │ • ... +3 more│  │ • ... +7 more│  │ • ... +2 more        │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
│                                                                  │
│                      convex/schema.ts                           │
│              (Defines table structure)                          │
└──────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                    ┌─────────┴──────────┐
                    │                    │
          ┌─────────▼────────┐  ┌───────▼────────────┐
          │  Migration API   │  │  Application API   │
          │                  │  │  (Normal Queries)  │
          │ migrate.ts       │  │  products.ts       │
          │ • runMigration() │  │  occasions.ts      │
          │ • clearAllData() │  │  testimonials.ts   │
          │ • checkStatus()  │  └────────────────────┘
          └────────┬─────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
┌──────────────┐ ┌─────────────────────┐ ┌──────────────────┐
│  Web UI      │ │  Convex Dashboard   │ │   CLI Tool       │
│              │ │                     │ │                  │
│ Admin Page   │ │ Function Runner     │ │ npx convex run   │
│ /admin/      │ │ https://dashboard   │ │ migrate:         │
│ migration    │ │                     │ │ runMigration     │
└──────────────┘ └─────────────────────┘ └──────────────────┘
```

---

## Data Flow Diagram

### Migration Execution Flow

```
┌─────────────────────────────────┐
│   User Initiates Migration      │
│  (Click button or run command)  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  migrate:runMigration() starts              │
│  (Convex Mutation)                          │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  1. Fetch existing data from all tables     │
│     - products                              │
│     - occasions                             │
│     - testimonials                          │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  2. Delete all existing records             │
│     - Loop through products → delete        │
│     - Loop through occasions → delete       │
│     - Loop through testimonials → delete    │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  3. Insert sample occasions                 │
│     - Birthday                              │
│     - Anniversary                           │
│     - Wedding                               │
│     - (6 total)                             │
│                                             │
│     Store their IDs for product linking     │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  4. Insert sample products                  │
│     - For each product:                     │
│       • Add name, description, price        │
│       • Add images array                    │
│       • Link to occasion by ID              │
│       • Mark featured status                │
│     (10 total)                              │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  5. Insert sample testimonials              │
│     - Customer name                         │
│     - Role/profession                       │
│     - Quote text                            │
│     - Profile image                         │
│     - Rating (5 stars)                      │
│     (5 total)                               │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  6. Return success response with stats      │
│     - occasions: 6                          │
│     - products: 10                          │
│     - testimonials: 5                       │
└────────────┬────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  7. Display success message to user         │
│     - Show in UI or console                 │
│     - Refresh data display                  │
└─────────────────────────────────────────────┘
```

---

## Database Schema Relationships

```
                        Occasions Table
                         (id: _id)
                              │
                              │ one-to-many
                              │
                              ▼
                        Products Table
                    (occasionId references Occasions)

        Products {
          _id: string
          name: string
          description: string
          price: number
          images: string[]
          categoryId: string
          occasionId: Id<"occasions">  ◄── Links to Occasion
          isFeatured: boolean
        }


                      Testimonials Table
                    (Independent table)

        Testimonials {
          _id: string
          name: string
          role: string
          quote: string
          image: string
          rating: number
        }
```

---

## File Structure

```
gifting-dhyana/
├── convex/
│   ├── migrate.ts              ◄── Main migration logic
│   ├── schema.ts               ◄── Database schema
│   ├── products.ts             ◄── Product queries/mutations
│   ├── occasions.ts            ◄── Occasion queries/mutations
│   └── testimonials.ts         ◄── Testimonial queries/mutations
│
├── app/
│   ├── admin/
│   │   └── migration/
│   │       └── page.tsx        ◄── Migration UI dashboard
│   ├── page.tsx                ◄── Homepage (displays testimonials)
│   ├── shop/
│   │   └── page.tsx            ◄── Shop page (displays products)
│   └── product/
│       └── [id]/
│           └── page.tsx        ◄── Product details page
│
├── scripts/
│   └── runMigration.js         ◄── CLI runner script
│
├── MIGRATION_GUIDE.md          ◄── Detailed documentation
├── QUICK_START_MIGRATION.md    ◄── Quick setup guide
├── SAMPLE_DATA.json            ◄── Preview of data
└── MIGRATION_ARCHITECTURE.md   ◄── This file
```

---

## Data Persistence

### How Data is Stored

```
1. Sample Data (in migrate.ts)
   ↓
   Convex API Call
   ↓
2. Convex Backend Processing
   ↓
   Database Operations (Insert/Delete)
   ↓
3. Persisted in Convex Cloud
   ↓
   Your Convex Database (Permanent)
   ↓
4. Retrieved via Queries
   ↓
   Displayed on Website
   ↓
5. Cached in Browser (React)
   ↓
   User Sees Data
```

---

## Function Relationships

```
┌─────────────────────────────────┐
│     migrate:runMigration()      │
│     (Main Migration Mutation)   │
└────────────┬────────────────────┘
             │
      ┌──────┼──────┬─────────┐
      │      │      │         │
      ▼      ▼      ▼         ▼
  ┌─────┐ ┌──────┐ ┌───────┐ ┌──────────┐
  │Clear│ │Insert│ │Insert │ │Insert    │
  │Data │ │Occ.  │ │Prod.  │ │Test.     │
  └─────┘ └──────┘ └───────┘ └──────────┘
      ▲      ▲      ▲         ▲
      │      │      └────┬────┘
      │      └───────────┤
      │                  │
      └──────────────────┘


┌─────────────────────────────────┐
│   migrate:checkDataStatus()     │
│     (Read-only Query)           │
└────────────┬────────────────────┘
             │
      ┌──────┼──────┬────────────┐
      │      │      │            │
      ▼      ▼      ▼            ▼
  ┌──────┐ ┌──────┐ ┌──────────┐ ┌────────┐
  │Query │ │Query │ │Query     │ │Format& │
  │Prod. │ │Occ.  │ │Test.     │ │Return  │
  └──────┘ └──────┘ └──────────┘ └────────┘


┌──────────────────────────────┐
│   migrate:clearAllData()     │
│   (Data Clearing Mutation)   │
└────────────┬─────────────────┘
             │
      ┌──────┼──────┬────────────┐
      │      │      │            │
      ▼      ▼      ▼            ▼
  ┌──────┐ ┌──────┐ ┌──────────┐ ┌────────┐
  │Delete│ │Delete│ │Delete    │ │Return  │
  │Prod. │ │Occ.  │ │Test.     │ │Stats   │
  └──────┘ └──────┘ └──────────┘ └────────┘
```

---

## Migration Timeline

```
Before Migration
└─ Database is empty
└─ Shop page shows nothing
└─ No testimonials to display

                    ↓ (Migration starts)

During Migration (2-3 seconds)
└─ Step 1: Clear existing data (if any)
└─ Step 2: Insert 6 occasions
└─ Step 3: Insert 10 products with occasion links
└─ Step 4: Insert 5 testimonials

                    ↓ (Migration completes)

After Migration
└─ Database populated with 21 total records
└─ Shop page displays all 10 products
└─ Testimonials visible on homepage
└─ Occasion filtering working
└─ Featured products highlighted
└─ Ready for users to browse and purchase
```

---

## Error Handling Flow

```
User triggers migration
        ↓
    ┌───────────────────────┐
    │ Try to run migration  │
    └────────┬──────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
   Success        Error
      │             │
      │             └─→ Catch exception
      │                    │
      │                    ▼
      │            Return error message
      │                    │
      │                    ▼
      └─→ Return stats    Display to user
             │             │
             ▼             ▼
         Success       Error state
         message       with details
```

---

## Performance Characteristics

### Database Operations

| Operation | Count | Time |
|-----------|-------|------|
| Delete products | 10 (if exists) | ~100ms |
| Delete occasions | 6 (if exists) | ~50ms |
| Delete testimonials | 5 (if exists) | ~50ms |
| Insert occasions | 6 | ~100ms |
| Insert products | 10 | ~200ms |
| Insert testimonials | 5 | ~100ms |
| **Total** | **26 ops** | **~600ms** |

### Network

- Initial call: ~50-100ms (network latency)
- Database operations: ~600ms (as above)
- Response sent back: ~50-100ms
- **Total time: ~700-800ms**

### User Experience

- UI shows loading state
- After ~1 second, migration completes
- Success message displayed
- Data automatically refreshed

---

This architecture ensures:
✅ Clean data initialization
✅ Fast migration process
✅ Reliable error handling
✅ Easy future customization
✅ Scalable data management

