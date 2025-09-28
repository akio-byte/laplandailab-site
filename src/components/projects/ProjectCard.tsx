import React from 'react';

export interface Project {
  slug: string;
  titleFi: string;
  titleEn: string;
  summaryFi: string;
  summaryEn: string;
  descriptionFi?: string;
  descriptionEn?: string;
  tags: string[];
  date: string;
  hero: string;
}

interface Props {
  project: Project;
  language: 'fi' | 'en';
}

const ProjectCard: React.FC<Props> = ({ project, language }) => {
  const title = language === 'fi' ? project.titleFi : project.titleEn;
  const summary = language === 'fi' ? project.summaryFi : project.summaryEn;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-slate-900 border border-slate-800">
      <img
        src={project.hero}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-gray-400">{summary}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
