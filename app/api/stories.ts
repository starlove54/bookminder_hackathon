'use server'
import { Book, Character, StoryPoint } from "@/variables";
import * as edgedb from "edgedb";
import e from '../../dbschema/edgeql-js'
import { Users } from "@/dbschema/interfaces";
import { run } from "node:test";

const instanceName = process.env.EDGEDB_INSTANCE;
const secretKey = process.env.EDGEDB_SECRET_KEY;
const client = edgedb.createClient({
      instanceName: instanceName,
      secretKey: secretKey
});

export async function getStories() {
      const stories = await client.query<Book>(`\
      select Stories {
      id,
      title
      };`)
      // const query = e.select(e.Stories,()=>({
      //       id:true,title:true
      // }))
      // const result =await query.run(client)
      return stories;
}


export async function getStoriesComplete(userId:string) {
      const story = await client.query<Book>(`\
      SELECT Stories {
            id,
            title,
            characters : {
                  id,title, description
            },
            storypoints : {
                  id,title, description
            }
          } FILTER .user.id = <uuid>'${userId}';
      
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

export async function addStoryPointToStory(storyId: string, title: string, description: string) {
      try {

            const query = e.update(e.Stories, () => ({
                  filter_single: { id: storyId },
                  set: {
                        storypoints: {
                              "+=": (
                                    e.insert(e.Storypoints, {
                                          title: title,
                                          description: description
                                    }).unlessConflict()
                              )
                        }
                  }
            }))
            const result = await query.run(client);
            return result;
      } catch (error) {
            console.error('Error adding story point to story:', error);
      }
}

export async function addCharacterToStory(storyId: string, title: string, description: string) {
      try {
            // Insert the new character
            const query = e.update(e.Stories, () => ({
                  filter_single: { id: storyId },
                  set: {
                        characters: {
                              "+=": (
                                    e.insert(e.Characters, {
                                          title: title,
                                          description: description
                                    }).unlessConflict()
                              )
                        }
                  }
            }))
            const result = await query.run(client);

            return result;

      } catch (error) {
            console.error('Error adding character to story:', error);
      }
}

export async function deleteCharacterFromStory(storyId: string, characterId: string) {
      try {
            // Remove the character from the Characters table
            const ungroupQuery = e.update(e.Stories, () => ({
                  filter_single: { id: storyId },
                  set: {
                        characters: {
                              "-=": (
                                    e.select(e.Characters, () => ({
                                          filter_single: { id: characterId }
                                    }))
                              )
                        }
                  }
            }))

            const ungroup = ungroupQuery.run(client);
            if (ungroup !== null) {
                  const query = e.delete(e.Characters, () => ({
                        filter_single: { id: characterId }
                  }))
                  const result = query.run(client);
                  return result;
            }

      } catch (error) {
            console.error('Error deleting character from story:', error);
      }
}

export async function deleteStoryPointFromStory(storyId: string, storyPointId: string) {
      try {
            // Remove the story point from the Storypoints table
            const ungroupQuery = e.update(e.Stories, () => ({
                  filter_single: { id: storyId },
                  set: {
                        storypoints: {
                              "-=": (
                                    e.select(e.Storypoints, () => ({
                                          filter_single: { id: storyPointId }
                                    }))
                              )
                        }
                  }
            }))

            const ungroup = ungroupQuery.run(client);
            if (ungroup !== null) {
                  const query = e.delete(e.Storypoints, () => ({
                        filter_single: { id: storyPointId }
                  }))
                  const result = query.run(client);
                  return result;
            }
      } catch (error) {
            console.error('Error deleting story point from story:', error);
      }
}

export async function deleteStory(storyId: string) {
      try {
            const query = e.delete(e.Stories, () => ({
                  filter_single: { id: storyId }
            }))
            const result = query.run(client);
            return result;
      } catch (error) {
            console.error('Error deleting story:', error);
      }
}

export async function createStoryTitle(title: string) {
      try {
            // Build the query
            const query = e.insert(e.Stories, {
                  title: title
            })

            // Execute the query with parameters
            return await query.run(client);
      } catch (error) {
            console.error('Error creating story:', error);
      }
}
export async function updateStoryTitle(id:string,title:string)
{
      try{
            const query = e.update(e.Stories , () =>({
                  filter_single :{id:id},
                  set:{
                        title :title
                  }
            }))
            return await query.run(client);
      }
      catch{
            console.log("server Error");
      }
}
export async function updateStory(id:string,title:string,description:string)
{
      try{
            const query = e.update(e.Stories , () =>({
                  filter_single :{id:id},
                  set:{
                        title :title,
                        description:description
                  }
            }))
            return await query.run(client);
      }
      catch{
            console.log("server Error");
      }
}
export async function updateStoryStoryPoint(id:string,title:string,description:string)
{
      try{
            const query = e.update(e.Storypoints , () =>({
                  filter_single :{id:id},
                  set:{
                        title :title,
                        description:description
                  }
            }))
            return await query.run(client);
      }
      catch{
            console.log("server Error");
      } 
}
export async function updateStoryCharacter(id:string,title:string,description:string)
{
      try{
            const query = e.update(e.Characters , () =>({
                  filter_single :{id:id},
                  set:{
                        title :title,
                        description:description
                  }
            }))
            return await query.run(client);
      }
      catch{
            console.log("server Error");
      }
}
export async function checkUserExists(email: string) {
      const user = await client.query<Users>(`\
      select Users {
            id,
            fname,
            username
      }
      FILTER .email = <str>'${email}';
      `)
      return user;
}
export async function addNewUser(email:string,userName:string,password?:string,fname?:string,lName?:string)
{
      try {
            // Build the query
            const query = e.insert(e.Users, {
                  email: email,
                  username:userName,
                  password:(password?password:""),
                  fname:(fname?fname:""),
                  lname:(lName?lName:"")
            }).unlessConflict(user =>({
                  on:user.email
            }));
            // Execute the query with parameters
            return await query.run(client);
      } catch (error) {
            console.error('Error creating story:', error);
      }
}
