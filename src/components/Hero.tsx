import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import bg from "../assets/hero/bg.jpg";
import logo from "../assets/hero/logo.svg";

const NAV_LINKS = ["Présentation", "Nos offres", "Incubation", "Réalisations", "Formations"];

const HEADLINE = "Façonnons l'Afrique de demain.".split(" ");

function NavLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="group relative px-[10px] py-[10px] font-semibold text-[14px] tracking-[0.4px] text-white"
    >
      {label}
      <span className="pointer-events-none absolute inset-x-[10px] bottom-1.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </a>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const stagger = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.5 },
    },
  };
  const navItem = {
    hidden: { opacity: 0, y: -12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      <motion.img
        src={bg}
        alt=""
        style={{ y: bgY, scale: bgScale }}
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ opacity: { duration: 1.2, ease: "easeOut" } }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40 sm:from-black/60" />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full flex-col"
      >
        <motion.header
          initial="hidden"
          animate="show"
          variants={stagger}
          className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-6 py-6 sm:px-10 lg:px-[104px] lg:py-[33px]"
        >
          <motion.img
            variants={navItem}
            src={logo}
            alt="ICES"
            className="h-8 w-auto shrink-0"
          />

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <motion.div key={link} variants={navItem}>
                <NavLink label={link} />
              </motion.div>
            ))}
          </nav>

          <div className="hidden items-center gap-[10px] lg:flex">
            <motion.div
              variants={navItem}
              className="flex items-center gap-[10px] font-medium text-[14px] tracking-[0.4px]"
            >
              <span>FR</span>
              <span className="text-white/50">EN</span>
            </motion.div>
            <motion.a
              variants={navItem}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#devis"
              className="bg-brand px-[10px] py-[10px] font-semibold text-[14px] text-white"
            >
              Demandez un devis
            </motion.a>
            <motion.a
              variants={navItem}
              whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.97 }}
              href="#partenaire"
              className="border border-white px-[10px] py-[10px] font-semibold text-[14px] text-white"
            >
              Devenir partenaire
            </motion.a>
          </div>

          <motion.button
            variants={navItem}
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-20 flex h-6 w-6 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-6 bg-white"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-6 bg-white"
            />
          </motion.button>
        </motion.header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden bg-black/95 lg:hidden"
            >
              <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="flex flex-col gap-4 px-6 py-6"
              >
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link}
                    variants={navItem}
                    href="#"
                    className="font-semibold text-[14px]"
                  >
                    {link}
                  </motion.a>
                ))}
                <motion.div variants={navItem} className="flex items-center gap-[10px] pt-2">
                  <span>FR</span>
                  <span className="text-white/50">EN</span>
                </motion.div>
                <motion.a
                  variants={navItem}
                  href="#devis"
                  className="bg-brand px-[10px] py-[10px] text-center font-semibold text-[14px]"
                >
                  Demandez un devis
                </motion.a>
                <motion.a
                  variants={navItem}
                  href="#partenaire"
                  className="border border-white px-[10px] py-[10px] text-center font-semibold text-[14px]"
                >
                  Devenir partenaire
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1 flex-col justify-end px-6 pb-16 sm:px-10 sm:pb-20 lg:justify-center lg:px-[104px] lg:pb-0">
          <h1 className="max-w-3xl font-extrabold text-[36px] leading-[1.2] tracking-[-0.01em] sm:text-[44px] lg:text-[53px]">
            {HEADLINE.map((word, i) => (
              <motion.span
                key={word + i}
                className="mr-[0.3em] inline-block"
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                animate={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: "easeOut" }}
            className="mt-6 max-w-xl font-medium text-[16px] leading-relaxed sm:mt-7 sm:text-[18px] lg:mt-8 lg:text-[20px]"
          >
            ICES accompagne les États, institutions et organisations dans la conception et le déploiement de
            transformations stratégiques, opérationnelles et technologiques à fort impact.
          </motion.p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            className="mt-8 flex w-fit items-center gap-2.5 bg-brand px-5 py-3 font-bold text-[14px] text-white sm:mt-9"
          >
            Parlons de votre projet
            <motion.svg
              viewBox="0 0 14 14"
              fill="none"
              className="block size-4 shrink-0 self-center"
              variants={{ hover: { x: 3, y: -3 } }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <path
                d="M1 13L13 1M13 9V1H5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="hidden justify-center pb-8 lg:flex"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border border-white/60 p-1"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-white"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
