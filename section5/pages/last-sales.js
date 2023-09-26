import { useState, useEffect } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
    //초기에는 사전에 페치된 props.sales 그이후에 SWR로 클라이언트 사이드에서 ㅔ칭
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR("https://nextjs-course-19f7b-default-rtdb.firebaseio.com/sales.json", (url) => fetch(url).then(res => res.json()))
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(transformedSales);
    }
  }, [data]);

  //데이터는 클라이언트 사이드 렌더링
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-19f7b-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);
  if (error) {
    return <p>Failed to load.</p>;
  }
  //sales가 이미 있으므로 &&
  if (!data && !sales) {
    return <p>Loading..</p>;
  }

  //   if (isLoading) {
  //     return <p>loading...</p>;
  //   }

  //   //사전렌더링이 되는데 getStaticProps와같은 함수가 없기에 useEffect를 거치지않은 초기상태에서 렌더링
  //   if (!data) {
  //     return <p> no data yet..</p>;
  //   }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>{`${sale.username} - ${sale.volume}`}</li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
   const response = await fetch("https://nextjs-course-19f7b-default-rtdb.firebaseio.com/sales.json")
   const data = await response.json();
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return { props: { sales: transformedSales } };
}
export default LastSalesPage;
