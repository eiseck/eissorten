import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoSrc from "@assets/logo.png";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRMqoptPB2rn9HVogVyWahMbjn2pvzNGQ4Te3EldvM8-DqYSCEQfznsYULJDPcV15JNF8wXOixgHOfl/pub?output=csv";

const ACCENT_COLOR = "#c8a96e";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

export default function Home() {
  const [flavors, setFlavors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.text();
      })
      .then((text) => {
        const lines = text
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l.length > 0);
        setFlavors(lines);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center py-12 px-6 overflow-x-hidden">
      <main className="max-w-4xl w-full flex-1 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <img
            src={logoSrc}
            alt="Eis Eck Ahrensbök"
            className="w-64 md:w-80 mx-auto mb-6 drop-shadow-2xl"
          />
          <h2 className="text-xl md:text-2xl text-muted-foreground font-handwriting tracking-wider">
            Unsere heutigen Eissorten
          </h2>
        </motion.div>

        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-handwriting text-2xl text-muted-foreground"
          >
            Einen Moment...
          </motion.p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-handwriting text-2xl text-muted-foreground"
          >
            Eissorten konnten nicht geladen werden.
          </motion.p>
        )}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {flavors.map((name, index) => (
              <motion.div
                key={name}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow:
                    "0px 10px 24px -5px rgba(0,0,0,0.55), 0px 0px 18px 0px rgba(255,255,255,0.05)",
                }}
                className="relative bg-card rounded-2xl p-6 border border-card-border overflow-hidden group cursor-default"
                data-testid={`card-flavor-${index}`}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: ACCENT_COLOR }}
                />
                <div className="pl-3 flex items-center">
                  <h3 className="font-handwriting text-2xl font-bold text-foreground tracking-wide">
                    {name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="mt-20 text-center text-muted-foreground pb-8"
      >
        <p className="font-handwriting text-2xl opacity-80">
          Frisch gemacht · Mit Liebe serviert
        </p>
      </motion.footer>
    </div>
  );
}
