const { Fragment } = require("react");
import path from "path";
import fs from "fs/promises";

function ProductDetailPage(props) {
  const { loadedProduct } = props;
  //동적사전생성기능이 즉시끝나지않으므로
  if (!loadedProduct) {
    return <div>loading...</div>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsondata = await fs.readFile(filePath);
  const data = JSON.parse(jsondata);

  return data;
}
//next.js에서는 동적 페이지에서 [].js 같은 부분은 사전생성안함
export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();
  const product = data.products.find((product) => product.id === productId);
  //404 페이지
  if(!product) {
    return {notFound: true};
  }
  
  return {
    props: {
      loadedProduct: product,
    },
  };
}

//url 동적파라미터 받아오기
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map(product => product.id);
  const pathsWithParams = ids.map((id) => ({params:{pid:id}}));
  return {
    paths: pathsWithParams,
    //일부페이지만 사전렌더링 가능 true시
    fallback: true,
  };
}
export default ProductDetailPage;
