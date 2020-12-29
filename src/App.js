import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get("repositories").then((response) => {
            setRepositories(response.data);
        });
    });
    async function handleAddRepository() {
        const response = await api.post("repositories", {
            title: `Novo repositório: ${Date.now()}`,
            url: "http://google.com/",
            techs: "ReactJS",
        });

        const repository = response.data;

        setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {
        await api.delete("repositories/" + id);
    }

    return (
        <div>
            <ul data-testid="repository-list">
                <li>
                    {repositories.map((repository) => (
                        <>
                            <li key={repository.id}>
                                Title: {repository.title}
                                URL:
                                <a href={repository.url}>{repository.url}</a>
                                Techs: {repository.techs}
                            </li>

                            <button
                                onClick={() =>
                                    handleRemoveRepository(repository.id)
                                }
                            >
                                Remover
                            </button>
                        </>
                    ))}
                </li>
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
