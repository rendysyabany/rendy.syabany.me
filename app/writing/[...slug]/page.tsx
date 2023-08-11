import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import { getPostMetadata } from "@/lib/getPostMetadata";

const getPostContent = (slug: string) => {
  const folder = "content/posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
};

// export const generateStaticParams = async () => {
// 	const posts = getPostMetadata()
// 	return posts.map((post: { slug: any }) => ({
// 		slug: post.slug,
// 	}))
// }

const PostPage = (props: any) => {
  const slug = props.params.slug;
  const post = getPostContent(slug);

  const h1Style = "text-4xl font-bold mb-4 text-blue-900	";
  const h2Style = "text-3xl font-semibold mb-3 text-yellow-700	";
  const pStyle = "text-gray-700 mb-3 text-green-700	";

  return (
    <div>
      <h1 className=" font-kasei text-2xl font-bold md:text-4xl">
        {post.data.title}
      </h1>
      <h1 className=" font-kasei text-1xl font-bold md:text-4xl">
        {post.data.test}
      </h1>
      <article
        className="prose prose-quoteless prose-neutral md:prose-lg dark:prose-invert prose-h2:font-kasei 
			 dark:prose-a:text-neutral-500 pb-8"
      >
        <Markdown
          options={{
            overrides: {
              h1: {
                component: "h1",
                props: {
                  className: h1Style,
                },
              },
              h2: {
                component: "h2",
                props: {
                  className: h2Style,
                },
              },
              p: {
                component: "p",
                props: {
                  className: pStyle,
                },
              },
              // Tambahkan overrides lain sesuai kebutuhan
            },
          }}
        >
          {post.content}
        </Markdown>
      </article>
    </div>
  );
};
export default PostPage;
