import { notFoundError } from "@/errors/not-found-error";
import bookRepository from "@/repositories/book-repository";
import { invalidQueryError } from "./invalid-query-error";

async function getBooks(take: number, skip: number){
    if(take < 0 || skip < 0){
        throw invalidQueryError()
    }
    const data = await bookRepository.getBooks(skip, take);
    if(!data){
        throw notFoundError()
    };

    const books = data.map((e) => {
        return {
            id: e.id,
            title: e.title,
            author: e.Author.name,
            urlImage: e.urlImage
        }
    });

    return books;
}

async function getBooksCount(){
    const count = await bookRepository.booksCount();
    if(!count) {
        throw notFoundError()
    };

    return count;
}

async function getBookById(id: number){
    const book = await bookRepository.getBookById(id);
    if(!book){
        throw notFoundError();
    }

    const groups = book.BookList.map((e) => {
        return {
            id: e.ReadingList.Group.id,
            name: e.ReadingList.Group.name,
            urlImage: e.ReadingList.Group.urlImage,
            groupStatus: e.ReadingList.Group.status,
            readingStatus: e.status,
            startReading: e.startAt
        }
    })

    const currentReadings = groups.filter((e) => e.readingStatus === "CURRENT");
    const nextReadings = groups.filter((e) =>  e.readingStatus === "NEXT");

    const data = {
        id: book.id,
        title: book.title,
        synopsis: book.synopsis,
        urlImage: book.urlImage,
        author: book.Author.name,
        CurrentReadings: currentReadings,
        NextReadings: nextReadings
    }

    return data;
}

const bookService = {
    getBooks,
    getBooksCount,
    getBookById
};

export default bookService;