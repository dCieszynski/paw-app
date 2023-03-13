export type TAddPetFormValues = {
  name: string;
  age: string;
  breed: string;
  description: string;
  image: File | undefined;
};

export type TAnimal = {
  id: number;
  shelterId: number;
  name: string;
  age: string;
  breed: string;
  description: string;
  images: string[];
  createdAt: string;
  user_id: string;
  like_id?: string;
  status?: string;
};
