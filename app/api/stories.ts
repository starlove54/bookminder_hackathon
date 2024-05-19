'use server'
import { Book, Character, StoryPoint } from "@/variables";
import * as edgedb from "edgedb";
import e from '../../dbschema/edgeql-js'
import { Users } from "@/dbschema/interfaces";

const client = edgedb.createClient();

export async function getStories() {
      const stories = await client.query<Book>(`\
      select Stories {
      id,
      title
      };`)
      console.log(stories);
      return stories;
}

export async function getStoriesComplete(id: string) {
      const story = await client.query<Book>(`\
      select Stories {
      id,
      title,
      characters : {
            id,title, description
      },
      storypoints : {
            id,title, description
      }
      }
      
      ;`)
      return story;
}

export async function getStoryById(id: string) {
      const story = await client.query<Book>(`\
      SELECT Stories {
            id,
            title,
            characters: {
                id,
                title,
                description
            },
            storypoints: {
                id,
                title,
                description
            }
        }
        FILTER .id = <uuid>'${id}';
      ;`)
      return story;
}

export async function createStory(
      title: string,
      characters: Character[],
      storypoints: StoryPoint[]
): Promise<void> {
      try {
            let chars: string = '', sPoints: string = '';
            // Insert characters and get their ids
            // const characterIds = await Promise.all(characters.map(async char => {
            const result = await client.query(`
            insert Stories {
                  title := "Harry Potter and the Philosopher's stone",
                  characters := 
                  {
                  (insert Characters {
                  title := "Harry Potter",
                  description := "The main protagonist, a young wizard who discovers his magical heritage on his eleventh birthday."
                  }),
                  (insert Characters {
                  title := "Hermione Granger",
                  description:= "Harry's intelligent and resourceful friend, known for her extensive knowledge of magic."
                  }),
                  (insert Characters {
                  title:= "Ron Weasley",
                  description := "Harry's loyal and brave best friend, coming from a large family of wizards."
                  }),
                  },
            
                  storypoints :=
                  {
                  (insert Storypoints {
                  title:= "The Philosopher's Stone",
                  description := "Harry's quest to prevent Voldemort from obtaining the Philosopher's Stone, a powerful magical artifact."
                  }) ,
                  (insert Storypoints {
                  title:= "Quidditch Match",
                  description := "Harry's first experience playing Quidditch, showcasing his talent and bravery."
                  }) 
                  } 
          `);


            console.log('Story created successfully.');
      } catch (error) {
            console.error('Error creating story:', error);
      }
}
export async function addStoryPointToStory(storyId: string, storyPoint: StoryPoint): Promise<void> {
      try {
            // Start a transaction
            // Insert the new story point
            const result = await client.querySingle<{ id: string }>(`
            INSERT Storypoints {
              title := <str>$0,
              description := <str>$1
            }
            SELECT {
              id
            };
          `, [storyPoint.title, storyPoint.description ?? null]);

            const storyPointId = result?.id;

            if (storyPointId) {
                  // Link the new story point to the existing story
                  await client.query(`
              UPDATE Stories
              FILTER .id = <uuid>$0
              SET {
                storypoints += (
                  SELECT Storypoints
                  FILTER .id = <uuid>$1
                )
              };
            `, [storyId, storyPointId]);
            } else {
                  throw new Error('Failed to insert the story point.');
            };

            console.log('Story point added successfully.');
      } catch (error) {
            console.error('Error adding story point to story:', error);
      }
}

export async function addCharacterToStory(storyId: string, character: Character): Promise<void> {
      try {
            // Insert the new character
            const characterResult = await client.querySingle<{ id: string }>(`
          INSERT Characters {
            title := <str>$0,
            description := <str>$1
          }
          SELECT {
            id
          };
        `, [character.title, character.description ?? null]);

            const characterId = characterResult?.id;

            if (!characterId) {
                  throw new Error('Failed to insert the character.');
            }

            // Link the new character to the existing story
            await client.query(`
          UPDATE Stories
          FILTER .id = <uuid>$0
          SET {
            characters += (
              SELECT Characters
              FILTER .id = <uuid>$1
            )
          };
        `, [storyId, characterId]);

            console.log('Character added successfully.');
      } catch (error) {
            console.error('Error adding character to story:', error);
      }
}

export async function deleteCharacterFromStory(storyId: string, characterId: string): Promise<void> {
      try {
            // Remove the character from the Characters table
            await client.query(`
          DELETE Characters
          FILTER .id = <uuid>$0;
        `, [characterId]);

            // Update the story to remove the character from its characters relationship
            await client.query(`
          UPDATE Stories
          FILTER .id = <uuid>$0
          SET {
            characters -= (
              SELECT Characters
              FILTER .id = <uuid>$1
            )
          };
        `, [storyId, characterId]);

            console.log('Character deleted from the story successfully.');
      } catch (error) {
            console.error('Error deleting character from story:', error);
      }
}

export async function deleteStoryPointFromStory(storyId: string, storyPointId: string): Promise<void> {
      try {
            // Remove the story point from the Storypoints table
            await client.query(`
          DELETE Storypoints
          FILTER .id = <uuid>$0;
        `, [storyPointId]);

            // Update the story to remove the story point from its storypoints relationship
            await client.query(`
          UPDATE Stories
          FILTER .id = <uuid>$0
          SET {
            storypoints -= (
              SELECT Storypoints
              FILTER .id = <uuid>$1
            )
          };
        `, [storyId, storyPointId]);

            console.log('Story point deleted from the story successfully.');
      } catch (error) {
            console.error('Error deleting story point from story:', error);
      }
}

export async function deleteStory(storyId: string): Promise<void> {
      try {
            // Remove the story from the Stories table
            await client.query(`
          DELETE Stories
          FILTER .id = <uuid>$0;
        `, [storyId]);

            console.log('Story deleted successfully.');
      } catch (error) {
            console.error('Error deleting story:', error);
      }
}

export async function createStoryTitle(
      title: string,
): Promise<void> {
      try {
            // Build the query
            const query = e.params({
                  title: e.str,
            }, ({ title }) => {
                  return e.insert(e.Stories, {
                        title,
                  });
            });

            // Execute the query with parameters
            await query.run(client, {
                  title
            });

            console.log('Story created successfully.');
      } catch (error) {
            console.error('Error creating story:', error);
      }
}
export async function createStory1(
      title: string,
      characters: Character[],
      storypoints: StoryPoint[]
): Promise<void> {
      try {
            // Build the query
            const query = e.params({
                  title: e.str,
                  characters: e.array(e.tuple({ title: e.str, description: e.str })),
                  storypoints: e.array(e.tuple({ title: e.str, description: e.str })),
            }, ({ title, characters, storypoints }) => {
                  return e.insert(e.Stories, {
                        title,
                        characters: e.set(
                              //@ts-ignore
                              characters.map(char => e.insert(e.Characters, char))
                        ),
                        storypoints: e.set(
                              //@ts-ignore
                              storypoints.map(sp => e.insert(e.Storypoints, sp))
                        ),
                  });
            });

            // Execute the query with parameters
            await query.run(client, {
                  title,
                  characters: characters.map(char => ({
                        title: char.title,
                        description: char.description ?? null,
                  })),
                  storypoints: storypoints.map(sp => ({
                        title: sp.title,
                        description: sp.description ?? null,
                  })),
            });

            console.log('Story created successfully.');
      } catch (error) {
            console.error('Error creating story:', error);
      }
}

export async function checkUserExists(email: string) {
      const user = await client.query<Users>(`\
      select Users {
            fname,
            username
      }
      FILTER .email = <str>'${email}';
      `)
      return user;
}

