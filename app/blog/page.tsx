'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const blogPosts = [
  {
    id: '1',
    title: '10 Modern House Design Trends for 2024',
    excerpt: 'Discover the latest trends in modern house design that are shaping the future of residential architecture.',
    author: 'Sarah Johnson',
    date: 'January 15, 2024',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Design Trends',
  },
  {
    id: '2',
    title: 'Sustainable Building Materials for Eco-Friendly Homes',
    excerpt: 'Learn about the best sustainable materials and practices for building environmentally conscious homes.',
    author: 'Michael Chen',
    date: 'January 10, 2024',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
    category: 'Sustainability',
  },
  {
    id: '3',
    title: 'Maximizing Small Spaces: Design Tips for Compact Homes',
    excerpt: 'Expert tips and tricks for making the most of limited square footage in your home design.',
    author: 'Emily Rodriguez',
    date: 'January 5, 2024',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Interior Design',
  },
  {
    id: '4',
    title: 'The Complete Guide to Smart Home Integration',
    excerpt: 'Everything you need to know about integrating smart technology into your house design.',
    author: 'David Kim',
    date: 'December 28, 2023',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Technology',
  },
]

export default function BlogPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('blog.title')}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('blog.description')}
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-gray-500">
                    {post.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {post.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${post.id}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {post.author}
                    </p>
                    <p className="text-gray-600">{post.readTime}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
} 