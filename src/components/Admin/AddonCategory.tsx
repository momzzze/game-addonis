import React, { useState } from "react";
import { Button } from "../ui/button";

type CategoriesInputProps  = {
    handleAddCategories: (tags: string[]) => void;
};
const AddonCategory = ({ handleAddCategories }: CategoriesInputProps) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newCategory.trim()) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      handleAddCategories(updatedCategories);
      setNewCategory("");
    }
  };

  const removeCategory = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
    handleAddCategories(updatedCategories);
  };

  return (
    <div className="border radius-full w-full mt-2 mb-1 p-4 flex flex-col">
      <h1>Enter game categories</h1>
      <div className="flex flex-row">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-600  rounded-lg text-white m-1 p-1"
          >
            <div className="flex items-center justify-center">
              <span className="">{category}</span>
              <span onClick={()=>removeCategory(index)} className="bg-black rounded-full m-1 px-1 cursor-pointer hover:bg-gray-100 hover:text-black">
                &times;
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row">
        <input
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder="Add a category"
          className="dark:bg-gray-700 dark:placeholder:text-gray-300 placeholder:p-3  flex-1 border-none outline-none"
        />
        <Button type="button" onClick={handleAddCategory} className="" variant={"ghost"}>
          Add Tag
        </Button>
      </div>
    </div>
  );
};

export default AddonCategory;
