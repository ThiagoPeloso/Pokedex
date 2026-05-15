import styles from '@/styles/main.module.css'
import Head from 'next/head'
import Image from 'react-bootstrap/Image'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import { Row, Col, Container, Figure } from "react-bootstrap";

import React, { useState, useEffect } from "react"

export default function Home() {
  const [data, setData] = useState(null)
  const [name, setName] = useState("")
  const [pokemonList, setPokemonList] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/1`)
    .then((res) => res.json())
    .then((data) => {
      setData(data)
      console.log(data)
    })
  }, [])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
    .then((res) => res.json())
    .then((data) => {
      setPokemonList(data.results)
    })
  }, [])

  function searchPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
      if (!res.ok) {
        throw new Error("What? I don't know that one.")
      }
      return res.json()
      })
      .then((data) => {
        setData(data)
        setFilteredPokemon([])
        console.log(name)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  const inputPokemonName = (e) => {
  const fieldName = e.target.value
  setName(fieldName)
  const rawName = fieldName.toLowerCase()
  if (rawName === "") {
    setFilteredPokemon([])
    return
  }
  const matches = pokemonList.filter((pokemon) => pokemon.name.includes(rawName))
  setFilteredPokemon(matches.slice(0, 5))
}

  if (!data) return <p>Error!</p>

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Pokédex Search</Navbar.Brand>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            <div style={{ position: "relative"}}>
              <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                  type="search"
                  value={name}
                  placeholder="Search a Pokémon"
                  name="name"
                  autoComplete="off"
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
              <ListGroup
                style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                zIndex: 1000,
                maxHeight: "300px",
                overflowY: "auto",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                }}
              >
                {filteredPokemon.map((pokemon) => (
                  <ListGroup.Item
                    action
                    key={pokemon.name}
                    onClick={() => {
                      setName(pokemon.name)
                      setFilteredPokemon([])

                      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                        .then((res) => res.json())
                        .then((data) => {
                          setData(data)
                        })
                    }}
                  >
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            </Nav>
        </Container>
      </Navbar>

      <Container id="card">
        <div id="cardFilling">
          <Image id="image" src={data.sprites.other['official-artwork'].front_default} />
          <div id="text">
            <ListGroup horizontal id="nameAndDex">
              <ListGroup.Item id="name">
                {data.name.charAt(0).toUpperCase() + data.name.substr(1)}
              </ListGroup.Item>
              <ListGroup.Item id="dex">
                #{data.id}
              </ListGroup.Item>
            </ListGroup>
            <div id="typesAndAbilities">
            <ListGroup id="types">
              {data.types.map((types) =>
                <ListGroup.Item id="type" key={types.slot}>{types.type.name}</ListGroup.Item>
              )}
            </ListGroup>
            <ListGroup id="abilities">
              {data.abilities.map((abilities) =>
                <ListGroup.Item id="ability" key={abilities.slot}>
                  {abilities.ability.name}
                </ListGroup.Item>
              )}
            </ListGroup>
            </div>
            <div id="stats">
              {data.stats.map((stats) =>
                <ListGroup>
                  <ListGroup.Item id="stat">{stats.stat.name}: {stats.base_stat}</ListGroup.Item>
                </ListGroup>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>

  )
}