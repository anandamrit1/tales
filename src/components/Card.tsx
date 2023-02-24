import React from 'react';
import { Article } from '../pages/Post';

export type ArticleCardProps = {
    article: Article;
}

const ArticleCard = ({article} : ArticleCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <img
        className="object-cover w-full h-64"
        src={article.coverImg}
        alt={article.title}
      />
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-4">{article.content.slice(0, 100)}...</p>
        <div className="flex justify-between items-center">
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full">
            {article.readTime} min read
          </button>
          <div className="flex items-center space-x-2">
            <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full">
              {article.likes} Likes
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full">
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
