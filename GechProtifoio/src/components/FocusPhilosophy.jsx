import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCogs, FaShip, FaTerminal, FaCode, FaServer } from 'react-icons/fa';

const FocusPhilosophy = () => {
    const focusItems = [
        {
            icon: <FaBrain className="text-purple-400" />,
            title: "AI-Powered Documentation",
            desc: "Building an agentic documentation system that understands and explains codebases autonomously.",
            tag: "Active"
        },
        {
            icon: <FaCogs className="text-blue-400" />,
            title: "Local LLM Ecosystems",
            desc: "Architecting local AI pipelines using Ollama and DeepSeek for high-privacy engineering workflows.",
            tag: "Experimenting"
        },
        {
            icon: <FaShip className="text-cyan-400" />,
            title: "Kubernetes Orchestration",
            desc: "Transitioning monolithic services into micro-segmented, auto-scaling k8s deployments.",
            tag: "Deep Dive"
        }
    ];

    return (
        <section className="relative py-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 text-white overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Currently Building */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl md:text-5xl font-extrabold font-space uppercase tracking-tighter mb-4 text-[#06b6d4]">
                            Focus <span className="text-white/20">&</span> Momentum
                        </h2>
                        <p className="text-gray-500 font-fira uppercase tracking-[0.3em] text-[10px]">What's on the workbench right now</p>
                    </div>

                    <div className="space-y-4">
                        {focusItems.map((item, i) => (
                            <div key={i} className="glass group p-6 rounded-[2rem] border border-white/5 hover:border-cyan-500/20 transition-all duration-500 flex gap-6 items-center">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-2xl shrink-0 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold font-space text-sm uppercase group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                            {item.tag}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 font-ibm-plex leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Philosophy */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass h-full p-10 md:p-14 rounded-[3rem] border border-white/5 flex flex-col justify-center relative overflow-hidden group"
                >
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] group-hover:bg-cyan-500/10 transition-colors duration-700"></div>

                    <div className="relative z-10">
                        <FaTerminal className="text-3xl text-cyan-500/30 mb-8" />
                        <h3 className="text-2xl md:text-4xl font-black font-space uppercase mb-8 leading-tight">
                            Engineered <br />
                            <span className="text-[#06b6d4]">Philosophy</span>
                        </h3>

                        <div className="space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
                                <p className="text-lg font-ibm-plex text-gray-300 italic leading-relaxed">
                                    "I believe in building <span className="text-white font-bold not-italic">scalable systems</span>, clean APIs, and <span className="text-white font-bold not-italic">backend-first architecture</span> before the UI polish is even considered."
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-6">
                                <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                    <FaCode className="text-cyan-400 mb-2" />
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Code Quality</h5>
                                    <p className="text-[10px] text-gray-600 mt-1">DRY, SOLID, and Self-documenting</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-white/2 border border-white/5">
                                    <FaServer className="text-blue-400 mb-2" />
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Resilience</h5>
                                    <p className="text-[10px] text-gray-600 mt-1">Fault-tolerant by design</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default FocusPhilosophy;
