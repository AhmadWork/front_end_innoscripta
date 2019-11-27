import React, { useState,useEffect,useContext } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg,
  CardBody
} from 'reactstrap';
import { useStateValue } from '../Context';
import axios from '../Http';



const imgs = [
  {
    src: 'https://i.ibb.co/pWC2HDr/template.png',
    altText: '',
    caption: ''
  },

];


const Home = (props) => {
  const [{cart}, dispatch] = useStateValue();
  const [cartItems,setCartItems]=useState();
  useEffect(() => {
    console.log('I will run only when valueA changes');
    localStorage.setItem('cart',cart)
  }, [cart]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
const [items,setItems]= useState( {
    order: null,
    error: false,
    data: [],
  });

  // API endpoint.
  const api = '/api/product';

useEffect(()=>{
  const token = localStorage.getItem('access_token');
  const user = localStorage.getItem('user');

  console.log(token);
  console.log(user);
  axios.get(`${api}`).then((response) => {
    const { data } = response.data;
    setItems({
      data, error: false,
    });
  })
  .catch(() => {
    setItems({
      error: 'Unable to fetch data.'
    });
  });
  console.log(items)
  return;
},[])
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === imgs.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? imgs.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = imgs.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });



  return (

   <Container>
   <Row >
<Col xl={{ size:8, offset:2}}>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={imgs} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
</Col>
      </Row>

    
      <br/>
      <Row >
      <Col xl={{ size:8, offset:2}}>
      <h1 className="head">Our Most Dilicious Pizza</h1>
      </Col>

      </Row>
           <Row>
          
{items.data? items.data.map(product=>(
 <Col lg='4' sm='6' xs='12'>
  <Card id={product.id}>
  <CardImg top width="10px" height="10px" src={product.src} alt="Card image cap" />
  <CardBody>
    <CardTitle>{product.title}</CardTitle>
    <CardText>{product.desc}</CardText>
    <CardSubtitle>Price:{product.price}€</CardSubtitle>
    <button className="btn btn-success"
    onClick={() => dispatch({type:'ADD_ITEM',payload:{title:product.title,quantity:1,id:product.id,price:product.price}})}>Add To Cart</button>
  </CardBody>
</Card>
 </Col>

)):(
 <h1>Error</h1>
)}
{cartItems&&cartItems.map(item=>{
 // item.id
})}
      </Row>
  
      </Container>
 
  );
}

export default Home;