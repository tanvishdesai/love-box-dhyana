"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductCard } from "./product-card";
import { ArrowLeft, Gift } from "lucide-react";

const questions = [
  {
    id: "who",
    question: "Who are you shopping for?",
    options: ["Him", "Her", "Kids", "Parents", "Friend"],
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    options: ["Birthday", "Anniversary", "Wedding", "Just Because", "Holiday"],
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: ["Under $50", "$50 - $100", "$100 - $200", "$200+"],
  },
];

export function GiftFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  const products = useQuery(api.products.get) || [];

  const handleOptionSelect = (option: string) => {
    setAnswers({ ...answers, [questions[step].id]: option });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };

  // Simple recommendation logic (can be improved)
  const recommendations = products.filter(() => {
    // In a real app, you'd match tags or categories.
    // For now, we just return random products to simulate recommendations
    // or filter by price if we parsed the budget string.
    return true; 
  }).slice(0, 3);

  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white font-playfair mb-4">
            Find the Perfect Gift
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Answer a few questions and well help you choose.
          </p>
        </div>

        <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-medium text-zinc-500">
                      Step {step + 1} of {questions.length}
                    </span>
                    {step > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(step - 1)}
                        className="text-zinc-500"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold text-center mb-8">
                    {questions[step].question}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {questions[step].options.map((option) => (
                      <Button
                        key={option}
                        variant="outline"
                        className="h-16 text-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mb-4">
                      <Gift className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      We found these for you!
                    </h3>
                    <p className="text-zinc-500 mb-8">
                      Based on your preferences for {answers.who} for {answers.occasion}.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recommendations.map((product) => (
                      <ProductCard
                        key={product._id}
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        image={product.images[0]}
                      />
                    ))}
                  </div>

                  <div className="text-center pt-8">
                    <Button onClick={resetQuiz} variant="outline">
                      Start Over
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
