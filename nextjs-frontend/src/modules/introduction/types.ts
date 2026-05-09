import { EntrySkeletonType } from 'contentful';

export type IntroductionColor = 'Dark Gold' | 'Blue' | 'White';

export interface IntroductionFields {
  name: string;
  stackDetails: string;
  color: IntroductionColor;
}

export interface IntroductionSkeleton extends EntrySkeletonType {
  contentTypeId: 'introduction';
  fields: IntroductionFields;
}

export interface Introduction {
  name: string;
  stackDetails: string;
  color: IntroductionColor;
}
