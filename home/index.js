document.addEventListener("DOMContentLoaded", function() {
    const isAddPlantsPage = window.location.pathname.includes("add_plants.html");
    
    if (isAddPlantsPage) {
        loadSavedPlants();
    }

    // Setup identify button if it exists
    const identifyButton = document.getElementById("identify-button");
    if (identifyButton) {
        identifyButton.addEventListener("click", function() {
            const fileInput = document.getElementById("upload-image");
            const file = fileInput.files[0];
            if (!file) {
                alert("Please upload an image first!");
                return;
            }
            identifyPlant(file);
        });
    }
});

async function identifyPlant(file) {

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async function () {
        const base64Image = reader.result.split(',')[1]; // Extract base64 data
    
        const apiKey = "API Key"; // Hidden the API key
        const apiUrl = "https://plant.id/api/v3/identification?details=common_names,url,description,taxonomy,rank,gbif_id,inaturalist_id,image,edible_parts,watering,common_uses,cultural_significance&language=en";

        const requestBody = {
            images: [base64Image],  // Send only the Base64 data
            latitude: 71,  // setting the location to Boston
            longitude: 42,
            similar_images: true,
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Api-Key": apiKey,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();

            // Extract the first suggestion (most probable plant match)
            const plantData = result?.result?.classification?.suggestions?.[0];

            if (plantData) {
                localStorage.setItem("selectedPlant", JSON.stringify(plantData));
                window.location.href = "./flashcard.html";
            } else {
                console.error("No plant suggestion found in API response.");
            }
            // if no plant is found, nothing happens.

        } catch (error) {
            console.error("Error identifying plant:", error);
        }
    };
}