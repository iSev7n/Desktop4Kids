import React from 'react';
import PaintApp from './PaintApp';
import { useVirtualRoot } from '../../../hooks/virtual-drive/virtualRootContext';
import { VirtualFolder } from '../../../features/virtual-drive/folder/virtualFolder';

const PaintAppWrapper: React.FC = () => {
  const virtualRoot = useVirtualRoot();

  const saveFileToPictures = (fileName: string, data: string) => {
    console.log(`Attempting to save file: ${fileName}`);
    const directory = virtualRoot?.navigate("~/Pictures") as VirtualFolder;
    console.log(`Navigated directory for save: ${directory}`);
    if (directory) {
      const [name, extension] = fileName.split('.');
      const file = directory.createFile(name, extension, (newFile) => {
        newFile.setSource(data);
      });
      directory.confirmChanges();
      console.log(`Saved file ${fileName} to Pictures`);
    } else {
      console.log("Failed to navigate to Pictures folder for save");
    }
  };

  const loadFileFromPictures = async (fileName: string): Promise<string> => {
    console.log(`Attempting to load file: ${fileName}`);
    const directory = virtualRoot?.navigate("~/Pictures") as VirtualFolder;
    console.log(`Navigated directory for load: ${directory}`);
    if (directory) {
      const file = directory.findFile(fileName);
      console.log(`Found file: ${file}`);
      if (file) {
        console.log(`Loaded file ${fileName} from Pictures with source: ${file.source}`);
        return file.source as string;
      } else {
        console.log(`File ${fileName} not found in Pictures`);
      }
    } else {
      console.log("Failed to navigate to Pictures folder for load");
    }
    return '';
  };

  return (
    <PaintApp saveFile={saveFileToPictures} loadFile={loadFileFromPictures} />
  );
};

export default PaintAppWrapper;
