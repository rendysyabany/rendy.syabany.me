import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostData {
  data: {
    title: string;
    // Add more properties as needed
  };
}

const getAllPostContents = (): PostData[] => {
  const folder = "content/posts/";
  const fileNames = fs.readdirSync(folder);
  const postContents: PostData[] = [];

  fileNames.forEach(fileName => {
    if (fileName.endsWith('.md')) {
      const filePath = path.join(folder, fileName);
      const content = fs.readFileSync(filePath, 'utf8');
      const matterResult = matter(content) as unknown as PostData;
      postContents.push(matterResult);
    }
  });

  return postContents;
};

const Writing = () => {
  const post = getAllPostContents();

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        <pre>{JSON.stringify(post.map(d => d.data), null, 1)}</pre>
        {/* {post.content} */}
        {/* {allPostContents.map((post, index) => (
          <li key={index}>{post.data.title}</li>
        ))} */}
      </ul>
    </div>
  );
};
export default Writing;
