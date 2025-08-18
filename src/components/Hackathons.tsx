import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { unifiedData } from "../data/unifiedData";
import { Trophy } from "lucide-react";
import OptimizedImage from "./OptimizedImage";
import hackathon1 from "../assets/illustrations/hackathon1.jpg";
import hackathon2 from "../assets/illustrations/hackathon2.jpg";
import learningChart from "../assets/illustrations/hackathon-learn-chart.jpg";

const Hackathons = () => {
	return (
		<section className="py-20 bg-gray-900">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<motion.div
						className="text-6xl mb-4 cursor-pointer"
						whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 10, 0] }}
					>
						🏆
					</motion.div>
					<h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 mb-4">
						Hackathon Adventures
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						Showcasing innovation and problem-solving through intense coding competitions
					</p>
				</motion.div>

				{/* Hackathon Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
					{unifiedData.funEvents.map((event, index) => (
						<Tilt
							key={event.title}
							glareEnable={true}
							glareMaxOpacity={0.2}
							scale={1.05}
							transitionSpeed={1000}
							tiltMaxAngleX={8}
							tiltMaxAngleY={8}
						>
							<motion.div
								className="rounded-xl shadow-xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-gray-200 border border-purple-500 group transition-all duration-300 cursor-pointer"
								whileHover={{ scale: 1.05, boxShadow: "0 0 40px 8px #a78bfa", rotate: 1 }}
							>
								<OptimizedImage
									src={event.image}
									alt={event.title}
									className="w-full h-56 object-cover group-hover:scale-105 group-hover:brightness-110 transition-transform duration-500"
								/>
								<div className="p-6">
									<h3 className="text-2xl font-bold mb-2 text-purple-300 group-hover:text-cyan-400 group-hover:underline transition-all duration-300">
										{event.title}
									</h3>
									<p className="mb-4 text-gray-300 group-hover:text-white transition-colors duration-300">
										{event.description}
									</p>
									<div className="flex items-center space-x-2">
										<Trophy className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300" />
										<span className="text-purple-400 group-hover:text-cyan-400 font-semibold transition-colors duration-300">
											{event.award}
										</span>
									</div>
									<div className="mt-6 flex flex-wrap gap-3 justify-center">
										{event.keyPoints && event.keyPoints.map((point: string, i: number) => (
											<span
												key={i}
												className="px-4 py-2 rounded-full bg-gray-800 text-blue-300 font-semibold shadow group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border-2 border-blue-400 group-hover:shadow-blue-400/50"
											>
												{point}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						</Tilt>
					))}
				</div>

				{/* Learning Journey */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-white/10"
				>
					<h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
						My Hackathon Journey
					</h3>
					<div className="grid md:grid-cols-2 gap-8 items-center">
						<div className="order-2 md:order-1">
							<img
								src={learningChart}
								alt="Learning Progress"
								className="rounded-xl shadow-lg w-full h-auto"
							/>
						</div>
						<div className="space-y-4 order-1 md:order-2">
							<p className="text-gray-400 leading-relaxed">
								Through hackathons, I've grown from a beginner to a confident
								developer, learning:
							</p>
							<ul className="space-y-3">
								{[
									"Rapid prototyping and MVP development",
									"Cross-functional team collaboration",
									"Problem-solving under time constraints",
									"Pitching and presentation skills",
								].map((item, i) => (
									<motion.li
										key={i}
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										transition={{ delay: i * 0.1 }}
										className="flex items-center gap-3 text-gray-300"
									>
										<div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex-shrink-0" />
										<span>{item}</span>
									</motion.li>
								))}
							</ul>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hackathons;
