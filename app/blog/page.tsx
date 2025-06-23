'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getStaticImagePath } from '@/utils/imagePath'

const posts = [
  {
    id: 1,
    title: 'Modern House Design Trends 2024',
    href: '#',
    description: 'Discover the latest trends in modern house design that are shaping the future of residential architecture.',
    image: getStaticImagePath('/images/products/product-1.jpg'),
    date: 'Mar 16, 2024',
    datetime: '2024-03-16',
    category: { title: 'Design', href: '#' },
    author: {
      name: 'Michael Brown',
      role: 'Architect',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Sustainable Building Materials',
    href: '#',
    description: 'Explore eco-friendly building materials that are both sustainable and beautiful for your next project.',
    image: getStaticImagePath('/images/products/product-2.jpg'),
    date: 'Mar 10, 2024',
    datetime: '2024-03-10',
    category: { title: 'Sustainability', href: '#' },
    author: {
      name: 'Lindsay Walton',
      role: 'Designer',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Smart Home Integration',
    href: '#',
    description: 'Learn how to integrate smart home technology seamlessly into your house design.',
    image: getStaticImagePath('/images/products/product-3.jpg'),
    date: 'Mar 5, 2024',
    datetime: '2024-03-05',
    category: { title: 'Technology', href: '#' },
    author: {
      name: 'Tom Cook',
      role: 'Engineer',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 4,
    title: 'Interior Design Principles',
    href: '#',
    description: 'Master the fundamental principles of interior design to create harmonious living spaces.',
    image: getStaticImagePath('/images/products/product-4.jpg'),
    date: 'Feb 28, 2024',
    datetime: '2024-02-28',
    category: { title: 'Interior', href: '#' },
    author: {
      name: 'Leslie Alexander',
      role: 'Interior Designer',
      href: '#',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function BlogPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('blog.title')}</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {t('blog.description')}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={post.image}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <Link
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </Link>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <Link href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </Link>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
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