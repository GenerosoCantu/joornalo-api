export class Story {
  _id?: string;
  date?: Date;
  status: string;
  section: string;
  subsection?: string;
  title: string;
  desc: string;
  text: string;
  images?: string[];
  embed?: string[];
  quotes?: string[];
}
