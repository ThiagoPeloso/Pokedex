import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";




export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('https://api.scryfall.com/cards/search?q=magic')
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setLoading(false)
        console.log(data)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  //if (!data) return <p>No profile data</p>
 
  return (
    <Container>
      <Row>
      {data.map((card, index) => (
        ((index + 1) % 3) === 1
          ? (<Col xs lg="2" key={card.id}>{card.name}</Col>)
          : null
      ))}
      </Row>






      {/*

0 = start
+ 1 becomes 1
1 % 3 
1 is the result
goes to first column of row
(index + 1) % 3) === 1

1 = start 
+1 becomes 2
2 % 3
2 is the result
((index + 1) % 3) === 2)

2 = start 
+1 becomes 3
3 % 3
0 is the result



3 = start 
+1 becomes 4
4 % 3
1 is the result


((index + 1) % 3) === 2)
((index + 1) % 3) === 0)



      <Row> {data.map((card) =>
        <Col xs lg="2" key={card.id}>{card.name}</Col>
      )}
      </Row> */}







    </Container>
  )
}