import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGames, updateGameInFirestore } from "@/Store/GamesSlice";
import { ZodType, z } from "zod";
import { FormData } from "./CreateGameForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import AddonCategory from "./AddonCategory";
import TagsInput from "../Admin/TagsInput";
import { getGameImageURLs, uploadGameImages } from "@/services/storage.service";

const schema: ZodType<FormData> = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10),
});

const EditGame: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) =>
    state.games.gamesArray.find((game) => game.id === id)
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [allTags, setAllTags] = useState<string[]>(data?.game?.tags || []);
  const [allCategories, setAllCategories] = useState<string[]>(
    data?.game?.addonCategories || []
  );
  const [imageUpload, setImageUpload] = useState<FileList | null>(null);
  const navigate = useNavigate();

  const handleAddTags = (tags: string[]) => {
    setAllTags(tags);
  };
  const onCancel = () => {
    navigate(-1);
  };

  const handleAddCategories = (categories: string[]) => {
    setAllCategories(categories);
  };
  const uploadImage = async (gameName: string) => {
    if (imageUpload === null) return;
    await uploadGameImages(imageUpload, gameName);
  };

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  useEffect(() => {
    setAllTags(data?.game?.tags || []);
  }, [data?.game?.tags]);
  
  useEffect(() => {
    setAllCategories(data?.game?.addonCategories || []);
  }, [data?.game?.addonCategories]);

  const onSubmit = async (game: FormData) => {  
    await uploadImage(game.name)    
    if(allTags.length!==0 && allCategories.length!==0){        
    const imageURLS: string[] = await getGameImageURLs(game.name);  
        let editedGame={
            title: game.name,
            description: game.description,
            imageURLS: imageURLS,
            tags: allTags,
            addonCategories: allCategories,
        };
        dispatch(updateGameInFirestore({editedGame,id}))  
        navigate('/admin');     
    }
    
  };

  return (
    <div className="px-40 py-20">
      <h1 className="py-5 text-3xl">Edit Game</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div className="mt-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Game Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={data?.game?.title ? data?.game?.title : ""}
            {...register("name")}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Game Name"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="mt-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            className="bg-gray-50 dark:text-white dark:bg-gray-700 dark:placeholder-gray-300 w-full"
            placeholder="Description or info about the game"
            id="description"
            defaultValue={
              data?.game?.description ? data?.game?.description : ""
            }
            {...register("description")}
          ></textarea>
        </div>

        <div>
          <TagsInput
            handleAddTags={handleAddTags}
            existingTags={data?.game?.tags}
          />
        </div>
        <div>
          <AddonCategory
            handleAddCategories={handleAddCategories}
            existingCategories={data?.game?.addonCategories}
          />
        </div>

        <div className="text-center mt-3 mb-3 border-[5px] border-secondary p-4">
          <input
            type="file"
            className="w-full"
            onChange={(e) => {
              setImageUpload(e.target.files);
            }}
            multiple
          />
        </div>

        <div className="flex space-x-10">
          <Button
            type="submit"
            className="flex-auto dark:text-white  rounded-lg py-2 mt-5"
          >
            Edit Game
          </Button>
          <Button
            onClick={onCancel}
            className="bg-secondary text-black dark:text-white  rounded-lg py-2 mt-5 w-60"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditGame;
