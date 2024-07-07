import './Carousel.css'; // Import the CSS file


const WavyBackground = () => {
    return (
        <div className="wavy-background">
            <svg
                className="wavy-background__svg"
                viewBox="0 0 1440 320"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#6a11cb"
                    fillOpacity="1"
                    d="M0,64L30,85.3C60,107,120,149,180,154.7C240,160,300,128,360,117.3C420,107,480,117,540,138.7C600,160,660,192,720,202.7C780,213,840,203,900,170.7C960,139,1020,85,1080,85.3C1140,85,1200,139,1260,154.7C1320,171,1380,149,1410,138.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                ></path>
            </svg>
            <div className="wavy-background__content">
                {/* Your content here */}
                <h1>Welcome to My Site</h1>
                <p>This is an example of a wavy background color in React.</p>
            </div>
        </div>
    );
};

export default WavyBackground;

// import { useCallback } from "react";


// const Test = () => {
//     const enhanceHandleClick = () => useCallback(() => console.log('fuck'), []);
//     return <div>
//         <button onClick={enhanceHandleClick(x)}>click haha</button>
//     </div>
// }

// export default Test;




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







