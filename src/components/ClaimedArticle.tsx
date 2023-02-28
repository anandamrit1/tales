import { ArticleType } from "types/types";
import { useNavigate, useParams } from "react-router-dom";
import React, { ReactElement, useEffect } from "react";

function ClaimedArticle({ article }: { article: ArticleType }): ReactElement {
  const navigate = useNavigate();

  return (
    <div
      key={article.id}
      onClick={() => navigate(`/${article.authorAddress}/${article.id}`)}
      className="flex justify-between w-[840px] bg-white-100 p-8 rounded-xl cursor-pointer"
    >
      <div className="flex flex-col">
        <h2 className="text-lg">{article.title}</h2>
        <p className="text-sm text-gray-400">
          {new Date(Number(article.createdAt) * 1000).toLocaleDateString()}
        </p>
      </div>r
      <div className="bg-gray-50 text-green-900 px-2 py-1 rounded-full">
        <p>{article.price} Flow</p>
      </div>
    </div>
  );
}

export default ClaimedArticle;
