interface IParams {
    productId?: string
}

const Product = ({params} : {params: IParams}) => {
    console.log('params', params);
    
    return ( 
        <div>
            <h2>Product Page</h2>
        </div>
     );
}
 
export default Product;