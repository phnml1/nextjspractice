import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/post-util";
const DUMMY_POSTS = [
    {slug: 'getting-started-with-nextjs', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
    {slug: 'getting-started-with-nextjs2', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
    {slug: 'getting-started-with-nextjs3', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
    {slug: 'getting-started-with-nextjs4', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'}
  ];
function AllPostsPage(props) {
    return(
    <AllPosts posts={props.posts}/>
    );
}
export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props:{
      posts: allPosts
    }
  }
}
export default AllPostsPage;