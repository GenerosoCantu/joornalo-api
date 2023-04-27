export class Images {
  filename: String;
  ratio: String;
  label: String;
}
export class Story {
  _id?: string;
  date?: Date;
  status: string;
  section: string;
  subsection?: string;
  title: string;
  desc: string;
  text: string;
  images?: Images[];
  embed?: string[];
  quotes?: string[];
}
