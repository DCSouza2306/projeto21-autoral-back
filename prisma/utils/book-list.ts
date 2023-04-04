import { Book } from "@prisma/client";
import { BookList, ReadingList } from "@prisma/client";
import dayjs from "dayjs";
import faker from "@faker-js/faker";

type BookListType = Omit<BookList, "id" | "createdAt">[];

export function bookListData(
 num: number,
 books: Book[],
 readingLists: ReadingList[]
) {
 const data: BookListType = [];

 for (let i = 0; i < readingLists.length; i++) {
  const allBooks = books;
  for (let j = 0; j < faker.datatype.number({ min: 1, max: num }); j++) {
   const index = faker.datatype.number({ min: 0, max: allBooks.length - 1 });
   if (j == 0) {
    data.push({
     readingListId: readingLists[i].id,
     bookId: allBooks[index].id,
     status: "CURRENT",
     startAt: dayjs().set("date", 25).set("month", j).toDate(),
     finishAt: dayjs()
      .set("date", 25)
      .set("month", j + 1)
      .toDate(),
    });
    allBooks.splice(index, 1);
   } else {
    data.push({
     readingListId: readingLists[i].id,
     bookId: allBooks[index].id,
     status: "NEXT",
     startAt: dayjs().set("date", 25).set("month", j).toDate(),
     finishAt: dayjs()
      .set("date", 25)
      .set("month", j + 1)
      .toDate(),
    });
    allBooks.splice(index, 1);
   }
  }
 }

 return data;
}
