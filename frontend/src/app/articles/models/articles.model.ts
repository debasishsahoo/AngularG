
export interface Articles {
    id: string;
    title: string;
    body: string;
    image: string;
    creatorid: string;
    creatername: string;
    createdAt: Date;
    like: [String];
    isActive: boolean;
  }