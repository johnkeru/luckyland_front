import { useCallback } from "react";


const Test = () => {
    const enhanceHandleClick = () => useCallback(() => console.log('fuck'), []);
    return <div>
        <button onClick={enhanceHandleClick(x)}>click haha</button>
    </div>
}

export default Test;




// import { useMemo, useState } from "react";

// const url = 'https://fakestoreapi.com/products';

// const withDataFetching = (Component) => {
//     const EnhancedComponent = () => {
//         const [products, setProducts] = useState([]);
//         const [loading, setLoading] = useState(false);

//         useMemo(() => {
//             const fetchProducts = async () => {
//                 setLoading(true);
//                 try {
//                     const response = await fetch(url);
//                     const data = await response.json();
//                     setProducts(data);
//                 } catch (error) {
//                     console.error("Error fetching products:", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchProducts();
//         }, [url]);

//         return <Component loading={loading} products={products} />;
//     };

//     return EnhancedComponent;
// };

// const ProductsComponent = (props) => {
//     console.log(props.products);
//     return <div>List of products hehe</div>;
// };

// export default withDataFetching(ProductsComponent);







