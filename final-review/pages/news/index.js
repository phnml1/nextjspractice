import Link from 'next/link'

function NewsPage() {
  return  (
    <>
  <h1>The News Page</h1>
  <ul>
    {
    /*MPA: <li><a href = "/news/nextjs-">NextJS Is A Great FrameWork</a></li> */}
    {/*SPA*/}
    <li><Link href = '/news/next-js-is-a-great-framework'>NextJS is a great framework</Link></li>
    <li>Something Else</li>
  </ul>
  </>
  )
}
export default NewsPage;