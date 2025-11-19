"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProductCard } from "./product-card";
import { ChevronLeft, Gift, Sparkles } from "lucide-react";

const questions = [
  {
    id: "who",
    question: "Who are you shopping for?",
    options: ["Him", "Her", "Kids", "Parents", "Friend"],
    icon: "👤",
  },
  {
    id: "occasion",
    question: "What's the occasion?",
    options: ["Birthday", "Anniversary", "Wedding", "Just Because", "Holiday"],
    icon: "🎉",
  },
  {
    id: "budget",
    question: "What's your budget?",
    options: ["Under $50", "$50-$100", "$100-$200", "$200+"],
    icon: "💰",
  },
];

export function GiftFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  const products = useQuery(api.products.get) || [];

  const handleSelect = (option: string) => {
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

  const recommendations = products.slice(0, 3);
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <section className="relative py-12 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Subtle background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-4xl mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Find Your Perfect Gift
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">Quick & personalized recommendations</p>
        </div>

        <Card className="border border-primary/10 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
          {/* Progress bar */}
          {!showResults && (
            <div className="h-1 bg-muted">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Step header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{questions[step].icon}</span>
                      <div>
                        <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                          Step {step + 1} of {questions.length}
                        </Badge>
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-1">
                          {questions[step].question}
                        </h3>
                      </div>
                    </div>
                    {step > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(step - 1)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Options grid - more compact */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {questions[step].options.map((option, idx) => (
                      <motion.div
                        key={option}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => handleSelect(option)}
                          className="w-full h-14 text-base font-medium border-primary/20 hover:border-primary hover:bg-primary/10 transition-all"
                        >
                          {option}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Progress dots */}
                  <div className="flex justify-center gap-2 pt-2">
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === step ? "w-8 bg-primary" : i < step ? "w-1.5 bg-primary/50" : "w-1.5 bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Results header */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 text-black dark:text-white mb-3">
                      <Gift className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-2">
                      Perfect Matches!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      For <span className="text-amber-400 dark:text-amber-500 font-medium">{answers.who}</span> · {" "}
                      <span className="text-yellow-500 dark:text-yellow-600 font-medium">{answers.occasion}</span>
                    </p>
                  </div>

                  {/* Products - compact grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.map((product, idx) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <ProductCard
                          id={product._id}
                          name={product.name}
                          price={product.price}
                          image={product.images[0]}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-center pt-4">
                    <Button 
                      onClick={resetQuiz} 
                      variant="outline"
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      Try Again
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black dark:text-white"
                    >
                      View All Gifts
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </section>
  );
}
