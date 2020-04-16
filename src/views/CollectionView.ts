import { Collection } from "../models/Collection";

export abstract class CollectionView<T1, T2> {
  constructor(public parent: Element, public collection: Collection<T1, T2>) { }

  abstract renderItem(model: T1, itemParent: Element): void;

  render(): void {
    this.parent.innerHTML = '';
    const templateElement = document.createElement('template');
    this.collection.models.forEach(item => {
      const itemParent = document.createElement('div');
      this.renderItem(item, itemParent);
      templateElement.content.append(itemParent);
    })
    this.parent.append(templateElement.content);
  }

}