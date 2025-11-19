# Database Migration Guide - Gifting Dhyana

This guide explains how to use the migration script to populate your Convex database with sample data.

## 📋 What's Included

The migration script (`convex/migrate.ts`) includes:

### Occasions (6 categories)
- **Birthday** - Celebrate special moments
- **Anniversary** - Mark milestone moments
- **Wedding** - Premium wedding gifts
- **Graduation** - Academic achievement gifts
- **Corporate** - Professional business gifts
- **Baby Shower** - New arrival gifts

### Products (10 items)
1. **Luxury Spa Gift Set** - ₹4,500 (Featured)
2. **Artisan Chocolate Collection** - ₹1,999 (Featured)
3. **Personalized Photo Frame** - ₹2,499 (Featured)
4. **Premium Coffee Hamper** - ₹3,499 (Featured)
5. **Luxury Watch** - ₹12,999 (Featured)
6. **Crystal Decanter Set** - ₹8,999
7. **Silk Scarf Collection** - ₹3,299
8. **Luxury Pen Set** - ₹5,499
9. **Organic Tea Collection** - ₹2,799
10. **Aromatherapy Diffuser** - ₹3,999

### Testimonials (5 reviews)
- Authentic customer testimonials with 5-star ratings
- Professional role descriptions
- High-quality profile images

---

## 🚀 How to Run the Migration

### Method 1: Using Convex Dashboard (Recommended for First Time)

1. **Go to Convex Dashboard**
   - Visit [https://dashboard.convex.dev](https://dashboard.convex.dev)
   - Select your project

2. **Open Function Runner**
   - Click on "Functions" in the left sidebar
   - Find the `migrate:checkDataStatus` query
   - Run it to see the current state of your database

3. **Run the Migration**
   - Find the `migrate:runMigration` mutation
   - Click "Run" button
   - Wait for completion

4. **Verify Results**
   - Run `migrate:checkDataStatus` again to confirm data was added
   - You should see:
     - 6 occasions
     - 10 products
     - 5 testimonials

### Method 2: Using Convex CLI (If you have Node.js set up)

```bash
# Navigate to your project
cd /path/to/gifting-dhyana

# Install dependencies (if not already done)
npm install

# Run the migration via Convex CLI
npx convex run migrate:runMigration
```

### Method 3: From Your Application Code

You can also trigger the migration from your Next.js application by calling the mutation:

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function MigrationButton() {
  const runMigration = useMutation(api.migrate.runMigration);

  const handleMigration = async () => {
    try {
      const result = await runMigration();
      console.log("Migration completed:", result);
      alert("Database populated successfully!");
    } catch (error) {
      console.error("Migration failed:", error);
      alert("Migration failed. Check console for details.");
    }
  };

  return (
    <button onClick={handleMigration}>
      Populate Database
    </button>
  );
}
```

---

## 🛠️ Available Functions

### `runMigration()` - Mutation
**Purpose:** Main migration function that clears existing data and populates the database with sample data.

**Returns:**
```typescript
{
  success: boolean,
  message: string,
  stats: {
    occasions: number,
    products: number,
    testimonials: number
  },
  details: {
    occasionIds: string[],
    productIds: string[],
    testimonialIds: string[]
  }
}
```

### `checkDataStatus()` - Query
**Purpose:** Check the current state of your database without making changes.

**Returns:**
```typescript
{
  products: {
    count: number,
    data: Product[]
  },
  occasions: {
    count: number,
    data: Occasion[]
  },
  testimonials: {
    count: number,
    data: Testimonial[]
  }
}
```

### `clearAllData()` - Mutation
**Purpose:** Clear all data from the database (use with caution!).

**Returns:**
```typescript
{
  message: string,
  cleared: {
    products: number,
    occasions: number,
    testimonials: number
  }
}
```

---

## ⚠️ Important Notes

1. **Data Replacement**: The migration will automatically clear all existing data and replace it with sample data. Make sure to backup any important data first if needed.

2. **Environment Setup**: Make sure your `CONVEX_URL` is properly set in your `.env.local` file:
   ```
   CONVEX_URL=https://your-project.convex.cloud
   ```

3. **Running Only Once**: You only need to run the migration once. If you run it again, it will reset the data.

4. **Custom Modifications**: After the migration, you can:
   - Add more products through the admin panel
   - Edit existing products
   - Add new occasions
   - Update testimonials

---

## 🎨 Data Structure

### Product Object
```typescript
{
  name: string,
  description: string,
  price: number,
  images: string[],
  categoryId?: string,
  occasionId?: Id<"occasions">,
  isFeatured: boolean
}
```

### Occasion Object
```typescript
{
  name: string,
  description?: string,
  image?: string
}
```

### Testimonial Object
```typescript
{
  name: string,
  role: string,
  quote: string,
  image?: string,
  rating: number
}
```

---

## 🔄 Updating Sample Data

If you want to modify the sample data before running the migration:

1. Open `convex/migrate.ts`
2. Edit the following arrays:
   - `sampleOccasions`
   - `sampleProducts`
   - `sampleTestimonials`
3. Save the file
4. Run the migration with your new data

---

## 📸 Image URLs

All sample data uses high-quality images from Unsplash. You can:

1. **Keep existing URLs**: They'll work as-is
2. **Replace with your own**: Update the image URLs in the data arrays
3. **Upload to CDN**: Use your own image hosting service

---

## ✅ Verification Checklist

After running the migration, verify:

- [ ] You can see 6 occasions on the shop page
- [ ] You can see 10 products in the product listing
- [ ] Featured products are marked correctly
- [ ] You can see 5 testimonials on the testimonials section
- [ ] Product prices are displayed correctly
- [ ] All images load without errors
- [ ] Occasion filtering works properly

---

## 🆘 Troubleshooting

### Issue: "CONVEX_URL is not set"
**Solution**: Add `CONVEX_URL` to your `.env.local` file in the project root.

### Issue: "Migration failed: Permission denied"
**Solution**: Make sure your API keys are properly configured in Convex dashboard.

### Issue: "Data not appearing on website"
**Solution**: 
1. Restart your Next.js development server
2. Hard refresh your browser (Ctrl+Shift+R)
3. Check the Network tab in browser DevTools

### Issue: "Duplicate data after multiple runs"
**Solution**: The migration automatically clears old data. If you see duplicates, try running `clearAllData()` first.

---

## 📞 Next Steps

1. ✅ Run the migration
2. 🎨 Customize products and descriptions
3. 📸 Add your own product images
4. 🏪 Test the shopping and filtering functionality
5. 🚀 Deploy to production

Happy gifting! 🎁

