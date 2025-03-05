import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    // players is an array where player data will be stored, initially empty
    // setPlayers is a function that will update players
    const [players, setPlayers] = useState([]);

    // sortDescending is a boolean, initially set to true
    // setSortDescending is a function that will update sortDescending
    const [sortDescending, setSortDescending] = useState(true); // Default: Highest points first

    // Fetch player data from backend
    useEffect(() => {
        axios.get("http://localhost:5000/players")
            .then(response => {
                setPlayers(response.data); // Store data here
            })
            .catch(error => {
                console.error("Error fetching players:", error);
            });
    }, []);

    // Function to toggle sorting order
    const toggleSort = () => {
        setSortDescending(prev => !prev);
    };

    // Sort players based on total points (toggle between descending & ascending)
    const sortedPlayers = [...players].sort((a, b) => 
        sortDescending ? b.total_points - a.total_points : a.total_points - b.total_points
    );

    return (
        <div>
            <h1>Total Points By Player</h1>
            
            {/* Sort Button */}
            <button onClick={toggleSort}>
                Sort by Points {sortDescending ? "Descending" : "Ascending"}
            </button>

            {/* Player List */}
            <ul>
                {sortedPlayers.length > 0 ? (
                    sortedPlayers.map(player => (
                        <li key={player.id}>
                            {player.first_name} {player.second_name}: {player.total_points} points
                        </li>
                    ))
                ) : (
                    <p>No players found</p>
                )}
            </ul>
        </div>
    );
}

export default App;