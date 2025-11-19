# Migration Implementation Checklist

## Pre-Migration Setup ✓

- [x] Migration script created (`convex/migrate.ts`)
- [x] Admin UI created (`app/admin/migration/page.tsx`)
- [x] Documentation complete
- [x] Sample data prepared

## Step 1: Verify Setup (Before Running Migration)

### Environment Check
- [ ] `.env.local` file exists in project root
- [ ] `CONVEX_URL` is set in `.env.local`
- [ ] Convex project is created in dashboard
- [ ] Internet connection is active

### Development Environment
- [ ] Node.js is installed (`node --version`)
- [ ] npm is installed (`npm --version`)
- [ ] Project dependencies installed (`npm install` completed)
- [ ] No build errors in project

### Convex Configuration
- [ ] Visit `https://dashboard.convex.dev`
- [ ] Your project is listed
- [ ] API keys are configured
- [ ] Database is initialized

## Step 2: Choose Migration Method

### Option A: Web UI (Recommended) ⭐
- [ ] Run `npm run dev`
- [ ] Wait for "ready - started server on..."
- [ ] Visit `http://localhost:3000/admin/migration`
- [ ] Check page loads without errors
- [ ] See "Current Database Status" section

### Option B: Convex Dashboard
- [ ] Go to `https://dashboard.convex.dev`
- [ ] Select your project
- [ ] Click "Functions" in sidebar
- [ ] Find `migrate` in the function list
- [ ] Locate `runMigration` mutation

### Option C: Command Line
- [ ] Open terminal/PowerShell
- [ ] Navigate to project directory
- [ ] Ensure dev environment is set up

## Step 3: Pre-Migration Backup (If Needed)

- [ ] Check if database has important data
- [ ] If yes, export/backup that data
- [ ] Document any custom data to preserve

## Step 4: Run the Migration

### Using Web UI
1. [ ] Go to `http://localhost:3000/admin/migration`
2. [ ] Click "Run Migration" button
3. [ ] Confirm in dialog that appears
4. [ ] Wait for success message (should show ~1 second)
5. [ ] Check "Current Database Status" shows:
   - Occasions: 6
   - Products: 10
   - Testimonials: 5

### Using Dashboard
1. [ ] Find `migrate:runMigration`
2. [ ] Click "Run" button
3. [ ] Check output for success message
4. [ ] Run `migrate:checkDataStatus` to verify
5. [ ] See counts of all data added

### Using CLI
1. [ ] Run: `npx convex run migrate:runMigration`
2. [ ] Watch terminal for output
3. [ ] Should see success stats
4. [ ] Note the operation completed

## Step 5: Post-Migration Verification

### Check Dashboard
- [ ] Log into Convex dashboard
- [ ] View database tables
- [ ] Occasions table has 6 records
- [ ] Products table has 10 records
- [ ] Testimonials table has 5 records
- [ ] All records have correct fields

### Check Admin Panel
- [ ] Visit `http://localhost:3000/admin/products`
- [ ] See all 10 products listed
- [ ] Products have names, prices, descriptions
- [ ] Images are loading (or show alt text)
- [ ] Visit `http://localhost:3000/admin/occasions`
- [ ] See all 6 occasions listed
- [ ] Visit `http://localhost:3000/admin/testimonials`
- [ ] See all 5 testimonials listed

### Check Frontend
- [ ] Visit `http://localhost:3000/` (homepage)
- [ ] Testimonials section shows 5 reviews
- [ ] Customer names and roles visible
- [ ] Star ratings displayed correctly
- [ ] Visit `http://localhost:3000/shop`
- [ ] All 10 products visible
- [ ] Product names, prices, images showing
- [ ] Occasion filter dropdown shows 6 options
- [ ] Filtering by occasion works
- [ ] Featured products marked/highlighted
- [ ] Click on a product → details page loads
- [ ] Product details display correctly

### Test Filtering
- [ ] Try filtering by "Birthday" - should show products
- [ ] Try filtering by "Wedding" - should show products
- [ ] Try filtering by "Corporate" - should show products
- [ ] Clear filter - should show all products

### Check Browser Console
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] No error messages
- [ ] No warnings about missing data
- [ ] Network requests successful (check Network tab)

## Step 6: Data Customization (Next Steps)

### Update Product Images
- [ ] Get your own product images
- [ ] Note image URLs (CDN or file storage)
- [ ] Plan which products need new images

### Update Product Information
- [ ] Prepare new product names
- [ ] Write better descriptions
- [ ] Adjust prices if needed
- [ ] Decide which products are featured

### Add Custom Testimonials
- [ ] Collect real customer reviews
- [ ] Prepare customer names and roles
- [ ] Get customer photos (or use placeholders)
- [ ] Prepare 5-star ratings

### Additional Occasions (Optional)
- [ ] Think of other occasions to add
- [ ] Prepare descriptions
- [ ] Get occasion cover images

## Step 7: Make Customizations

### Via Admin Panel
- [ ] Edit existing products
- [ ] Delete products you don't need
- [ ] Add new products
- [ ] Update occasion information
- [ ] Replace testimonials

### Via Code (Optional)
- [ ] Edit `convex/migrate.ts` if needed
- [ ] Update sample data arrays
- [ ] Run migration again for fresh start

## Step 8: Final Testing

### Complete User Journey
- [ ] Visit homepage - looks good
- [ ] Browse all products on shop page
- [ ] Filter by different occasions
- [ ] Click product - see details
- [ ] Check testimonials section
- [ ] Try contact form (if applicable)

### Mobile Responsive
- [ ] Test on mobile (or use DevTools device mode)
- [ ] Products display correctly
- [ ] Images resize properly
- [ ] Buttons are clickable
- [ ] Text is readable

### Performance
- [ ] Page loads quickly
- [ ] Images load without lag
- [ ] Filtering is instant
- [ ] No console errors
- [ ] No broken links

## Step 9: Deployment Preparation

- [ ] All features working locally
- [ ] No TypeScript errors: `npm run build`
- [ ] No linting errors: `npm run lint`
- [ ] `.env.local` is in `.gitignore` (don't commit)
- [ ] Ready for deployment

## Step 10: Deployment

- [ ] Push code to GitHub/repository
- [ ] Deploy to hosting (Vercel/other)
- [ ] Verify environment variables set in production
- [ ] Test live site
- [ ] Data appears on production site

## Troubleshooting Reference

| Issue | Solution | Checklist |
|-------|----------|-----------|
| No data appears | Hard refresh (Ctrl+Shift+R) | [ ] Tried refresh |
| 404 on migration page | Dev server not running | [ ] npm run dev executed |
| Permission error | Check Convex API keys | [ ] Keys verified |
| Images not loading | Check internet/image URLs | [ ] URLs valid |
| Products not filtering | Check browser console | [ ] No errors |
| Database empty after migration | Run migration again | [ ] Migration re-run |

## Success Indicators ✅

You'll know the migration is successful when:

- [x] Migration completes without errors
- [x] Dashboard shows 21 total records
- [x] Admin panel displays all products
- [x] Shop page shows all 10 products
- [x] Homepage shows 5 testimonials
- [x] Occasion filtering works
- [x] Featured products are marked
- [x] All images load correctly
- [x] No console errors
- [x] Mobile view works properly

## Next: Customization Tasks

After successful migration, consider:

- [ ] Update product descriptions to match your brand
- [ ] Replace product images with real photos
- [ ] Update prices to match your catalog
- [ ] Add real customer testimonials
- [ ] Add more products as needed
- [ ] Customize occasion categories
- [ ] Update homepage hero section
- [ ] Customize brand colors/styling

## Documentation Reference

| Document | Purpose | Read when... |
|----------|---------|--------------|
| QUICK_START_MIGRATION.md | 2-min setup | Starting now |
| MIGRATION_GUIDE.md | Detailed info | Need more help |
| SAMPLE_DATA.json | See all data | Want to preview |
| MIGRATION_ARCHITECTURE.md | System design | Want to understand structure |
| This checklist | Track progress | Following this process |

---

## Notes

**Migration Date:** _______________

**Successful?** Yes [ ] No [ ]

**Issues Encountered:** 
_________________________________

**Customizations Made:**
_________________________________

**Next Action Items:**
_________________________________

---

**You're ready to go! Start with QUICK_START_MIGRATION.md →**

