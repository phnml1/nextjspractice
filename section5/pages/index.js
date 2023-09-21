import path from 'path';
import fs from "fs/promises";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={products.id}>{product.title}</li>
      ))}
    </ul>
  );
}

//서버에서 사전 렌더링
export async function getStaticProps(context) {
    console.log('Re generating')
    const filePath = path.join(process.cwd(),'data', 'dummy-backend.json');
    const jsondata = await fs.readFile(filePath);
    const data = JSON.parse(jsondata);
    if(!data){
        return{
            redirect:{
                destination: '/no-data'
            }
        }
    }


    if(data.products.length ===0){
        return {notFound: true};
    }
    return {
    props: {
      products: data.products
    },
    //프로덕션에서 최신화 주기
    revalidate: 10,
  };
}

export default HomePage;
