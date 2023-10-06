import { Fragment } from "react";

import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
const DUMMY_POSTS = [
  {slug: 'getting-started-with-nextjs', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
  {slug: 'getting-started-with-nextjs2', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
  {slug: 'getting-started-with-nextjs3', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'},
  {slug: 'getting-started-with-nextjs4', title: 'Getting Started with NextJS', image: 'getting-started-nextjs.png', excerpt: 'NextJS is a the react framework', date: '2022-02-10'}
];
function HomePage() {
  return(
  <Fragment>
    <Hero />
</Fragment>);
}

export default HomePage;

// 1) Hero => Present ourselves
// 2) Featured posts
