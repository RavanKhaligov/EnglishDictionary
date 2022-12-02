const mainSection = document.querySelector(".main-section");
const input = document.querySelector("input");
const info = document.querySelector(".info");
const remove = document.querySelector(".icon");
const ul = document.querySelector("ul");
eventListeners()

function eventListeners() {
    input.addEventListener("keyup", sendWord);
    remove.addEventListener("click", clear);

}

function clear() {
    input.value = "";
    ul.style.display = "none";
    info.textContent = "Type any existing word and press enter to get meaning.";
    mainSection.classList.remove("active");

}

function sendWord() {
    let word = input.value.trim();
    if (word === "") {
        info.textContent = "Please fill the gap.";
        ul.style.display = "none";
        mainSection.classList.remove("active");

    } else {
        goApi(word)
            .then(meaning => {
                mainSection.classList.add("active");
                ul.style.display = "block";
                let definitions = meaning[0].meanings[0].definitions[0],
                    phonetics = `${meaning[0].meanings[0].partOfSpeech} ${meaning[0].phonetics[0].text}`;
                document.querySelector(".word p").textContent = meaning[0].word.charAt(0).toUpperCase() + meaning[0].word.slice(1);
                document.querySelector(".word span").textContent = phonetics;
                document.querySelector(".meaning span").textContent = definitions.definition;
                document.querySelector(".example span").textContent = definitions.example;
                if (definitions.synonyms[0] === undefined) {
                    document.querySelector(".synonym ").style.display = "none";
                } else {
                    document.querySelector(".synonym ").style.display = "block";
                    document.querySelector(".synonym span").textContent = definitions.synonyms[0];
                }
            })
            .catch(() => {
                mainSection.classList.remove("active");
                ul.style.display = "none";
                info.innerHTML = `Can't find the meaning of "${word}". Please, try to search for another word.`
            });
    }
}
async function goApi(word) {
    const resolve = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const result = await resolve.json();
    return result;

}