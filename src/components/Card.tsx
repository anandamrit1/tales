import { Avatar, Tag } from 'degen';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleType, Author } from 'types/types';

export type ArticleCardProps = {
    article: ArticleType;
}

const ArticleCard = ({article} : ArticleCardProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/${article.authorAddress}/${article.id}`)}
     className="border border-gray-200 rounded-xl max-w-xl overflow-hidden h-96 flex flex-col justify-between cursor-pointer hover:border-gray-300">
      <div className="">
      <img
        className="object-cover w-full h-48"
        src={article.coverImg}
        alt={article.title}
      />
      
        <p className='text-sm p-4'>
          {new Date(parseInt(article.createdAt) * 1000).toLocaleDateString()}
        </p>
        <h2 className="text-base font-medium text-gray-800 px-4">{article.title}</h2>
      </div>
      <div className="flex items-center p-4">
          <Avatar label={article.authorName} size="6" src={article.authorImg} />
          <p className='px-2 font-medium text-sm'>{article.authorName}</p>
          <p onClick={() => navigate(`/${article.authorAddress}`)} className='bg-gray-100 text-xs max-w-min py-1 px-2 rounded-full hover:bg-gray-200'>{article.authorAddress}</p>
        </div>
    </div>
  );
};

export default ArticleCard;
