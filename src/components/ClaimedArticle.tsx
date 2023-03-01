import { ArticleType } from "types/types";
import { useNavigate } from "react-router-dom";
import { useAuthor } from "../hooks/useAuthor";
import React, { ReactElement, useEffect } from "react";
import { FlowLogo } from "images";

function ClaimedArticle({ article }: { article: ArticleType }): ReactElement {
  const navigate = useNavigate();
  const { author, isAuthorLoading } = useAuthor(article.authorAddress)
  return (
    <div
      key={article.id}
      onClick={() => navigate(`/${article.authorAddress}/${article.id}`)}
      className="flex justify-start items-center w-[840px] bg-white-100 p-8 rounded-xl cursor-pointer"
    > 
      <div className="rounded-full w-12 h-12 bg-green-400 mr-3" onClick={() => navigate(`/${article.authorAddress}`)}>
        {!isAuthorLoading && <img src={author?.img} className="h-full w-full"/>}
      </div>
      <div className="flex flex-col">
        <h2 className="text-lg">{article.title}</h2>
        <div className="flex flex-row w-full gap-3">
          <p onClick={() => navigate(`/${article.authorAddress}`)} className='bg-gray-100 text-xs py-1 px-2 rounded-full hover:bg-gray-200'>{`Author: ${article.authorAddress}`}</p>
          <p className="bg-gray-100 text-xs py-1 px-2 rounded-full hover:bg-gray-200"> {`Claim date: ${article.createdAt}`} </p>
        </div>
      </div>
      <div className="flex flex-grow"/>
      <div className="text-green-900 text-lg px-2 py-1 items-center rounded-full font-Satoshi24px flex flex-row">
        <img src={FlowLogo} className="h-5 w-5 mx-1"/>
        <p>{article.price} Flow</p>
      </div>
    </div>
  );
}

export default ClaimedArticle;