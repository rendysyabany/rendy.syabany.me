import fs from 'fs'
import matter from 'gray-matter'
import { PostMetadata } from './PostMetadata'


const getPostMetadata = (): PostMetadata[] => {
	const folder = "content/posts/"
	const files = fs.readdirSync(folder)
	const markdownPosts = files.filter((file) => file.endsWith(".md"))

	//Get gray-matter data from each file
	const posts = markdownPosts.map((fileName) => {
		const fileContents = fs.readFileSync(`content/posts/${fileName}`, "utf8")
		const matterResult = matter(fileContents)
		return {
			title: matterResult.data.title,
			shortDescription: matterResult.data.shortDescription,
			slug: fileName.replace(".md", ""),
		}
	})

	return posts
}

export default getPostMetadata