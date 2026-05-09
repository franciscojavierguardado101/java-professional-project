import { EntrySkeletonType } from 'contentful';

export type BioColor =
  | 'Gold Dark'
  | 'Red Dark'
  | 'Dark Brown'
  | 'Dark Blue'
  | 'Dark White'
  | 'Just White'
  | 'Dark Forest'
  | 'Dark Sapphire';

export interface BioSkeleton extends EntrySkeletonType {
  contentTypeId: 'bio';
  fields: {
    name: string;
    description: string;
    stack: string[];
    color: BioColor;
  };
}

export interface Bio {
  name: string;
  description: string;
  stack: string[];
  color: BioColor;
}
