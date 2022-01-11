const users = [];

const addUser =({ id, name, room})=>{
  //change the name and room to all lowercase and no whitespaces. Sarthak Jain -> sarthakjain 
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user)=> user.room===room && user.name===name); 
  
  if(!name || !room) return{ error : "Username and room are required"}
  if(existingUser){            //If a user in the same room with the same name already exists.
      return {
          error :"Username is taken"
      }
  }

  const user = {id, name, room};
  users.push(user);
return {user};
}

const removeUser=(id)=>{
 const Index = users.findIndex((user)=>user.id === id);

 if(Index !== -1){
     return users.splice(Index,1)[0]
 }

}

const getUser =(id)=>  users.find((user) => user.id === id);


const getUsersInRoom = (room)=> users.filter((user)=> user.room ===room )


module.exports ={addUser, removeUser, getUser, getUsersInRoom};