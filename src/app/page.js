"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 flex flex-col items-center px-6 py-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full font-medium mb-2">
          <Sparkles className="h-4 w-4" />
          Scheduling Simplified
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Academia Tempore
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          A full-stack academic scheduling platform for IIIT Bhopal — enabling intelligent classroom allocation, faculty scheduling, and admin control.
        </p>
      </motion.section>

      {/* Role Cards */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl"
      >
        {/* Admin Card */}
        <Card
          title="Admin Portal"
          description="Access classroom assignments, manage faculties, approve rescheduling requests, and control the academic flow."
          href="/login/admin"
          variant="default"
        />

        {/* Teacher Card */}
        <Card
          title="Teacher Portal"
          description="View your subject schedule, submit rescheduling requests, and access your teaching dashboard."
          href="/login/teacher"
          variant="secondary"
        />
      </motion.section>

      {/* Footer */}
      <footer className="mt-24 text-sm text-muted-foreground text-center">
        Built with 💡 by Vishisht Dwivedi • Next.js, Apollo, Express, Tailwind CSS
      </footer>
    </main>
  );
}

function Card({
  title,
  description,
  href,
  variant,
}) {
  return (
    <div className="rounded-2xl border border-border bg-white/70 backdrop-blur-md shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6">{description}</p>
      </div>
      <Link href={href}>
        <Button variant={variant} className="w-full">
          Go to {title}
        </Button>
      </Link>
    </div>
  );
}
