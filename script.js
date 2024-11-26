
const form = document.getElementById("babyForm");
const babyImage = document.getElementById("babyImage");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const parent1 = document.getElementById("parent1").files[0];
    const parent2 = document.getElementById("parent2").files[0];

    if (!parent1 || !parent2) {
        alert("Please upload both images!");
        return;
    }

    const parent1Base64 = await toBase64(parent1);
    const parent2Base64 = await toBase64(parent2);

    try {
        const response = await fetch("https://futurebaby-ai-baby-generator.p.rapidapi.com/generate-baby-sync", { //<-- replace with your url
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": "4b9c36f422msh0b77e11e95a6932p152774jsn6b03f29bcf9e", //<-- Replace with your own RapidAPI key
                "X-RapidAPI-Host": "futurebaby-ai-baby-generator.p.rapidapi.com" //<-- Replace with your RapidAPI host
            },
            body: JSON.stringify({
                parent1: parent1Base64,
                parent2: parent2Base64
            })
        });

        const data = await response.json();
        if (response.ok && data.babyImage) {
            babyImage.src = data.babyImage;
            babyImage.style.display = "block";
        } else {
            alert("Error generating baby image: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to the API.");
    }
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); 
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

document.getElementById("showImageButton").addEventListener("click", () => {
    const image = document.getElementById("displayedImage");
    if (image.style.display === "none") {
        image.style.display = "block"; 
    } else {
        image.style.display = "none"; 
    }
});
