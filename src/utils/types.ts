export interface WhyChooseType {
  title: string;
  description: string;
  advantages: {
    id: string;
    title: string;
    description: string;
    img: string;
  }[];
}

export interface JsonDataType {
  id: number;
  documentId: string;
  title: string;
  simple_description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  advantages: Advantage[];
}

export interface Advantage {
  id: number;
  title: string;
  description: string;
  label: string;
  img: Image;
}
interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
interface ImageFormats {
  large?: ImageFormat;
  medium?: ImageFormat;
  small?: ImageFormat;
  thumbnail?: ImageFormat;
  [key: string]: ImageFormat | undefined;
}
interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
