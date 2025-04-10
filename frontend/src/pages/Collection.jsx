import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch, loading } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [selectedPetCategory, setSelectedPetCategory] = useState('');

  const petCategories = {
    Cat: ['American Cat', 'Siamese Cat', 'Persian Cat'],
    Dog: ['Labrador', 'Bulldog', 'Beagle'],
    Parrots: ['Macaw', 'Cockatoo', 'Budgerigar'],
  };

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  // Apply filter and sort only after products are loaded
  useEffect(() => {
    if (products.length > 0) {
      applyFilter();
    }
  }, [products, category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          Filters
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Pet Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Pet Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
            {/* Cat Category */}
            <p className='flex gap-2 cursor-pointer' onClick={() => setSelectedPetCategory(selectedPetCategory === 'Cat' ? '' : 'Cat')}>
              <input className='w-3' type="checkbox" value={'Cat'} onChange={toggleCategory} />Cat
              <img className={`h-3 ${selectedPetCategory === 'Cat' ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
            </p>
            {selectedPetCategory === 'Cat' && (
              <div className='pl-5'>
                {petCategories.Cat.map((subCat) => (
                  <p key={subCat} className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={subCat} onChange={toggleSubCategory} />{subCat}
                  </p>
                ))}
              </div>
            )}
            {/* Dog Category */}
            <p className='flex gap-2 cursor-pointer' onClick={() => setSelectedPetCategory(selectedPetCategory === 'Dog' ? '' : 'Dog')}>
              <input className='w-3' type="checkbox" value={'Dog'} onChange={toggleCategory} />Dog
              <img className={`h-3 ${selectedPetCategory === 'Dog' ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
            </p>
            {selectedPetCategory === 'Dog' && (
              <div className='pl-5'>
                {petCategories.Dog.map((subCat) => (
                  <p key={subCat} className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={subCat} onChange={toggleSubCategory} />{subCat}
                  </p>
                ))}
              </div>
            )}
            {/* Parrots Category */}
            <p className='flex gap-2 cursor-pointer' onClick={() => setSelectedPetCategory(selectedPetCategory === 'Parrots' ? '' : 'Parrots')}>
              <input className='w-3' type="checkbox" value={'Parrots'} onChange={toggleCategory} />Parrots
              <img className={`h-3 ${selectedPetCategory === 'Parrots' ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
            </p>
            {selectedPetCategory === 'Parrots' && (
              <div className='pl-5'>
                {petCategories.Parrots.map((subCat) => (
                  <p key={subCat} className='flex gap-2'>
                    <input className='w-3' type="checkbox" value={subCat} onChange={toggleSubCategory} />{subCat}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {loading ? (
            <p>Loading...</p> // Show loading message when products are loading
          ) : Array.isArray(filterProducts) && filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} image={item.image} id={item._id} price={item.price} />
            ))
          ) : (
            <p>No products available.</p> // Display message if no filtered products are found
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
