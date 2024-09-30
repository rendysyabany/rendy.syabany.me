// app/writing/[slug]/page.tsx
import PostPageServer from "./PostPageServer";

const PostPage = (props: any) => {
  return <PostPageServer {...props} />;
};

export default PostPage;
