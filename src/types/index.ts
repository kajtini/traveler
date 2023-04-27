export interface User {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}

export interface Destination {
  id: string;
  title: string;
  description: string;
  imgURL: string;
  rating: number;
  numRatings: number;
}

export interface Review {
  uid: string;
  content: string;
  timestamp: { seconds: number; nanoseconds: number };
  rating: number;
  id: string;
}

export interface Rating {
  id: number;
  rating: number;
  isSelected: boolean;
}
