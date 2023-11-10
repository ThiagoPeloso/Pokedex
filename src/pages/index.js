import Head from 'next/head'
import Image from 'react-bootstrap/Image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Row, Col, Container, Figure } from "react-bootstrap";
import React, { useState, useEffect } from "react"

export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [name, setName] = useState()
  
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/1`)
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      setLoading(false)
      console.log(data)
    })
  }, [])

  function searchPokemon(){
      fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        console.log(data)
      })
  }

  const inputPokemonName = (e) => {
    const fieldName = e.target.value
    setName(fieldName)
  }

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Pokédex Search</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search a Pokémon"
                  name="name"
                  className="me-2"
                  aria-label="Search"
                  onChange={inputPokemonName}
                />
                <Button variant="outline-success" onClick={() => searchPokemon()}>Search</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
      <Row>
      <Col><Image src={data.sprites.other['official-artwork'].front_default}/></Col>
      </Row>
      <Row>
        <Col xs lg="3">Name: {data.name.charAt(0).toUpperCase()+data.name.substr(1)}</Col>
      </Row>
      <Row>
        <Col xs lg="3">Dex Number: {data.id}</Col>
      </Row>
      <Row>
      <Col xs={1} lg={1}>Abilities: </Col>
      {data.abilities.map((abilities) =>
      <Col xs={2} lg={2} key={abilities.slot}>{abilities.ability.name}</Col>
      )}
      </Row>
      <Row>
      <Col xs={1} lg={1}>Types: </Col>
      {data.types.map((types) =>
      <Col xs={1} lg={1} key={types.slot}>{types.type.name}</Col>
      )}
      </Row>
      <Row>
        <Col xs={1} lg={1}>Stats: </Col>
      </Row>
      <Row>
        {data.stats.map((stats) =>
        <Col xs={2} lg={2}>{stats.stat.name}: {stats.base_stat}</Col>
      )}
      </Row>
      </Container>
      </>

  )
}
