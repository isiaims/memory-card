import { useState, useEffect } from 'react'
import styles from '../styles/styles'

export default function PokemonGallery() {
  const [pokemonList, setPokemonList] = useState([])
  const [randomGroup, setRandomGroup] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pickedIds, setPickedIds] = useState([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  function handlePick (id) {
    if (pickedIds.includes(id)) {
      setScore(0)
      setPickedIds([])
      pickRandomPokemon(pokemonList)
      return
    }
    const pickedList = [...pickedIds, id]
    setPickedIds(pickedList)
    const nextScore = score + 1;
    setScore(nextScore);
    if (nextScore > highScore) setHighScore(nextScore)
    pickRandomPokemon(pokemonList)
  }
  // 1. Fetch the first 150 Pokemon on mount
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch Pokémon data')
        return res.json()
      })
      .then((data) => {
        // Map data so we have the name, id, and direct sprite URL
        const formattedPokemon = data.results.map((pokemon, index) => {
          const id = index + 1
          return {
            id: crypto.randomUUID(),
            picked: false,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            // Direct URL to the official high-quality artwork
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          }
        })

        setPokemonList(formattedPokemon)
        pickRandomPokemon(formattedPokemon)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // 2. Function to select 8 unique random items from the list
  function pickRandomPokemon (fullList)  {
    if (fullList.length === 0) return

    let list = []

    // If it's the initial load, list is empty. Otherwise, copy the current squad.
    if (randomGroup.length === 8) {
      list = [...randomGroup]
      
      // Remove a few random Pokémon so the list isn't completely different.
      const itemsToRemove = 5
      for (let i = 0; i < itemsToRemove; i++) {
        const randomIndexToRemove = Math.floor(Math.random() * list.length)
        list.splice(randomIndexToRemove, 1) 
      }
    }
    while (list.length < 8) {
      const randomIndex = Math.floor(Math.random() * fullList.length)
      const randomPokemon = fullList[randomIndex]

      // 4. Ensure no duplicate Pokémon get added to the squad
      const isDuplicate = list.some(pokemon => pokemon.id === randomPokemon.id)
      
      if (!isDuplicate) {
        list.push(randomPokemon)
      }
    }
    const shuffled = [...list].sort(() => 0.5 - Math.random())

    setRandomGroup(shuffled)
  }

  if (loading) return <div style={styles.center}>Catching 'em all...</div>
  if (error) return <div style={styles.center}>Error: {error}</div>

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Pokémon Memory Card Game</h1>
        
        <div >
          <p>Score: {score}</p>
          <h3>Highest Score: {highScore}</h3>
        </div>
      </header>

      <div style={styles.grid}>
        {randomGroup.map((pokemon) => (
          <div key={pokemon.id} style={styles.card} onClick={() => handlePick(pokemon.id)}>
            <img 
              src={pokemon.image} 
              alt={pokemon.name} 
              style={styles.image} 
            />
            <h3 style={styles.pokemonName}>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
