import React from 'react';

interface Props {
  children: React.ReactNode;
}

const BlogPost: React.FC<Props> = ({ children }) => {
  return (
    <article className="prose prose-invert mx-auto py-12">
      {children}
    </article>
  );
};

export default BlogPost;
