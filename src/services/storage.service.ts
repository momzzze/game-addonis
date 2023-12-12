import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

export const uploadGameImages = async (images: FileList | null, gameName: string) => {
    const gameNameFormatted: string = formatGameName(gameName);
    if (!images || images.length === 0) {
        return;
    }

    const imagesRef = ref(storage, `games/${gameNameFormatted}/`);
    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const imageName = `${gameNameFormatted}_${Date.now()}_${file.name}`;
        const imageRef = ref(imagesRef, imageName);
        try {
            const snapshot = await uploadBytes(imageRef, file);
            console.log(`Uploaded ${imageName} successfully!`);
        } catch (error) {
            console.error(`Error uploading ${imageName}: ${error.message}`);
        }
    }
}

export const getGameImageURLs = async (gameName: string):Promise<string[]> => {
    const gameNameFormatted: string = formatGameName(gameName);
    const imagesRef = ref(storage, `games/${gameNameFormatted}/`);
    const downloadURLs = [];
    try {
        const imageList = await listAll(imagesRef);
        for (const image of imageList.items) {
            const url = await getDownloadURL(image);

            downloadURLs.push(url);
        }       
        
        return downloadURLs;
    } catch (error) {
        console.log(`Error getting download URLs for ${gameNameFormatted}: ${error.message}`);
        return [];
    }
}


export const formatGameName = (gameName: string): string => {
    const lowerCaseName = gameName.toLowerCase();
    const formattedName = lowerCaseName.replace(/\s+/g, "-");
    return formattedName;
};