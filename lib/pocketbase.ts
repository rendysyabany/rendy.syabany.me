import PocketBase from "pocketbase";

// Use environment variable for PocketBase URL
const PB_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://syabany-pb.fly.dev"; // Fallback or env

// Create PocketBase instance
export const pb = new PocketBase(PB_URL);

// Disable auto-cancellation for server-side requests
pb.autoCancellation(false);

// Type definitions
export type AuthModel = {
  id: string;
  avatar?: any;
  email: string;
  verified: boolean;
  name: string;
  phoneNumber?: string;
  role?: string;
  type?: string;
};

export type PostListLates = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage: any;
  images?: string[];
  isPublic: boolean;
  isPremium: boolean;
  allowComments: boolean;
  status: string;
  tags: string;
  metaTitle: string;
  metaKeywords: any;
  views: number;
  likes: number;
  comments: number;
  created: Date;
  updated: Date;
  author: any;
  collectionId: any;
  isLiked: boolean;
  labels: string[];
};

export type PostDetail = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  featuredImage: any;
  images?: string[];
  isPremium: boolean;
  isPublic: boolean;
  allowComments: boolean;
  status: string;
  tags: string;
  metaTitle: string;
  metaKeywords: any;
  views: number;
  likes: number;
  comments: number;
  created: Date;
  updated: Date;
  author: any;
  collectionId: any;
  expand?: {
    author?: AuthModel;
    labels?: any[];
  };
};
