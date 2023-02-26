import { Avatar, Tag } from 'degen';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Article, Author } from 'types/types';

export type ArticleCardProps = {
    article: Article;
    author: Author;
}

const ArticleCard = ({article, author} : ArticleCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/${author.address}/${article.id}`)}
     className="border border-gray-200 rounded-xl max-w-xl overflow-hidden cursor-pointer hover:border-gray-300">
      <img
        className="object-cover w-full h-48"
        src={article.coverImg}
        alt={article.title}
      />
      <div className="p-6">
        <Tag size='small'>
          {new Date(article.createdAt).toLocaleDateString()}
        </Tag>
        <h2 className="text-base font-medium text-gray-800 my-2">{article.title}</h2>
        <div className="flex items-center">
          <Avatar label={article.authorName} size="6" src={article.authorImg} />
          <p className='px-2 font-medium text-sm'>{article.authorName}</p>
          <Tag size='small'>{article.authorAddress}</Tag>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
