import { motion } from "framer-motion";

const BulbToggle: React.FC<{ isOn: boolean; toggle: () => void }> = ({ isOn, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle Dark/Light Mode"
      className="p-3 rounded-full focus:outline-none shadow-lg
                 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500
                 hover:brightness-110 transition relative"
      whileTap={{ scale: 0.9 }}
      title={isOn ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Bulb base */}
      <div className="w-8 h-12 relative flex flex-col items-center justify-center">
        {/* Bulb glass */}
        <motion.div
          className={`w-8 h-10 rounded-3xl border-4 border-yellow-400 bg-yellow-200/70
                      flex items-center justify-center shadow-xl`}
          animate={{
            boxShadow: isOn
              ? "0 0 20px 8px rgba(253, 224, 71, 0.7), 0 0 40px 20px rgba(253, 224, 71, 0.4)"
              : "0 0 6px 2px rgba(219, 219, 219, 0.3)",
            backgroundColor: isOn ? "rgba(253, 224, 71, 0.8)" : "rgba(220,220,220,0.3)",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Light rays (shown only when ON) */}
          {isOn && (
            <motion.div
              className="absolute w-10 h-10 rounded-full bg-yellow-400/50 filter blur-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </motion.div>

        {/* Bulb filament/base */}
        <div className="w-4 h-2 bg-yellow-600 rounded-b-md mt-1" />
        <div className="w-6 h-1 bg-yellow-700 rounded-md mt-0.5" />
      </div>
    </motion.button>
  );
};

export default BulbToggle;
