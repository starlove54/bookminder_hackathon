import Image from 'next/image'
import Link from 'next/link'
import BookIcon from '../components/BookIcon'
import Card from '../components/Card'
import Plus from '../components/Plus'

export default function Home() {
  return (
    <main>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden border-r bg-gray-50/40 lg:block dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6 bg-white shadow-sm dark:bg-gray-950">
              <Link
                className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-50"
                href="#"
              >
                <span className="">My Books</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <div className="grid items-start px-4 text-sm font-medium">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  <BookIcon />
                  Book 1
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-50"
                  href="#"
                >
                  <BookIcon />
                  Book 2
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                  href="#"
                >
                  <BookIcon />
                  Book 3
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex h-16 items-center justify-between border-b bg-gray-50/40 px-6 shadow-sm dark:bg-gray-800/40">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Book 2
              </h1>
              {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                href="#"
              >
                Library
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                href="#"
              >
                Characters
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
                href="#"
              >
                Storyline
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
            </div>
            <div className="flex items-center gap-2">
              {/* <Button
          className="h-8 w-8 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          size="icon"
          variant="outline"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Add New</span>
        </Button> */}
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Characters
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <Card title={`sajja tatta`} description={`bunty bondu`} />
                  <Card title={`khabba tatta`} description={`bunty bondu`} />
                  <Card title={`sajja tatta`} description={`bunty bondu`} />
                  <Card title={`khabba tatta`} description={`bunty bondu`} />
                  <Card title={`sajja tatta`} description={`bunty bondu`} />
                  <Plus />
                  {/* <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-950">
              <CardHeader>
                <img
                  alt="Character Image"
                  className="aspect-square rounded-md object-cover"
                  height="80"
                  src="/placeholder.svg"
                  width="80"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Frodo Baggins
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  The main protagonist of the story, a hobbit who embarks on a
                  quest to destroy the One Ring.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    color="red"
                    size="sm"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card> */}
                  {/* <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-950">
              <CardHeader>
                <img
                  alt="Character Image"
                  className="aspect-square rounded-md object-cover"
                  height="80"
                  src="/placeholder.svg"
                  width="80"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Gandalf the Grey
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A powerful wizard who guides and protects Frodo on his
                  journey.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    color="red"
                    size="sm"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card> */}
                  {/* <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-950">
              <CardHeader>
                <img
                  alt="Character Image"
                  className="aspect-square rounded-md object-cover"
                  height="80"
                  src="/placeholder.svg"
                  width="80"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Aragorn
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  A ranger and the heir to the throne of Gondor, who joins the
                  fellowship on their quest.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    color="red"
                    size="sm"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card> */}
                  {/* <Card className="bg-white shadow-sm hover:shadow-lg transition-shadow dark:bg-gray-950">
              <CardHeader>
                <img
                  alt="Character Image"
                  className="aspect-square rounded-md object-cover"
                  height="80"
                  src="/placeholder.svg"
                  width="80"
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Legolas
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  An elven archer who joins the fellowship on their quest.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    size="sm"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <Button
                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    color="red"
                    size="sm"
                    variant="outline"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card> */}
                </div>
              </div>
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  Storyline
                </h2>
                <div className="relative grid gap-4 pl-6 after:absolute after:inset-y-0 after:w-px after:bg-gray-500/20 dark:after:bg-gray-400/20">
                  <div className="grid gap-1 text-sm relative">
                    <div className="aspect-square w-3 bg-gray-900 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1 dark:bg-gray-50" />
                    <div className="font-medium">The Fellowship Formed</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      The main characters, including Frodo, Gandalf, Aragorn,
                      and Legolas, come together to form the Fellowship of the
                      Ring and embark on a quest to destroy the One Ring and
                      defeat the dark lord Sauron.
                    </div>
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
