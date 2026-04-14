import { Pipe } from "@angular/core";
import { Category } from "../models/category";

@Pipe({
    name: 'categoryColor'
})
export class CategoryColor {
    transform(category: Category): string {
        switch (category) {
            case Category.Skirt:
                return 'pink';
            case Category.Dress:
                return 'lightblue';
            case Category.Shirt:
                return 'lightgreen';
            case Category.Set:
                return 'lightyellow';
            default:
                return 'white';
  }
}
}