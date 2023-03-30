import { TUserProfile } from "./login";

export type TAddPetFormValues = {
  name: string;
  age: string;
  breed: string;
  description: string;
  species: string;
  image: File | undefined;
};

export type TAnimal = {
  id: number;
  shelterId: number;
  name: string;
  age: string;
  breed: string;
  species: string;
  description: string;
  images: string[];
  createdAt: string;
  user_id: string;
  like_id?: string;
  status?: string;
};

export type TKeeperLike = {
  id: number;
  name: string;
  images: string[];
  firstName: string;
  lastName: string;
  status: string;
  user_id: string;
};

export type TChat = {
  id: number;
  created_at: string;
  users: TUserProfile[];
  request: TKeeperLike;
};
