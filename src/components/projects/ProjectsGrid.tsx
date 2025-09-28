import React from 'react';
import projects from '../../data/projects.json';
import ProjectCard, { Project } from './ProjectCard';

interface Props {
  language: 'fi' | 'en';
}

const ProjectsGrid: React.FC<Props> = ({ language }) => {
  const data = projects as unknown as Project[];
  return (
    <section id="projects" className="py-12 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold mb-6">
          {language === 'fi' ? 'Projektit' : 'Projects'}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((project) => (
            <ProjectCard key={project.slug} project={project} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
