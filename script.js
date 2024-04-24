async function generateCitation() {
  const linkInput = document.getElementById("link-input");
  const citationOutput = document.getElementById("citation");

  // Clear any previous citation
  citationOutput.textContent = "";

  const link = linkInput.value;

  // Basic validation for a valid URL format
  if (!link.startsWith("http") || !link.includes(".")) {
    citationOutput.textContent = "Invalid link format. Please enter a valid URL.";
    return;
  }

  try {
    // Fetch metadata using url-metadata library
    const metadata = await urlMetadata(link);
    const title = metadata.title || "No title found"; // Handle missing title

    // Generate basic MLA citation with retrieved title
    const citation = `"${title}". [Website]. Retrieved April 24, 2024, from ${link}`;
    citationOutput.textContent = citation;
  } catch (error) {
    if (error.name === "NetworkError") {
      citationOutput.textContent = "Error connecting to the website. Please check your internet connection and try again.";
    } else {
      citationOutput.textContent = "Error fetching link information.";
      console.error(error);
    }
  }
}
