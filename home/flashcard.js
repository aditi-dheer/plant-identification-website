document.addEventListener("DOMContentLoaded", function () {
    const plantData = JSON.parse(localStorage.getItem("selectedPlant"));

    if (!plantData) {
        alert("No plant data found! Redirecting...");
        window.location.href = "index.html";
        return;
    }

    // Set plant image (fallback to placeholder if missing)
    document.getElementById("plant-image").src = plantData.similar_images?.[0]?.url || "placeholder.jpg";
    document.getElementById("plant-name").textContent = plantData.name || "Unknown";

    // Update each <span> inside the <p> tags
    document.getElementById("plant-description").querySelector("span").textContent = plantData.details?.description?.value || "No description available";
    document.getElementById("plant-common-names").querySelector("span").textContent = plantData.details?.common_names ? plantData.details.common_names.join(", ") : "No common names available";
    document.getElementById("plant-url").querySelector("span").textContent = plantData.details?.url || "No URL available";
    document.getElementById("plant-taxonomy").querySelector("span").textContent = plantData.details?.taxonomy?.family || "N/A";
    document.getElementById("plant-rank").querySelector("span").textContent = plantData.details?.rank || "N/A";
    document.getElementById("plant-gbif-id").querySelector("span").textContent = plantData.details?.gbif_id || "N/A";
    document.getElementById("plant-edible-parts").querySelector("span").textContent = plantData.details?.edible_parts ? plantData.details.edible_parts.join(", ") : "Not available";
    document.getElementById("plant-common-uses").querySelector("span").textContent = plantData.details?.common_uses || "Not available";
    document.getElementById("plant-cultural-significance").querySelector("span").textContent = plantData.details?.cultural_significance || "Not available";

    // Display plant data in flashcard
    displayPlantData(plantData);

});
function displayPlantData(plantData) {
    // Set main plant details
    document.getElementById("plant-image").src = plantData.similar_images?.[0]?.url || "placeholder.jpg";
    document.getElementById("plant-name").textContent = plantData.name || "Unknown Plant";
    
    // Update detailed information
    const fields = {
        "plant-description": plantData.details?.description?.value || "No description available",
        "plant-common-names": plantData.details?.common_names ? plantData.details.common_names.join(", ") : "No common names available",
        "plant-url": plantData.details?.url || "No URL available",
        "plant-taxonomy": plantData.details?.taxonomy?.family || "N/A",
        "plant-rank": plantData.details?.rank || "N/A",
        "plant-gbif-id": plantData.details?.gbif_id || "N/A",
        "plant-edible-parts": plantData.details?.edible_parts ? plantData.details.edible_parts.join(", ") : "Not available",
        "plant-common-uses": plantData.details?.common_uses || "Not available",
        "plant-cultural-significance": plantData.details?.cultural_significance || "Not available"
    };

    for (const [id, value] of Object.entries(fields)) {
        const element = document.getElementById(id);
        if (element && element.querySelector("span")) {
            element.querySelector("span").textContent = value;
        }
    }
}