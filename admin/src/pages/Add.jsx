import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ( {token}) => {
  // Image upload states
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // Product details states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isBestSeller, setIsBestSeller] = useState(false);

  // Category and subcategory states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);

  // Pet Categories and their Subcategories
  const petCategories = {
    Cat: ['American Cat', 'Siamese Cat', 'Persian Cat'],
    Dog: ['Labrador', 'Bulldog', 'Beagle'],
    Parrots: ['Macaw', 'Cockatoo', 'Budgerigar'],
  };

  // useEffect hook to handle subcategory updates when category changes
  useEffect(() => {
    if (selectedCategory) {
      setSubCategories(petCategories[selectedCategory] || []);
    } else {
      setSubCategories([]);  // Reset subcategories if no category is selected
    }
  }, [selectedCategory]);

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the file object for FormData
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', selectedCategory);
      formData.append('subCategory', selectedSubCategory);
      formData.append('isBestSeller', isBestSeller);

      // Append image files to FormData if they exist
       image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      // Make API request (replace URL with your actual API endpoint)
      const response = await axios.post(backendUrl + "/api/product/add" ,formData , {headers:{token}})
       
      
      if (response.data.success) {
      toast.success(response.data.message)
      setName('')
      setDescription('')
      setImage1('')
      setImage2('')
      setImage3('')
      setImage4('')
      setPrice('')

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };

  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={onSubmitHandler}>
      {/* Image Upload Section */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="Upload" />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => handleImageChange(e, setImage1)}
            />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="Upload" />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => handleImageChange(e, setImage2)}
            />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="Upload" />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => handleImageChange(e, setImage3)}
            />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="Upload" />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => handleImageChange(e, setImage4)}
            />
          </label>
        </div>
      </div>

      {/* Product Name Section */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Product Description Section */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write Desc here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category and Subcategory Selection */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8 ">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Parrots">Parrots</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select
            className="w-full px-3 py-2"
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            <option value="">Select Subcategory</option>
            {subCategories.length > 0 ? (
              subCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))
            ) : (
              <option disabled>No subcategories available</option>
            )}
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="4500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={isBestSeller}
          onChange={() => setIsBestSeller(!isBestSeller)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Best Seller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        Add Product
      </button>
    </form>
  );
};

export default Add;
