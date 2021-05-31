import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service'
import { NgImageSliderComponent } from 'ng-image-slider';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  selectedBook?: Book;
  books: Book[] = [];
  test: any;
  @ViewChild('nav')
  slider!: NgImageSliderComponent;
  imageObject: Array<object> = [
    {
      image: './assets/slider1.png',
      thumbImage: './assets/slider1.png',
      alt: 'First Image Slider',
      order: 1,
    }, {
      image: 'assets/slider2.png',
      thumbImage: 'assets/slider2.png',
      alt: 'Second Image Slider',
      order: 2
    }, {
      image: 'assets/slider3.png', // Support base64 image
      thumbImage: 'assets/slider3.png', // Support base64 image
      alt: 'Third Image Slider', //Optional: You can use this key if want to show image with alt
      order: 3 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
    }
  ];

  constructor(
    private bookservice: BookService,
    public dialog: MatDialog
  ) { }

  onSelect(book: Book): void {
    this.selectedBook = book;
    console.log(this.selectedBook);
    this.openDialog(); //open dialog
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50%',
      height: 'auto',
      data: {
        ISBN: this.selectedBook?.ISBN,
        author: this.selectedBook?.author,
        bookName: this.selectedBook?.bookName,
        category: this.selectedBook?.category,
        description: this.selectedBook?.description,
        pages: this.selectedBook?.pages,
        picture: this.selectedBook?.picture,
        price: this.selectedBook?.price,
        publishHouse: this.selectedBook?.publishHouse,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.test = result;
    });
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookservice.getBooks().subscribe(
      books => {
        this.books = books
      });
  }
}
@Component({
  selector: 'books_detail',
  templateUrl: 'books_detail.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Book) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}