export type TRole = "Keeper" | "Animal shelter";

export type TProfileFormValues = {
  avatar?: File;
  firstName?: string;
  lastName?: string;
  name?: string;
  city?: string;
  address?: string;
};

export type TUserProfile = {
  id: number;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  avatarImageSrc: string;
  user_id: string;
  name?: string;
  city?: string;
  address?: string;
  role: string;
};
