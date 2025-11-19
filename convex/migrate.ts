import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

/**
 * Migration Script for Gifting Dhyana
 * This script populates the database with sample data for occasions, products, and testimonials
 * Run this once to seed your database with initial data
 */

// Sample occasions data
const sampleOccasions = [
    {
        name: "Birthday",
        description: "Celebrate special moments with thoughtfully curated gifts for birthdays",
        image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&h=500&fit=crop",
    },
    {
        name: "Anniversary",
        description: "Mark milestone moments with elegant and meaningful gifts",
        image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=500&fit=crop",
    },
    {
        name: "Wedding",
        description: "Make weddings memorable with premium and sophisticated gift selections",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=500&fit=crop",
    },
    {
        name: "Graduation",
        description: "Celebrate academic achievements with inspiring and practical gifts",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=500&fit=crop",
    },
    {
        name: "Corporate",
        description: "Impress clients and colleagues with professional and premium gifts",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop",
    },
    {
        name: "Baby Shower",
        description: "Welcome new arrivals with delightful and practical baby gifts",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=500&fit=crop",
    },
];

// Sample products data
const sampleProducts = [
    {
        name: "Luxury Spa Gift Set",
        description: "Premium aromatherapy and skincare collection with organic ingredients and eco-friendly packaging",
        price: 4500,
        images: [
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
        ],
        categoryId: "wellness",
        isFeatured: true,
    },
    {
        name: "Artisan Chocolate Collection",
        description: "Hand-crafted chocolates from premium cocoa with exotic flavors and beautiful presentation",
        price: 1999,
        images: [
            "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",
        ],
        categoryId: "food",
        isFeatured: true,
    },
    {
        name: "Personalized Photo Frame",
        description: "Custom engraved wooden photo frame with premium finish, perfect for cherished memories",
        price: 2499,
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
        ],
        categoryId: "decor",
        isFeatured: true,
    },
    {
        name: "Premium Coffee Hamper",
        description: "Curated selection of specialty coffee from around the world, including brewing equipment",
        price: 3499,
        images: [
            "https://images.unsplash.com/photo-1577936569-18f38df85d69?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1577936569-18f38df85d69?w=500&h=500&fit=crop",
        ],
        categoryId: "food",
        isFeatured: true,
    },
    {
        name: "Luxury Watch",
        description: "Elegant timepiece with Swiss precision movement and premium leather strap",
        price: 12999,
        images: [
            "https://images.unsplash.com/photo-1523170335684-f042655cbdba?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1523170335684-f042655cbdba?w=500&h=500&fit=crop",
        ],
        categoryId: "accessories",
        isFeatured: true,
    },
    {
        name: "Crystal Decanter Set",
        description: "Handcrafted crystal decanter with premium whiskey and elegant serving glasses",
        price: 8999,
        images: [
            "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop",
        ],
        categoryId: "home",
        isFeatured: false,
    },
    {
        name: "Silk Scarf Collection",
        description: "Handmade silk scarves with artistic patterns inspired by traditional craftsmanship",
        price: 3299,
        images: [
            "https://images.unsplash.com/photo-1611591489619-9f8c4f4b2b2c?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1611591489619-9f8c4f4b2b2c?w=500&h=500&fit=crop",
        ],
        categoryId: "fashion",
        isFeatured: false,
    },
    {
        name: "Luxury Pen Set",
        description: "Premium fountain pens with Italian leather case, perfect for professionals and enthusiasts",
        price: 5499,
        images: [
            "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1572365992253-3cb3e56dd362?w=500&h=500&fit=crop",
        ],
        categoryId: "stationery",
        isFeatured: false,
    },
    {
        name: "Organic Tea Collection",
        description: "Premium loose-leaf teas from exotic locations with health benefits and wonderful flavors",
        price: 2799,
        images: [
            "https://images.unsplash.com/photo-1597318300878-5d9e3f1e2e98?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1597318300878-5d9e3f1e2e98?w=500&h=500&fit=crop",
        ],
        categoryId: "food",
        isFeatured: false,
    },
    {
        name: "Aromatherapy Diffuser",
        description: "Smart ultrasonic diffuser with essential oils and ambient lighting for relaxation",
        price: 3999,
        images: [
            "https://images.unsplash.com/photo-1576740179021-ce4a42927a34?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1576740179021-ce4a42927a34?w=500&h=500&fit=crop",
        ],
        categoryId: "wellness",
        isFeatured: false,
    },
];

// Sample testimonials data
const sampleTestimonials = [
    {
        name: "Priya Sharma",
        role: "Event Manager",
        quote: "The gifting experience was seamless and the products are absolutely stunning. My clients were impressed!",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        rating: 5,
    },
    {
        name: "Rajesh Kumar",
        role: "Corporate Executive",
        quote: "Outstanding quality and presentation. Perfect for corporate gifts. Highly recommended!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        rating: 5,
    },
    {
        name: "Ananya Gupta",
        role: "Wedding Planner",
        quote: "The curated collections make it so easy to find the perfect gifts. Customer service is exceptional.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
        rating: 5,
    },
    {
        name: "Vikram Singh",
        role: "Business Owner",
        quote: "Fast delivery and premium quality. This is my go-to place for all gifting needs.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
        rating: 5,
    },
    {
        name: "Neha Patel",
        role: "Freelance Designer",
        quote: "Love the aesthetic and thoughtfulness behind every product. Truly a premium gifting experience.",
        image: "https://images.unsplash.com/photo-1517841905240-c21a9d141e90?w=200&h=200&fit=crop",
        rating: 5,
    },
];

// Mutation to clear all existing data (use with caution!)
export const clearAllData = mutation({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();
        const occasions = await ctx.db.query("occasions").collect();
        const testimonials = await ctx.db.query("testimonials").collect();

        for (const product of products) {
            await ctx.db.delete(product._id);
        }
        for (const occasion of occasions) {
            await ctx.db.delete(occasion._id);
        }
        for (const testimonial of testimonials) {
            await ctx.db.delete(testimonial._id);
        }

        return {
            message: "All data cleared successfully",
            cleared: {
                products: products.length,
                occasions: occasions.length,
                testimonials: testimonials.length,
            },
        };
    },
});

// Main migration function
export const runMigration = mutation({
    args: {},
    handler: async (ctx) => {
        try {
            // First, clear existing data
            const products = await ctx.db.query("products").collect();
            const occasions = await ctx.db.query("occasions").collect();
            const testimonials = await ctx.db.query("testimonials").collect();

            for (const product of products) {
                await ctx.db.delete(product._id);
            }
            for (const occasion of occasions) {
                await ctx.db.delete(occasion._id);
            }
            for (const testimonial of testimonials) {
                await ctx.db.delete(testimonial._id);
            }

            // Insert occasions first (since products reference them)
            const occasionIds: { [key: string]: Id<"occasions"> } = {};
            for (const occasion of sampleOccasions) {
                const id = await ctx.db.insert("occasions", occasion);
                occasionIds[occasion.name] = id;
            }

            // Insert products with occasional references
            const productIds: string[] = [];
            for (let i = 0; i < sampleProducts.length; i++) {
                const product = sampleProducts[i];
                // Distribute products across occasions
                const occasionKeys = Object.keys(occasionIds);
                const occasionId = occasionIds[occasionKeys[i % occasionKeys.length]];

                const productData = {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    categoryId: product.categoryId,
                    isFeatured: product.isFeatured,
                    occasionId: occasionId,
                };

                const id = await ctx.db.insert("products", productData);
                productIds.push(id);
            }

            // Insert testimonials
            const testimonialIds: string[] = [];
            for (const testimonial of sampleTestimonials) {
                const id = await ctx.db.insert("testimonials", testimonial);
                testimonialIds.push(id);
            }

            return {
                success: true,
                message: "Migration completed successfully!",
                stats: {
                    occasions: Object.keys(occasionIds).length,
                    products: productIds.length,
                    testimonials: testimonialIds.length,
                },
                details: {
                    occasionIds: Object.values(occasionIds),
                    productIds,
                    testimonialIds,
                },
            };
        } catch (error) {
            console.error("Migration failed:", error);
            throw new Error(`Migration failed: ${error}`);
        }
    },
});

// Query to check current data status
export const checkDataStatus = query({
    args: {},
    handler: async (ctx) => {
        const products = await ctx.db.query("products").collect();
        const occasions = await ctx.db.query("occasions").collect();
        const testimonials = await ctx.db.query("testimonials").collect();

        return {
            products: {
                count: products.length,
                data: products,
            },
            occasions: {
                count: occasions.length,
                data: occasions,
            },
            testimonials: {
                count: testimonials.length,
                data: testimonials,
            },
        };
    },
});

