import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-markdown-editor-lite/lib/index.css";
import { z, ZodType } from "zod";
import { Button } from "../ui/button";
import { getGameImageURLs, uploadGameImages } from "@/services/storage.service";
import { createGame } from "@/services/game.service";
import TagsInput from "./TagsInput";
import AddonCategory from "./AddonCategory";

interface CreateGameFormProps {
  onGameCreated: () => void;
}
interface FormData {
  name: string;
  description: string;
  tags: string[];
  //   pictures: FileList;
  //   addons: string[];
  //   categories: string[];
}

const schema: ZodType<FormData> = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10),
  // tags: z.array(z.string()),
  //   pictures: z.array(z.instanceof(File)),
  //   addons: z.array(z.string()),
  //   categories: z.array(z.string()),
});

const CreateGameForm: React.FC<CreateGameFormProps> = ({onGameCreated}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const handleAddTags = (tags) => {
    setAllTags(tags);
  };

  const handleAddCategories = (categories) => {
    setAllCategories(categories);
  };

  const uploadImage = async (gameName) => {
    if (imageUpload === null) return;
    await uploadGameImages(imageUpload, gameName);
  };

  const onSubmit = async (data: FormData) => {
    await uploadImage(data.name);
    const imageURLS: string[] = await getGameImageURLs(data.name);
    await createGame({
      title: data.name,
      description: data.description,
      imageURLS: imageURLS,
      tags: allTags,
      addonCategories: allCategories,
    });
    onGameCreated();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div className="mt-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Game Name
          </label>
          <input
            type="name"
            id="name"
            {...register("name")}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Game Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mt-2">
          <label
            htmlFor="textarea"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            className="bg-gray-50 dark:text-white dark:bg-gray-700 dark:placeholder-gray-300 w-full"
            placeholder="Description or info about the game"
            id="description"
            {...register("description")}
          ></textarea>
        </div>
        <div>
          <TagsInput handleAddTags={handleAddTags} />
        </div>
        <div>
          <AddonCategory handleAddCategories={handleAddCategories} />
        </div>
        <div className="text-center mt-3 mb-3 border-[5px] border-secondary p-4">
          <input
            type="file"
            onChange={(e) => {
              setImageUpload(e.target.files);
            }}
            multiple
          />
        </div>

        <Button
          type="submit"
          className="w-full dark:text-white  rounded-lg py-2 mt-5"
        >
          Create Game
        </Button>
      </form>
    </>
  );
};

export default CreateGameForm;
