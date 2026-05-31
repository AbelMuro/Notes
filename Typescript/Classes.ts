// ===================================== CLASSES =======================================
/* 
  You can also statically type a class using the : operator
*/
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user = new UserAccount("Murphy", 1);
