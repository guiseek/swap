import { NavigationItem } from './navigation-item';
import { BehaviorSubject } from 'rxjs';

export class Navigation {
  private _items = new BehaviorSubject<NavigationItem[]>([]);
  public items$ = this._items.asObservable();

  constructor(
    public id: string | number,
    public items: NavigationItem[] = []
  ) {}

  addItem(item: NavigationItem) {
    const items = this._items.getValue();
    this._items.next([...items, item]);
  }

  setItems(items: NavigationItem[]) {
    this._items.next(items);
  }
}
