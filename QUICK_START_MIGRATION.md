# Quick Start: Database Migration

Get your database populated with sample data in 2 minutes! 🚀

## Option 1: Fastest Way (UI Dashboard)

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the migration page:**
   - Open `http://localhost:3000/admin/migration` in your browser

3. **Click "Run Migration"**
   - A confirmation dialog will appear
   - Click "OK" to confirm
   - The database will be populated with sample data

4. **Done!** Visit `http://localhost:3000/shop` to see your products

---

## Option 2: Using Convex Dashboard

1. **Go to [Convex Dashboard](https://dashboard.convex.dev)**

2. **Select your project**

3. **Go to the Functions section**

4. **Find and run:**
   - `migrate:runMigration` (mutation)

5. **Check results with:**
   - `migrate:checkDataStatus` (query)

---

## Option 3: Using Convex CLI

```bash
# Run the migration from terminal
npx convex run migrate:runMigration
```

---

## What Gets Added?

✅ **6 Occasions**
- Birthday, Anniversary, Wedding, Graduation, Corporate, Baby Shower

✅ **10 Premium Products**
- With realistic names, descriptions, prices (₹1,999 - ₹12,999)
- Featured items marked
- High-quality product images

✅ **5 Customer Testimonials**
- 5-star reviews
- Professional profiles
- Authentic customer feedback

---

## Verification

After migration, check:

1. **Shop page**: `http://localhost:3000/shop`
   - Should display 10 products
   - Filter by occasions should work
   - Featured products highlighted

2. **Homepage**: `http://localhost:3000`
   - Testimonials section populated
   - Hero section looks complete

3. **Admin panel**: `http://localhost:3000/admin`
   - Products list shows all 10 items
   - Occasions dropdown has 6 options
   - Testimonials section shows 5 reviews

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Page shows 404 | Make sure dev server is running and API is configured |
| No products appear | Hard refresh (Ctrl+Shift+R) |
| Images don't load | Check internet connection (images from Unsplash) |
| Permission error | Verify your Convex credentials in dashboard |

---

## Next: Customize Your Data

Once migration is complete, you can:

1. **Edit products** in Admin → Products
2. **Add new occasions** in Admin → Occasions
3. **Manage testimonials** in Admin → Testimonials
4. **Replace images** with your own product photos

---

**Need help?** Check `MIGRATION_GUIDE.md` for detailed information.

