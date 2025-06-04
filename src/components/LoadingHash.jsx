import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingHash() {
    const [key, setKey] = useState(0);

    const ANIMATION_DURATION = 2400; // 每次動畫時間（畫線 + 旋轉 + 淡出）
    const EXTRA_DELAY = 500;         // 額外延遲時間

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prev => prev + 1);
        }, ANIMATION_DURATION + EXTRA_DELAY);
        return () => clearInterval(interval);
    }, []);

    const strokeColor = "#fdba74"; // text-orange-300

    return (
        <motion.svg
            key={key}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
        >
            <motion.g
                initial={{ rotate: 0, opacity: 1 }}
                animate={{
                    rotate: 360,
                    opacity: 0,
                }}
                transition={{
                    delay: 1.3,
                    duration: 1,
                    ease: "easeInOut",
                }}
            >
                {/* 第一條直線 */}
                <motion.line
                    x1="40"
                    y1="20"
                    x2="30"
                    y2="85"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    stroke={strokeColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    variants={{
                        hidden: { pathLength: 0 },
                        visible: {
                            pathLength: 1,
                            transition: { duration: 0.3, delay: 0.1 },
                        },
                    }}
                />
                {/* 第二條直線 */}
                <motion.line
                    x1="70"
                    y1="20"
                    x2="60"
                    y2="85"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    stroke={strokeColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    variants={{
                        hidden: { pathLength: 0 },
                        visible: {
                            pathLength: 1,
                            transition: { duration: 0.3, delay: 0.4 },
                        },
                    }}
                />
                {/* 第一條橫線 */}
                <motion.line
                    x1="20"
                    y1="40"
                    x2="80"
                    y2="40"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    stroke={strokeColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    variants={{
                        hidden: { pathLength: 0 },
                        visible: {
                            pathLength: 1,
                            transition: { duration: 0.3, delay: 0.7 },
                        },
                    }}
                />
                {/* 第二條橫線 */}
                <motion.line
                    x1="20"
                    y1="65"
                    x2="80"
                    y2="65"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    stroke={strokeColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    variants={{
                        hidden: { pathLength: 0 },
                        visible: {
                            pathLength: 1,
                            transition: { duration: 0.3, delay: 1.0 },
                        },
                    }}
                />
            </motion.g>
        </motion.svg>
    );
}
