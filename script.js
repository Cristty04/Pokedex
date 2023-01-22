const myMain$$ = document.querySelector("main");

const getCharacter = async () => {
  const response = await fetch("https://starwars-server.vercel.app/characters");
  const res = await response.json();
  return res.data.characters;
};

const mapCharacters = (characters) => {
  return characters.map((character) => ({
    id: character._id,
    name: character.name,
    image: character.image,
    origin: character.origin,
    role: character.role,
  }));
};

const drawCharacters = (characters) => {
  // cada vez que se inicia la función  con este myMain que es lo que le hemos dicho en el bucle que contiene todo, le estamos borrando todo
  myMain$$.innerHTML = "";
  for (const character of characters) {
    let characterDiv = document.createElement("div");
    characterDiv.className = "main__div";

    let characterName = document.createElement("h1");
    characterName.textContent = character.name;

    let characterImage = document.createElement("img");
    characterImage.setAttribute("src", character.image);
    characterImage.setAttribute("alt", character.name);

    let characterRole = document.createElement("p");
    characterRole.textContent = character.role;

    let characterOrigin = document.createElement("p");
    characterOrigin.textContent = character.origin;

    characterDiv.appendChild(characterName);
    characterDiv.appendChild(characterImage);
    characterDiv.appendChild(characterRole);
    characterDiv.appendChild(characterOrigin);

    myMain$$.appendChild(characterDiv);
    //     let characterDiv = document.createElement("div");
    //     characterDiv.className = "main__div";
    //     characterDiv.innerHTML = `
    //        <figure>
    //         <h1>${character.name}</h1>
    //         <img src="${character.image}" alt="${character.name}">
    //         <p>${character.role}</p>
    //         <p>${character.origin}</p>
    //        </figure>
    //   `;
    //   myMain$$.appendChild(characterDiv)
  }
};

const drawInput = (characters) => {
  const input$$ = document.querySelector("input");
  input$$.addEventListener("input", ()=>
    searchCharacters(input$$.value, characters)
  );
};

searchCharacters = (filtro, array) => {
  let filteredCharacters = array.filter((character) =>
    character.name.toLowerCase().includes(filtro.toLowerCase())
  );
  drawCharacters(filteredCharacters);
};

const init = async () => {
  const characters = await getCharacter();
  const mappedCharacters = mapCharacters(characters);
  drawCharacters(mappedCharacters);
  drawInput(mappedCharacters);
};
init();
