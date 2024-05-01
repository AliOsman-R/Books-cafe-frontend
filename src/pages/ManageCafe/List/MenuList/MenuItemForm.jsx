import React, { useState } from 'react';
import { Container, PrimaryInput, TextareaInput, inputStyle } from '../../../../components/inputs';
import { toast } from 'sonner';
import ImagesUploader from '../../../../components/ImagesUploader';

const MenuItemForm = ({formData, setFormData}) => {
    const [ingredient, setIngredient] = useState('')
    // const isCountable = formData.isCountable 


    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "number" && value < 0) {
            toast.error("Please enter a non-negative value.");
            return;
        }
        let formattedValue = value;

        if (name === "isCountable") {
            formattedValue = value === "true";
        } else if (name === "type") {
            formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        } 
    
        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const handleingredientChange = (e) => {
        setIngredient(e.target.value)
    }

    const handleAddIngredient = () => {
        const newIngredients = [...formData.ingredients, ingredient.trim()];
        setFormData(prev => ({
            ...prev,
            ingredients: newIngredients
        }));
        setIngredient('')
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...formData.ingredients];
        newIngredients.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            ingredients: newIngredients
        }));
    };

    return (
        <div className="pb-[30px]">
            <form className="space-y-4">
                <Container labelName='Item Name'>
                    <PrimaryInput
                        type="text"
                        name="name"
                        className="mt-1 p-2 block w-full border"
                        placeholder="Enter item name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Type'>
                    <PrimaryInput
                        type="text"
                        name="type"
                        placeholder="Enter menu item type ex.(Pizza, Beverages, ...)"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Ingredients'>
                    <div className="flex items-center space-x-4">
                        <PrimaryInput
                            type="text"
                            name="ingredient"
                            placeholder="Enter ingredient"
                            value={ingredient}
                            onChange={handleingredientChange}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primaryColor focus:ring focus:ring-primaryColor focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleAddIngredient}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primaryColor border border-transparent rounded-md shadow-sm hover:bg-primaryColorHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor"
                        >
                            Add
                        </button>
                    </div>
                    <ul className="mt-2">
                        {formData.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-center justify-between mb-2 px-4 py-2 bg-gray-50 rounded-md">
                                <span className="text-gray-800">{ingredient}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveIngredient(index)}
                                    className="text-red-600 hover:text-red-700 focus:outline-none focus:text-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </Container>
                {/* <Container labelName='Is Item Countable (Is the item can be sold as numbers of items example: cakes)'>
                    <select
                        name="isCountable"
                        className={inputStyle}
                        value={formData.isCountable}
                        onChange={handleChange}
                        required
                    >
                        <option value={true} >Yes</option>
                        <option value={false} >No</option>
                    </select>
                </Container> */}
                <Container labelName='Status'>
                    <select
                        name="status"
                        className={inputStyle}
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                    </select>
                </Container>
                <Container labelName='Stock'>
                    <PrimaryInput
                        type="number"
                        name="stock"
                        min={0}
                        placeholder="Enter stock"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Price ($)'>
                    <PrimaryInput
                        type="number"
                        name="price"
                        min={0}
                        placeholder="Enter price"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <Container labelName='Description'>
                    <TextareaInput
                        name="description"
                        placeholder="Enter description"
                        className="mt-1 block w-full appearance-none bg-white border border-gray-300 hover:border-gray-500 py-2 px-3 rounded-lg shadow-sm text-sm leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Container>
                <ImagesUploader
                    formData={formData}
                    setFormData={setFormData}
                    name="images"
                    labelName="Menu Item Images"
                />
            </form>
        </div>
    );
}

export default MenuItemForm