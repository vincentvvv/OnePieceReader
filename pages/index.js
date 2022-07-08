import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react";

const ROUTE_POKEMON_ID = "pokemons/[id]";

function Card(props) {
  const [likes, setLikes] = useState(0);

  return (
    <div class="card col-4 d-flex justify-content-center">
      <img
        src={props.src}
        class="card-img-top"
        style={{ width: "${likes}px" }}
        alt="..."
      />
      <div class="card-body">
        <Link href={{
              pathname: ROUTE_POKEMON_ID,
              query: { id: props.id }
            }}>
        <h5 class="card-title">{props.title}</h5>
        </Link>
        <p class="card-text">{props.text}</p>
        {likes == 0 ? null : <p class="card-text">Likes {likes}</p>}
        {likes == 10 ? null : (
          <button
            onClick={() => {
              setLikes(likes + 1);
            }}
            href="#"
            class="btn btn-primary"
          >
            {props.buttonText}
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const limit = 20;
  
    useEffect(() => {
      setIsLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          setIsLoading(false);
          setPokemonList([...pokemonList, ...json["results"]]);
        });
    }, [offset]);
  
    return (
      <div className="App">
        <div class="container">
          <div class="row">
            {pokemonList.map((pokemon) => {
              return (
                <Card
                key ={getIDFromPokemon(pokemon)}
                  id={getIDFromPokemon(pokemon)}
                  title={pokemon["name"]}
                  text="text"
                  buttonText="like"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIDFromPokemon(
                    pokemon
                  )}.png`}
                />
              );
            })}
          </div>
          {isLoading == true ? <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div> : null}
          <div>
            <button
              onClick={() => {
                setOffset(offset + limit);
              }}
            >
              More
            </button>
          </div>
        </div>
      </div>
    );
}

function getIDFromPokemon(pokemon) {
  return pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
}