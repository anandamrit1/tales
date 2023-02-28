import { ArticleType } from "types/types";
import { useNavigate, useParams } from "react-router-dom";
import React, { ReactElement } from "react";
import { demoAuthor } from "utils/constants";

function ClaimedArticle({ article }: { article: ArticleType }): ReactElement {
  const navigate = useNavigate();
  return (
    <div
      key={article.id}
      onClick={() => navigate(`/${demoAuthor.address}/${article.id}`)}
      className="flex justify-between w-[840px] bg-white-100 p-8 rounded-xl cursor-pointer"
    >
      <div className="flex flex-col">
        <h2 className="text-lg">{article.title}</h2>
        <p className="text-sm text-gray-400">
          {new Date(article.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div>
        <img src={demoAuthor.img} className="h-14 w-14 rounded-full"/>
      </div>
    </div>
  );
}

export default ClaimedArticle;
