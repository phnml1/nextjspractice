import { Fragment } from "react";
import Head from 'next/head';

import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/post-util";
const DUMMY_POSTS = [
  {slug: 'getting-started-with-nextjs', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
  {slug: 'getting-started-with-nextjs2', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
  {slug: 'getting-started-with-nextjs3', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
  {slug: 'getting-started-with-nextjs4', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'}
];
function HomePage(props) {
  return(
  <Fragment>
    <Head>
      <title>Ju Young's Blog</title>
      <meta name="description" content = "I post about programming and web development" />
    </Head>
    <Hero />
    <FeaturedPosts posts = {props.posts}/>
</Fragment>);
}
//개발이후에는 딱한번만실행될것임
export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts
    }
  }
}
export default HomePage;

// 1) Hero => Present ourselves
// 2) Featured posts
