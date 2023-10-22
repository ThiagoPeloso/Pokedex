import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState, useEffect } from "react"

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const inputPokemonName = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  var pokemonName = data.name

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">University Search</Navbar.Brand>
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
                <Button variant="outline-success" onClick={() => fetchPokemon(pokemonName)}>Search</Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.name}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
