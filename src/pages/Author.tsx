import ArticleCard from "components/Card";
import { useAuthor } from "hooks/useAuthor";
import useCurrentUser from "hooks/useCurrentUser";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleType, Author } from "types/types";

// @ts-ignore
import * as fcl from "@onflow/fcl";
// @ts-ignore
import GetAllPartialArticles from "../cadence/scripts/GetAllPartialArticles.cdc";
import ArticleCardSkeleton from "components/CardSkeleton";
import Skeleton from "react-loading-skeleton";

export type AuthorProps = {
  author: Author;
};

function AuthorPage() {
  const [articles, setArticles] = React.useState<ArticleType[]>();
  const [searchValue, setSearchValue] = React.useState<string>("");

  const params = useParams();
  const navigate = useNavigate();

  const authorAddress = params.id;

  const { author } = useAuthor(params.id);

  useEffect(() => {
    const getMyArticles = async (address: string) => {
      let res;
      try {
        res = await fcl.query({
          cadence: GetAllPartialArticles,
          args: (arg: any, t: any) => [arg(address, t.Address)],
        });
      } catch (e) {
        res = [];
        console.log(e);
      }
      return res;
    };

    const getArticlesByAuthor = async (address: string) => {
      const articles = await getMyArticles(address);

      const myArticles: ArticleType[] = await Promise.all(
        articles.map(async (a: any) => {
          let p = a.data as string;

          // const data: OutputData = await fetch(p.replace("ipfs.io", "nftstorage.link")).then(res => res.json())

          return Promise.resolve({
            authorAddress: a.author,
            authorName: author?.name,
            authorDesc: author?.description,
            authorImg: author?.img,
            title: a.title,
            content: "",
            coverImg: a.image,
            readTime: 0,
            createdAt: new Date(parseInt(a.createDate) * 1000).toDateString(),
            id: a.id,
            likes: 0,
            price: a?.price,
          });
        })
      );

      setArticles(myArticles);
    };
    if (author && authorAddress) {
      if (author.name) document.title = `${author.name} - Tales`;
      getArticlesByAuthor(authorAddress);
    }
  }, [author, authorAddress]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const authorAddress = searchValue;

      setSearchValue("");
      navigate(`/${authorAddress}`);
    }
  };

  return (
    <div className="flex flex-col scroll-auto">
      <div className="w-screen h-screen">
        <div className="h-[30vh] bg-green-800"></div>
        <input
          className="rounded-full w-72 py-3 px-4 absolute top-4 right-4 outline-none"
          placeholder="Search Authors"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          onKeyDown={handleSearch}
        />
        <AuthorProfileSection author={author} />
        <div className="my-10 mx-auto w-5/6 py-8 px-4  bg-gray-100 rounded-lg ">
          <div className="flex justify-between items-center px-8">
            <div className="flex flex-col justify-center ">
              <div>Subscibe to {author?.name}</div>
              <div>Receive updates directly in your inbox</div>
            </div>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
              <button
                disabled={!author}
                className="bg-green-600 text-white px-4 py-2 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-20 w-5/6 mx-auto ">
          <AuthorArticleSection articles={articles} />
        </div>
      </div>
    </div>
  );
}

function AuthorArticleSection({
  articles,
}: {
  articles: ArticleType[] | undefined;
}) {
  return (
    <>
      {articles ? (
        articles.map((post) => <ArticleCard key={post.id} article={post} />)
      ) : (
        <>
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
          <ArticleCardSkeleton />
        </>
      )}
    </>
  );
}

function AuthorProfileSection({ author }: { author: Author | undefined }) {
  return (
    <>
      {author ? (
        <div className="py-10 bg-gray-100">
          <img
            className="w-32 h-32 rounded-full mx-auto -mt-24 border-4 border-gray-100"
            src={author?.img}
            alt="Author"
          />
          <div className="text-center">
            <h1 className="text-2xl font-black text-gray-800">
              {author?.name}
            </h1>
            <p className="text-gray-600 text-sm">{author?.address}</p>
            <p className="text-gray-600 py-4 text-base">
              {author?.description}
            </p>
          </div>
        </div>
      ) : (
        <AuthorProfileSectionSkeleton />
      )}
    </>
  );
}

function AuthorProfileSectionSkeleton() {
  return (
    <div className="py-10 bg-gray-100">
      <div className="w-32 h-32 rounded-full mx-auto -mt-24 border-4 border-gray-100 bg-gray-100 overflow-clip">
        <Skeleton count={1} style={{ width: "128px", height: "140px", marginTop:"-10px" }} />
      </div>
      <div className="text-center">
        <Skeleton
          count={1}
          style={{
            width: "120px",
            height: "24px",
            borderRadius: "16px",
            marginBottom: "4px",
          }}
        />
        <Skeleton
          count={2}
          style={{ height: "20px", width: "200px", borderRadius: "16px" }}
        />
      </div>
    </div>
  );
}

export default AuthorPage;
