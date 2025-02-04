export async function uploadImage(file: File): Promise<string> {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
    if (!projectId || !dataset) {
      throw new Error("Sanity project ID or dataset is missing.");
    }
  
    // 🔹 Prepare the image upload form
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "sanity-upload"); // Optional, if using a preset
    formData.append("dataset", dataset);
  
    // 🔹 Upload image to Sanity
    const response = await fetch(`https://${projectId}.api.sanity.io/v1/assets/images/${dataset}`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.document._id; // ✅ Returns the uploaded image ID
  }
  