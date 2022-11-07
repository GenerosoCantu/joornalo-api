import { NumericLiteral } from "@babel/types";
import { Exclude } from 'class-transformer';

export class Module {
  id?: string;
  name: string;
  status: string;
  order: number;
}
