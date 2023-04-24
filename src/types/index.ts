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
  id: string;
}
