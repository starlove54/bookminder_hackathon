export type Book = {
      id: string
      title: string
      characters: Character[]
      storypoints: StoryPoint[]
}
export type BookDatatable = {
      id:string,title:string
}

export type StoryPoint = {
      id: string
      title: string
      description: string
}

export type Character = {
      id: string
      title: string
      description: string
}

// type Stories = {
//       title: string;
//       characters: Characters[];
//       storypoints: Storypoints[];
// }

// type Characters = {
//       title: string;
//       description: string;
// }

// type Storypoints = {
//       title: string;
//       description: string;
// }