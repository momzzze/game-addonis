import React, { useState } from "react";
import { Button } from "../ui/button";

type TagsInputProps = {
  handleAddTags: (tags: string[]) => void;
};
const TagsInput = ({ handleAddTags }: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (newTag.trim()) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);      
      handleAddTags(updatedTags); 
      setNewTag("");    
    }    
  };

  const removeTag = (index: number) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    handleAddTags(updatedTags);
  };

  return (
    <div className="border radius-full w-full mt-2 mb-1 p-4 flex flex-col">
      <h1>Enter some tags...</h1>
      <div className="flex flex-row">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-600  rounded-lg text-white m-1 p-1"
          >
            <div className="flex items-center justify-center">
              <span className="">{tag}</span>
              <span onClick={()=>removeTag(index)} className="bg-black rounded-full m-1 px-1 cursor-pointer hover:bg-gray-100 hover:text-black">
                &times;
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row">
        <input
          onChange={(e) => setNewTag(e.target.value)}
          type="text"
          placeholder="Add a tag"
          className="dark:bg-gray-700 dark:placeholder:text-gray-300 placeholder:p-3  flex-1 border-none outline-none"
        />
        <Button type="button" onClick={handleAddTag} className="" variant={"ghost"}>
          Add Tag
        </Button>
      </div>
    </div>
  );
};

export default TagsInput;
