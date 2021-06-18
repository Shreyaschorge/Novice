class User {

  hasWindow = typeof window !== 'undefined';
  
  set set(user){
    if(this.hasWindow) localStorage.setItem("currentUser", JSON.stringify(user));
  }

  get get(){
    if(this.hasWindow){
      const user = localStorage.getItem("currentUser");
      return JSON.parse(user);
    }
    return "window is undefined"
  }

  remove(){
    if(this.hasWindow){
      localStorage.removeItem("currentUser");
    }
  }
}

export const currentuser = new User();