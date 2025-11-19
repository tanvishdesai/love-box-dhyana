# 🎁 START HERE - Database Migration

Welcome! This guide will help you populate your Gifting Dhyana database with sample data in **less than 2 minutes**.

---

## 🚀 Quick Start (Choose One)

### ⭐ Fastest - Web UI (Recommended)

```bash
# 1. Start development server
npm run dev

# 2. Open browser and go to:
# http://localhost:3000/admin/migration

# 3. Click "Run Migration" button
# 4. Confirm in dialog
# 5. Done! ✅
```

**Total time: ~2 minutes**

---

### 📊 Using Convex Dashboard

1. Go to https://dashboard.convex.dev
2. Select your project
3. Click "Functions" → Find `migrate`
4. Run `runMigration` mutation
5. Done! ✅

---

### 💻 Using Command Line

```bash
npx convex run migrate:runMigration
```

---

## ✅ After Running Migration

### Verify It Worked

Visit these URLs to confirm:

| URL | Should Show |
|-----|------------|
| `http://localhost:3000/shop` | 10 products |
| `http://localhost:3000/` | 5 testimonials |
| `http://localhost:3000/admin/products` | 10 products |
| `http://localhost:3000/admin/occasions` | 6 occasions |

---

## 📊 What Gets Added?

### 6 Occasions
Birthday • Anniversary • Wedding • Graduation • Corporate • Baby Shower

### 10 Premium Products
Starting from ₹1,999 to ₹12,999

### 5 Testimonials
5-star customer reviews with photos

---

## 🎯 What's Next?

1. **Verify** - Check that data appears on your site
2. **Customize** - Update product names, prices, images
3. **Add More** - Add your own products via admin panel
4. **Deploy** - Launch your site with real data

---

## 📚 Need More Help?

| Document | For... |
|----------|--------|
| `QUICK_START_MIGRATION.md` | Quick setup |
| `MIGRATION_GUIDE.md` | Complete documentation |
| `MIGRATION_CHECKLIST.md` | Step-by-step process |
| `SAMPLE_DATA.json` | See all data included |
| `MIGRATION_ARCHITECTURE.md` | System design details |

---

## ❓ Troubleshooting

**Q: Page shows 404?**
A: Make sure `npm run dev` is running

**Q: No data appears after migration?**
A: Hard refresh browser (Ctrl+Shift+R)

**Q: Can't access admin panel?**
A: Check `.env.local` has `CONVEX_URL` set

**Q: Images not loading?**
A: They're from Unsplash - check internet connection

---

## 🎓 Key Files Created

- `convex/migrate.ts` - Migration script
- `app/admin/migration/page.tsx` - Beautiful UI dashboard
- `MIGRATION_GUIDE.md` - Full documentation

---

## 🔄 Can I Run It Again?

Yes! Running the migration multiple times will:
1. Clear existing data
2. Add fresh sample data

This is useful if you want to start over.

---

## ⚠️ Important

- **Backup first** if you have important existing data
- **Environment variable** - `CONVEX_URL` must be set in `.env.local`
- **First time only** - You only need to run this once to get started

---

## 🎉 Ready?

Choose a method above and run the migration now!

**Recommended: Start with Web UI →** `npm run dev` then visit `/admin/migration`

---

**Questions?** Check `MIGRATION_GUIDE.md` for detailed help.

Happy building! 🚀

