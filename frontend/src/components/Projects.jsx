import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { projects } from '../constants';

const ProjectCard = ({ project, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: index * 0.15, duration: 0.6, ease: 'easeOut' }}
    className="h-full"
  >
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      glareEnable={true}
      glareMaxOpacity={0.12}
      glareColor={project.border}
      glarePosition="all"
      className="h-full"
    >
      <div
        className="h-full flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border:     `1px solid ${project.border}`,
          boxShadow:  `inset 0 0 60px ${project.border}08`,
          transition: 'box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 30px ${project.border}40, 0 0 60px ${project.border}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `inset 0 0 60px ${project.border}08`;
        }}
      >
        {/* Gradient top bar */}
        <div
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${project.border}, transparent)` }}
        />

        <div className="flex flex-col flex-1 p-6 gap-4">
          {/* Name + subtitle */}
          <div>
            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{project.name}</h3>
            <p className="text-xs mt-0.5" style={{ color: project.border }}>
              {project.subtitle}
            </p>
          </div>

          {/* Role badge */}
          <span
            className="self-start text-[10px] px-2.5 py-1 rounded-full font-medium uppercase tracking-wider"
            style={{
              background: `${project.border}15`,
              border:     `1px solid ${project.border}40`,
              color:      project.border,
            }}
          >
            👤 {project.role}
          </span>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                style={{
                  background: `${project.border}12`,
                  border:     `1px solid ${project.border}30`,
                  color:      project.border,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ background: 'var(--bg-input)', border: '1px solid var(--border-card)', color: 'var(--text-secondary)' }}
            >
              🐙 GitHub ↗
            </a>
            {project.demo !== '#' && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: `${project.border}18`,
                  border:     `1px solid ${project.border}40`,
                  color:      project.border,
                }}
              >
                🚀 Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  </motion.div>
);

const Projects = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24"
      style={{ background: 'var(--bg-main)' }}
    >
      <div className="section-padding">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-subheading"
        >
          My work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="section-heading mb-16"
        >
          Things I've <span className="gradient-text">Built</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
