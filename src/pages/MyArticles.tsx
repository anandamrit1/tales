// a page for displaying all articles written by the current user
// this page is only accessible to logged in users
// each article is displayed on cards with the article's title and date
// @ts-ignore
import * as fcl from "@onflow/fcl";
// @ts-ignore
import GetAllMyArticles from "../cadence/scripts/GetAllMyArticles.cdc";

import React, { useEffect } from "react";
import { ArticleType } from "types/types";
import { BodyLayout } from "components/BodyLayout";
import SideNav from "components/SideNav";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "hooks/useCurrentUser";
import { useAuthor } from "hooks/useAuthor";
import RegisterProfile from "components/RegisterProfile";
import { LoaderAnimation } from "components/Loader";

function MyArticles() {
  const [data, setData] = React.useState<ArticleType[]>([]); // data is an array of articles

  const navigate = useNavigate();
  const user = useCurrentUser();

  const { author, isAuthorLoading } = useAuthor(user.addr);

  useEffect(() => {
    const getMyArticles = async (address: string) => {
      let res;
      try {
        res = await fcl.query({
          cadence: GetAllMyArticles,
          args: (arg: any, t: any) => [
            arg(address, t.Address),
            arg(address, t.Address),
          ],
        });
      } catch (e) {
        res = [];
      }
      return res;
    };

    const getArticlesByAuthor = async (address: string) => {
      const articles = await getMyArticles(address);

      const myArticles = await Promise.all(
        articles.map(async (a: any) => {
          let p = a.data as string;

          // const data: OutputData = await fetch(p.replace("ipfs.io", "nftstorage.link")).then(res => res.json())

          return Promise.resolve({
            authorAddress: a.author,
            authorName: "",
            authorDesc: "",
            authorImg: "",
            title: a.title,
            content: "",
            coverImg: a.image,
            readTime: 0,
            createdAt: new Date(parseInt(a.createDate) * 1000).toDateString(),
            id: a.id,
            likes: 0,
          });
        })
      );

      setData(myArticles);
    };

    if (user && user?.addr) {
      getArticlesByAuthor(user?.addr);
    }
  }, [user]);

  useEffect(() => {
    if (!user.loggedIn) {
      navigate("/");
    }
  }, [user]);

  if (!author) {
    return (
      <BodyLayout>
        <SideNav selectedTab="Articles" />
        <div className="flex flex-col p-10 w-full items-center">
          <div className="flex flex-col w-full h-full">
            <LoaderAnimation />
          </div>
        </div>
      </BodyLayout>
    );
  }
  console.log("Akshay author:", author)
  if (!isAuthorLoading && author && !author.name) {
    // register the users name in a input box and a submit button with better styles
    return <RegisterProfile />;
  }

  return (
    <BodyLayout>
      <SideNav selectedTab="Articles" />
      {/* add a button for create article on top right corner */}
      <div className="flex flex-col w-full">
        <div className="flex justify-end px-10 bg-white-100 py-4">
          <button
            className="bg-green-900 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg cursor-pointer"
            onClick={() => navigate("/write")}
          >
            Create Article
          </button>
        </div>
        <div className="flex flex-col p-10">
          <div className="flex flex-col items-center">
            {data?.length == 0 ? (
              <p className="text-center">
                You have no articles yet. Click on the button above to create
                one.
              </p>
            ) : (
              data?.map((article: ArticleType) => (
                <>
                  <div
                    key={article.id}
                    onClick={() => navigate(`/${user?.addr}/${article.id}`)}
                    className="flex justify-between w-[840px] bg-white-100 p-8 my-2 rounded-2xl cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <h2 className="text-lg font-black">{article.title}</h2>
                      <p className="text-sm text-gray-400">
                        {article.createdAt}
                      </p>
                    </div>
                    <div>
                      <span className="material-icons self-center hover:bg-gray-100 p-2 cursor-pointer rounded-full">
                        edit
                      </span>
                      <span className="material-icons self-center hover:bg-gray-100 p-2 cursor-pointer rounded-full">
                        delete
                      </span>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      </div>
    </BodyLayout>
  );
}

export default MyArticles;