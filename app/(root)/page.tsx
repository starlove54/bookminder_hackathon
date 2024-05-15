'use client'
import BookIcon from '../components/BookIcon'
import Card from '../components/Card'
import Plus from '../components/Plus'
import { useState } from 'react'
import bookItems from '../bookItems.json'
import { Input } from '@/components/ui/input'
import { Separator } from '@radix-ui/react-separator'

type Character = {
  id: string
  title: string
  description: string
}

type StoryPoint = {
  id: string
  title: string
  description: string
}

type Book = {
  id: string
  title: string
  characters: Character[]
  storypoints: StoryPoint[]
}

export default function Home() {
  const [books, setBook] = useState<Book[]>(bookItems)
  const [selectedBookId, setSelectedBookId] = useState('1')

  const readBook = (id: string) => {
    setSelectedBookId(id)
  }
  const addCharacter = () => {
    // Find the book with the selected ID
    const selectedBook = books.find((item) => item.id === selectedBookId)

    if (selectedBook) {
      // Create a new character object
      const newCharacter = {
        id: crypto.randomUUID(),
        title: 'New character title',
        description: 'Add the description for the new character',
      }

      // Create a new array with the updated characters
      const updatedCharacters = [...selectedBook.characters, newCharacter]

      // Update the book with the new characters array
      const updatedBooks = books.map((book) => {
        if (book.id === selectedBookId) {
          console.log(selectedBook.characters)
          return {
            ...book,
            characters: updatedCharacters,
          }
        }
        return book
      })
      // Update the state with the updated books array
      setBook(updatedBooks)
    }
  }

  const removeCharacter = (bookId: string, characterCardKey: string) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        return {
          ...book,
          characters: book.characters.filter(
            (character) => character.id !== characterCardKey
          ),
        }
      }
      return book
    })
    setBook(updatedBooks)
  }

  return (
    <main>
      <div className="flex flex-1 overflow-hidden ">
        <div className=" border-r max-w-[230px] sm:max-w-[350px] bg-gray-50/40  sm:block dark:bg-gray-800/40 ">
          <div className="flex h-full max-h-screen flex-col gap-6">
            {/* my stories  */}
            <div className="flex  h-[65px] items-center border-b justify-center bg-white shadow-sm dark:bg-gray-950">
              <div className="flex items-center gap-2 text-2xl font-semibold text-gray-600 dark:text-gray-50">
                <span className="text-md">My Stories</span>
              </div>
            </div>

            <div className="flex-1  overflow-auto py-2 gap-4    ">
              <div className="px-4 font-medium  ">
                <div className="max-w-[280px] ">
                  <Input />
                </div>
                <div className="flex flex-col gap-1 py-6 ">
                  {books.map((item, index) => (
                    <>
                      {index >= 1 && (
                        <Separator
                          className="border-t border-gray-200  "
                          orientation="horizontal"
                        />
                      )}
                      <div
                        key={item.id}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 text-lg  dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50 cursor-pointer "
                        onClick={() => readBook(item.id)}
                      >
                        {item.title}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex h-16 items-center justify-between border-b bg-gray-50/40 px-6 shadow-sm dark:bg-gray-800/40">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold text-gray-600 dark:text-gray-50">
                {books.find((item) => item.id === selectedBookId)?.title}
              </h1>
            </div>
            <div className="flex items-center gap-2"></div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h2 className="text-2xl font-semibold text-gray-500  dark:text-gray-50">
                  Characters
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {books
                    .find((item) => item.id === selectedBookId)
                    ?.characters.map((character) => (
                      <Card
                        key={character.id}
                        characterCardKey={character.id}
                        title={character.title}
                        description={character.description}
                        bookId={selectedBookId}
                        onDelete={removeCharacter}
                      />
                    ))}
                  <Plus onClick={() => addCharacter()} />
                </div>
              </div>
              <div className="grid gap-6 py-8">
                <h2 className="text-2xl  font-semibold text-gray-500 dark:text-gray-50">
                  StoryPoints
                </h2>
                <div className="relative grid gap-4 pl-6 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
                  <div className="grid gap-4 text-sm relative">
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                    {books
                      .find((item) => item.id === selectedBookId)
                      ?.storypoints.map((item) => (
                        <>
                          <div key={item.id} className="font-medium">
                            {item.title}{' '}
                          </div>
                          <div
                            key={item.id}
                            className="text-gray-500 dark:text-gray-400"
                          >
                            {item.description}{' '}
                          </div>
                        </>
                      ))}
                  </div>
                  <div className="grid gap-1 text-sm relative">
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
