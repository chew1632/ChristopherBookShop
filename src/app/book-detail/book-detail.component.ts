import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  books: Book[] = [];

  @Input() book?: Book;

  constructor(private bookSerive: BookService) { }
  ngOnInit(): void {
  }

  save(): void {
    if (this.book) {
      this.bookSerive.updateBook(this.book)
        .subscribe(() => console.log("UPDATED")
        );
    }
  }

  add(bookName: string, author: string, publishHouse: string, price: string, category: string, description: string, pages: string): void {
    bookName = bookName.trim();
    if (!bookName && !author && !publishHouse && !price && !category && !description && !pages) {
      console.log("資料沒填，return 不送");
      return;
    }
    this.bookSerive.addBook({ bookName, author, publishHouse, price, category, description, pages } as unknown as Book)
      .subscribe(book => {
        console.log(this.books);
        console.log(book);

        this.books.push(book);
      });
  }
}
