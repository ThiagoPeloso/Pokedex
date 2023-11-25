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

  function searchPokemon() {
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
              <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                  type="search"
                  placeholder="Search a Pokémon"
                  name="name"
                  className="me-2"
                  aria-label="Search"
                  onChange={inputPokemonName}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      searchPokemon()
                    }
                  }}
                />
                <Button variant="outline-success" onClick={() => searchPokemon()}>Search</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container id="card">
        <div id="cardFilling">
          <Image id="image" src={data.sprites.other['official-artwork'].front_default} />
          <div id="text">
            <div id="nameAndDex">
              <div id="name">
                {data.name.charAt(0).toUpperCase() + data.name.substr(1)}
              </div>
              <div id="dex">
                #{data.id}
              </div>
            </div>
            <div id="typesAndAbilities">
            <div id="types">
              {data.types.map((types) =>
                <div key={types.slot}>{types.type.name}</div>
              )}
            </div>
            <div id="abilities">
              {data.abilities.map((abilities) =>
                <div key={abilities.slot}>
                  {abilities.ability.name}
                </div>
              )}
            </div>
            </div>
            <div id="stats">
              {data.stats.map((stats) =>
                <div>
                  {stats.stat.name}:{stats.base_stat}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>

  )
}
