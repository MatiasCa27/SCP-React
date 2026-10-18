import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import products from '../data/Products.js';
import Image from '../components/atoms/Image.jsx';
import CardBody from '../components/molecules/CardBody.jsx';

function ProductDetail() {
 const { id } = useParams();
 const product = products.find((p) => p.id === parseInt(id));


 if (!product) {
   return (
     <Container className="my-5">
       <h1>Producto no encontrado</h1>
     </Container>
   );
 }


 return (
   <Container className="my-5">
     <Card>
       <Image src={product.image} alt={product.name} className="card-img-top" />
       <Card.Body>
  <CardBody title={product.name} description={product.description} price={product.price} variant="h2" />
</Card.Body>
     </Card>
   </Container>
 );
}


export default ProductDetail;
