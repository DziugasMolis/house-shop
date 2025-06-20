'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StarIcon, HeartIcon } from '@heroicons/react/20/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { useLikedProjectsStore } from '@/store/likedProjectsStore'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LikedProjectsPage() {
  const { likedProjects, removeFromLiked, clearLiked } = useLikedProjectsStore()
  const { t } = useLanguage()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{t('liked.title')}</h1>
        </div>

        {likedProjects.length === 0 ? (
          <div className="text-center py-16">
            <HeartOutlineIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('liked.empty')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('liked.emptyDescription')}</p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                {t('liked.browseProjects')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-700">
                {likedProjects.length} {t('liked.projects')}
              </p>
              <button
                onClick={clearLiked}
                className="text-sm font-medium text-red-600 hover:text-red-500"
              >
                {t('liked.clearAll')}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {likedProjects.map((project) => (
                <div key={project.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                    <Link href={`/product/${project.id}`}>
                      <img
                        src={project.image}
                        alt={project.name}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                      />
                    </Link>
                    <button
                      onClick={() => removeFromLiked(project.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                    >
                      <HeartIcon className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link href={`/product/${project.id}`} className="hover:text-gray-900 transition-colors">
                          {project.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${project.price}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/product/${project.id}`}
                      className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {t('products.viewDetails')}
                    </Link>
                    <button
                      onClick={() => removeFromLiked(project.id)}
                      className="flex-1 text-center py-2 px-4 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
                    >
                      {t('liked.remove')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 