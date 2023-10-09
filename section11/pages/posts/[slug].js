import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/post-util";

function PostDetailPage(props) {
  return <PostContent post = {props.post}/>;
}
export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
        post: postData
    },
    revalidate: 600
  };
}
//동적 페이지이므로
export function getStaticPaths() {
    const postFilenames = getPostsFiles();

    const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/,''));

    return {
        // paths: [{params: {slug:}}]
        paths: slugs.map(slug => ({params: {slug:slug}})),
        fallback: false
    }
}
export default PostDetailPage;
