"use client";
// import { useState } from "react";
// import { uploadImage } from "@/lib/uploadImage";
// import { urlFor } from "@/sanity/lib/image"; // Importing image helper

// interface ImagesProps {
//   featureImage: string | null;
//   setFeatureImage: (imageId: string | null) => void;
// }

// export default function Images({ featureImage, setFeatureImage }: ImagesProps) {
//   const [uploading, setUploading] = useState(false);

//   // 🔹 Handle Image Upload
//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     try {
//       const imageId = await uploadImage(file); // Upload to Sanity
//       setFeatureImage(imageId); // Save image ID for API submission
//     } catch (error) {
//       console.error("Image upload error:", error);
//       alert("Failed to upload image!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <section className="p-5 bg-white border rounded-xl shadow-md">
//       <h2 className="font-semibold text-lg mb-4">Images</h2>

//       {/* 🔹 Image Preview */}
//       {featureImage ? (
//         <div className="mb-4">
//           <img
//             src={urlFor(featureImage).width(400).height(300).url()} // ✅ Using Sanity Image Builder
//             alt="Product"
//             className="w-full h-48 object-cover rounded-lg border"
//           />
//         </div>
//       ) : (
//         <p className="text-sm text-gray-500">No image selected</p>
//       )}

//       {/* 🔹 File Input */}
//       <label className="block mt-4">
//         <span className="text-gray-700 text-sm">Upload Product Image</span>
//         <input
//           type="file"
//           onChange={handleImageUpload}
//           className="w-full p-2 mt-2 border rounded-lg"
//           disabled={uploading}
//         />
//       </label>

//       {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
//     </section>
//   );
// }
  
import {ProductData} from './BasicDetails'

interface ImagesProps {
    data: ProductData;
    featureImage: string | null;
    setFeatureImage: (imageId: string | null) => void;
  }
  
  export default function Images({ data, featureImage, setFeatureImage }: ImagesProps) {
    return (
      <section className="p-5 bg-white border rounded-xl shadow-md">
        <h2 className="font-semibold text-lg mb-4">Upload Image</h2>
  
        {/* Upload Image Button */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setFeatureImage(reader.result as string);
              reader.readAsDataURL(file);
            }
          }}
          className="mb-3"
        />
  
        {/* Display Uploaded Image */}
        {featureImage && <img src={featureImage} alt="Product" className="w-40 h-40 object-cover mt-3" />}
      </section>
    );
  }
  