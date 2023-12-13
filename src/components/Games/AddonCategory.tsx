import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

type CategoriesInputProps  = {
    handleAddCategories: (tags: string[]) => void;
    existingCategories?: string[];
};
const AddonCategory = ({ handleAddCategories,existingCategories }: CategoriesInputProps) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
      if (existingCategories) {
        setCategories(existingCategories);
      }
    }, [existingCategories]);

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
      <div className="flex flex-col md:flex-row">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-600  rounded-lg text-white m-1 p-1"
          >
            <div className="flex items-center justify-between px-2 md:p-1 md:justify-center">
              <span className="">{category}</span>
              <span onClick={()=>removeCategory(index)} className="bg-black rounded-full m-1 px-1 cursor-pointer hover:bg-gray-100 hover:text-black">
                &times;
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row  justify-center items-center ">
        <input
          onChange={(e) => setNewCategory(e.target.value)}
          type="text"
          placeholder="Add a category"
          className="dark:bg-gray-700 dark:placeholder:text-gray-300 placeholder:p-3  md:flex-1 border-none outline-none w-full"
        />
        <Button type="button" onClick={handleAddCategory} className="" variant={"ghost"}>
          Add Tag
        </Button>
      </div>
    </div>
  );
};

export default AddonCategory;
