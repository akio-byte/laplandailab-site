import React, { useEffect, useState } from 'react';

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  hero: string;
}

interface Props {
  language: 'fi' | 'en';
}

const BlogList: React.FC<Props> = ({ language }) => {
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    async function load() {
      const modules = import.meta.glob('../../content/blog/*.mdx', { eager: true });
      const loadedPosts: PostMeta[] = [];
      Object.entries(modules).forEach(([path, mod]: any) => {
        const meta = (mod as any).frontmatter || {};
        const slug = path.split('/').pop()?.replace('.mdx', '') ?? '';
        // filter by language suffix (e.g., '-fi' or '-en')
        if (language === 'fi' && slug.endsWith('-fi')) {
          loadedPosts.push({ slug, ...(meta as any) });
        } else if (language === 'en' && slug.endsWith('-en')) {
          loadedPosts.push({ slug, ...(meta as any) });
        }
      });
      loadedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setPosts(loadedPosts);
    }
    load();
  }, [language]);

  return (
    <section id="blog" className="py-12 bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-bold mb-6">
          {language === 'fi' ? 'Blogi' : 'Blog'}
        </h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-slate-800 pb-4">
              <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
              <p className="text-sm text-gray-400">{post.date}</p>
              <p className="mt-2 text-gray-300">{post.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
