import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, GraduationCap, MapPin, Star, Shield } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const steps = [
      { delay: 0, step: 0 },
      { delay: 600, step: 1 },
      { delay: 1200, step: 2 },
      { delay: 1800, step: 3 },
      { delay: 2400, step: 4 },
      { delay: 3000, step: 5 }
    ];

    const timers = steps.map(({ delay, step }) => 
      setTimeout(() => setCurrentStep(step), delay)
    );

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onFinish, 800);
    }, 3600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, [onFinish]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180,
      opacity: 0 
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 1.2
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0, 
      opacity: 0,
      rotate: -90 
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 3.2,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingIcons = [
    { icon: Home, delay: 0.8, x: -100, y: -60, color: "text-blue-300" },
    { icon: Users, delay: 1.2, x: 100, y: -80, color: "text-purple-300" },
    { icon: GraduationCap, delay: 1.6, x: -80, y: 60, color: "text-indigo-300" },
    { icon: MapPin, delay: 2.0, x: 90, y: 70, color: "text-cyan-300" },
    { icon: Star, delay: 2.4, x: 0, y: -120, color: "text-yellow-300" },
    { icon: Shield, delay: 2.8, x: 0, y: 120, color: "text-green-300" }
  ];

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center overflow-hidden z-50"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
          }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 50,
                  opacity: 0
                }}
                animate={{
                  y: -50,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear"
                }}
              />
            ))}

            {/* Geometric Shapes */}
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          {/* Main Content Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Container with Glow Effect */}
            <motion.div
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              className="relative mb-8"
            >
              {/* Glow Effect */}
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150"
              />
              
              {/* Logo */}
              <div className="relative p-8 bg-white/15 backdrop-blur-md rounded-full border border-white/30 shadow-2xl">
                <div className="text-7xl">🏠</div>
              </div>
            </motion.div>

            {/* Title and Subtitle */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-wide">
                Housing Student
              </h1>
              <motion.p 
                className="text-xl text-white/90 font-light tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Find Your Perfect Home Away From Home
              </motion.p>
            </motion.div>

            {/* Floating Feature Icons */}
            <div className="relative w-64 h-64">
              {floatingIcons.map(({ icon: Icon, delay, x, y, color }, index) => (
                <motion.div
                  key={index}
                  variants={iconVariants}
                  initial="hidden"
                  animate={currentStep >= index + 1 ? "visible" : "hidden"}
                  className={`absolute ${color} drop-shadow-lg`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                  >
                    <Icon size={28} />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Progress Section */}
            <motion.div
              className="mt-12 w-80 max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              {/* Progress Bar Container */}
              <div className="relative">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/30">
                  <motion.div
                    variants={progressVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full shadow-lg"
                  />
                </div>
                
                {/* Progress Glow */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full blur-sm"
                  animate={{
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Loading Text */}
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <p className="text-white/80 text-sm font-medium tracking-wide">
                  Preparing your experience...
                </p>
                <motion.div
                  className="mt-2 flex justify-center space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 0.5 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-white/60 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Corner Decorations */}
          <motion.div
            className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;