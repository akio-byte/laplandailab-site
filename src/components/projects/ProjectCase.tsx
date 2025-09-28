import React from 'react';
import { Project } from './ProjectCard';

interface Props {
  project: Project;
  language: 'fi' | 'en';
}

const ProjectCase: React.FC<Props> = ({ project, language }) => {
  const title = language === 'fi' ? project.titleFi : project.titleEn;
  const description =
    language === 'fi' ? project.descriptionFi || '' : project.descriptionEn || '';

  return (
    <article className="py-12 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <img
          src={project.hero}
          alt={title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <div className="prose prose-invert">
          {description}
        </div>
      </div>
    </article>
  );
};

export default ProjectCase;
