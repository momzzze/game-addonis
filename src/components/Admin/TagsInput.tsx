import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

type TagsInputProps = {
  handleAddTags: (tags: string[]) => void;
  existingTags?: string[];
};
const TagsInput = ({ handleAddTags,existingTags }: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (existingTags) {
      setTags(existingTags);
    }
  }, [existingTags]);


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
      <div className="flex flex-col md:flex-row">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-600  rounded-lg text-white m-1 p-1"
          >
            <div className="flex items-center justify-between px-2 md:p-1 md:justify-center">
              <span className="">{tag}</span>
              <span onClick={()=>removeTag(index)} className="bg-black rounded-full m-1 px-1 cursor-pointer hover:bg-gray-100 hover:text-black">
                &times;
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row  justify-center items-center">
        <input
          onChange={(e) => setNewTag(e.target.value)}
          type="text"
          placeholder="Add a tag"
          className="dark:bg-gray-700 dark:placeholder:text-gray-300 placeholder:p-3  md:flex-1 border-none outline-none w-full"
        />
        <Button type="button" onClick={handleAddTag} className="" variant={"ghost"}>
          Add Tag
        </Button>
      </div>
    </div>
  );
};

export default TagsInput;
