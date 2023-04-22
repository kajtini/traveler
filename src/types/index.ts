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
  likes: number;
  id: string;
}
