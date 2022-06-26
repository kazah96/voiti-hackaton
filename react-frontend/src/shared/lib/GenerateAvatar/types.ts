type SizeAvatar = {
  width: number;
  height: number;
};

export type GenerateAvatarProps = {
  size?: SizeAvatar;
  name: string;
  onGenerateUri: (uri: string) => void;
};
